import { style, keyframes } from '@vanilla-extract/css';

import { colors } from '../../../styles/tokens.css';

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
});

export const shimmerOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(90deg, ${colors.neutral[100]} 0%, ${colors.neutral[200]} 50%, ${colors.neutral[100]} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s ease-in-out infinite`,
  zIndex: 1,
  transition: 'opacity 0.3s ease',
});

export const shimmerHidden = style({
  opacity: 0,
  pointerEvents: 'none',
});

export const imageLoading = style({
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

export const imageLoaded = style({
  opacity: 1,
  transition: 'opacity 0.3s ease',
});
