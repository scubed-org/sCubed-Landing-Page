'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const isFirefox = () =>
  typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);

/**
 * Selects the best American English female voice available in the browser.
 */
function selectVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Preferred voices by name (female, high quality)
  const preferred = [
    'Google US English',
    'Microsoft Zira',
    'Microsoft Jenny',
    'Samantha',         // macOS/iOS
    'Karen',            // macOS/iOS
    'english-us',       // espeak female variant
    'English (America', // espeak
  ];

  for (const name of preferred) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  // Try to find any female en-US voice
  const enUS = voices.filter((v) => v.lang === 'en-US' || v.lang === 'en_US');
  if (enUS.length > 0) {
    // Prefer voices with "female" in the name
    const female = enUS.find((v) => /female/i.test(v.name));
    if (female) return female;
    return enUS[0];
  }

  // Any English voice
  const en = voices.find((v) => v.lang.startsWith('en'));
  return en || voices[0] || null;
}

/**
 * Force uppercase abbreviations (2+ letters) to be spelled out letter by letter.
 * "ABA" → "A. B. A.", "HIPAA" → "H. I. P. A. A."
 */
function spellOutAbbreviations(text: string): string {
  return text.replace(/\b[A-Z]{2,}\b/g, (match) => {
    return match.split('').join('. ') + '.';
  });
}

/**
 * Extract readable text from a DOM element, skipping audio/video player UI elements.
 */
export function extractReadableText(element: HTMLElement): string {
  const clone = element.cloneNode(true) as HTMLElement;

  const skipSelectors =
    'audio, video, iframe, button, [role="slider"], [aria-label*="Audio"], [aria-label*="player"]';
  clone.querySelectorAll(skipSelectors).forEach((el) => el.remove());
  clone
    .querySelectorAll('[style*="display: none"], [style*="display:none"]')
    .forEach((el) => el.remove());

  return clone.textContent?.trim() || '';
}

interface UseSpeechSynthesisReturn {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  toggle: () => void;
  stop: () => void;
}

/**
 * Hook for browser-native text-to-speech using the Web Speech API.
 * Handles Firefox quirks: no pause/resume support, async voice loading.
 */
export function useSpeechSynthesis(text: string): UseSpeechSynthesisReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  // Track position for Firefox manual resume
  const positionRef = useRef(0);
  const boundaryFiredRef = useRef(false);
  const speakStartTimeRef = useRef(0);
  const isPausingRef = useRef(false);
  const fullTextRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    setIsSupported(true);

    const handleVoicesChanged = () => setVoicesReady(true);

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesReady(true);
    }
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakFromPosition = useCallback(
    (startPos: number) => {
      const processedText = spellOutAbbreviations(text);
      fullTextRef.current = processedText;
      const textToSpeak = processedText.slice(startPos);

      if (!textToSpeak.trim()) {
        setIsPlaying(false);
        setIsPaused(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      if (voicesReady) {
        const voice = selectVoice();
        if (voice) utterance.voice = voice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Track reading position via boundary events (for Firefox resume)
      boundaryFiredRef.current = false;
      utterance.onboundary = (e) => {
        boundaryFiredRef.current = true;
        positionRef.current = startPos + e.charIndex;
      };

      utterance.onend = () => {
        // When Firefox cancels speech for pause, onend fires — don't reset position
        if (isPausingRef.current) {
          isPausingRef.current = false;
          return;
        }
        setIsPlaying(false);
        setIsPaused(false);
        positionRef.current = 0;
        utteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        if (e.error === 'canceled' || e.error === 'interrupted') return;
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      speakStartTimeRef.current = Date.now();
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    },
    [text, voicesReady]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    positionRef.current = 0;
    utteranceRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    if (!isSupported) return;

    const firefox = isFirefox();

    // Currently speaking → pause
    if (isPlaying && !isPaused) {
      if (firefox) {
        // Firefox: pause/resume broken — cancel and save position
        // If boundary events didn't fire, estimate position from elapsed time
        // Average speaking rate: ~15 characters per second at rate 1.0
        if (!boundaryFiredRef.current && speakStartTimeRef.current > 0) {
          const elapsedMs = Date.now() - speakStartTimeRef.current;
          const estimatedChars = Math.floor((elapsedMs / 1000) * 15);
          positionRef.current = Math.min(
            positionRef.current + estimatedChars,
            fullTextRef.current.length,
          );
        }
        isPausingRef.current = true;
        window.speechSynthesis.cancel();
      } else {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // Paused → resume
    if (isPaused) {
      if (firefox) {
        // Firefox: re-speak from saved position, snap to nearest word boundary
        let pos = positionRef.current;
        const fullText = fullTextRef.current;
        if (pos > 0 && pos < fullText.length) {
          // Find next space to avoid cutting mid-word
          const nextSpace = fullText.indexOf(' ', pos);
          if (nextSpace !== -1) pos = nextSpace + 1;
        }
        speakFromPosition(pos);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
      }
      return;
    }

    // Start fresh
    window.speechSynthesis.cancel();
    positionRef.current = 0;
    speakFromPosition(0);
  }, [isPlaying, isPaused, isSupported, speakFromPosition]);

  return { isPlaying, isPaused, isSupported, toggle, stop };
}
