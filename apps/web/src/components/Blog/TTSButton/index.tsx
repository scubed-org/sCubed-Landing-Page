'use client';

import React, { useEffect, useState } from 'react';
import { Pause, Volume2 } from 'lucide-react';

import { useSpeechSynthesis, extractReadableText } from '../../../hooks/useSpeechSynthesis';
import {
  audioButton,
  audioButtonContent,
  audioIcon,
  audioText,
  audioContainer,
} from '../AudioButton/styles.css';

interface TTSButtonProps {
  articleRef: React.RefObject<HTMLElement | null>;
  title: string;
}

/**
 * Text-to-Speech button using the browser's Web Speech API.
 * Reads only content block text (not the title).
 */
const TTSButton: React.FC<TTSButtonProps> = ({ articleRef, title }) => {
  const [articleText, setArticleText] = useState('');

  useEffect(() => {
    if (articleRef.current) {
      const contentText = extractReadableText(articleRef.current);
      setArticleText(`${title}. ${contentText}`);
    }
  }, [articleRef, title]);

  const { isPlaying, isPaused, isSupported, toggle } = useSpeechSynthesis(articleText);

  if (!isSupported) return null;

  const getLabel = () => {
    if (isPlaying) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Listen to Article';
  };

  return (
    <div className={audioContainer}>
      <button
        onClick={toggle}
        className={audioButton}
        type="button"
        aria-label={`${getLabel()} audio version of ${title}`}
      >
        <div className={audioButtonContent}>
          <div className={audioIcon}>
            {isPlaying ? (
              <Pause size={18} strokeWidth={2} />
            ) : (
              <Volume2 size={18} strokeWidth={2} />
            )}
          </div>
          <span className={audioText}>{getLabel()}</span>
        </div>
      </button>
    </div>
  );
};

export default TTSButton;
