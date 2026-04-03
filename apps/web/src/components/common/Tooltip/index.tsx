'use client';

import { Info } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import * as styles from './styles.css';

interface TooltipProps {
  content: string | ReactNode;
  children?: ReactNode;
}

interface TooltipPosition {
  top: number;
  left: number;
  arrowLeft: number;
  showBelow: boolean;
}

/**
 * Tooltip Component
 * Accessible tooltip with hover + tap support and edge-aware positioning.
 * Uses position:fixed to avoid parent overflow clipping issues.
 */
export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState<TooltipPosition | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const recentTouchRef = useRef(false);

  useLayoutEffect(() => {
    if (!isVisible || !wrapperRef.current || !tooltipRef.current) {
      setPos(null);
      return;
    }

    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const edgePadding = 16;

    // Vertical: show above by default, flip below if not enough space
    const showBelow = wrapperRect.top - tooltipRect.height - 8 < 0;
    const top = showBelow
      ? wrapperRect.bottom + 8
      : wrapperRect.top - tooltipRect.height - 8;

    // Horizontal: center on the icon, then clamp within viewport
    let left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
    left = Math.max(edgePadding, Math.min(left, viewportWidth - tooltipRect.width - edgePadding));

    // Arrow should point at the icon center
    const arrowLeft = wrapperRect.left + wrapperRect.width / 2 - left;

    setPos({ top, left, arrowLeft, showBelow });
  }, [isVisible]);

  // Close on outside click/tap and on scroll
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => {
    if (recentTouchRef.current) return;
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (recentTouchRef.current) return;
    setIsVisible(false);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      recentTouchRef.current = true;
      setTimeout(() => {
        recentTouchRef.current = false;
      }, 300);
      setIsVisible((prev) => !prev);
    },
    [],
  );

  const handleClick = (e: React.MouseEvent) => {
    if (recentTouchRef.current) return;
    e.stopPropagation();
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  return (
    <span
      ref={wrapperRef}
      className={styles.tooltipWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onClick={handleClick}
    >
      {children || <Info size={16} className={styles.tooltipIcon} />}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={styles.tooltipContent}
          style={
            pos
              ? { position: 'fixed', top: pos.top, left: pos.left, transform: 'none', bottom: 'auto', marginBottom: 0 }
              : { visibility: 'hidden' }
          }
          role="tooltip"
        >
          <div
            className={pos?.showBelow ? styles.tooltipArrowAbove : styles.tooltipArrow}
            style={pos ? { left: pos.arrowLeft, transform: 'none' } : undefined}
          />
          {content}
        </div>
      )}
    </span>
  );
}
