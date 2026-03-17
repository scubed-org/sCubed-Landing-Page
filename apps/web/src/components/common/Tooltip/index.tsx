'use client';

import { Info } from 'lucide-react';
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

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

  // Close on outside click/tap
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  return (
    <span
      ref={wrapperRef}
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
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
