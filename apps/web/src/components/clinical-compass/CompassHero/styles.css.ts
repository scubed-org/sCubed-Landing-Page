import { keyframes, style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../../styles/tokens.css';

export const heroSection = style({
  position: 'relative',
  overflow: 'hidden',
  padding: `${spacing.xl} 0`,
  background: 'linear-gradient(to bottom right, #ffffff, #faf9ff)',
  '@media': {
    'screen and (max-width: 767px)': {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const heroGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing['2xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.xl,
      textAlign: 'center',
    },
  },
});

export const eyebrow = style({
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  margin: `0 0 ${spacing.xs}`,
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800',
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
  color: colors.neutral[900],
  marginBottom: spacing.sm,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: typography.fontSize['4xl'],
    },
    'screen and (max-width: 480px)': {
      fontSize: '2rem',
    },
  },
});

export const heroTitleHighlight = style({
  color: colors.primary[600],
});

export const heroLede = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[700],
  margin: `0 0 ${spacing.sm}`,
});

export const heroBody = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `0 0 ${spacing.md}`,
});

export const dialWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '1100px',
    height: '1100px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    background:
      'repeating-radial-gradient(circle, transparent 0 59px, rgba(122, 126, 237, 0.1) 59px 60px)',
    pointerEvents: 'none',
  },
});

export const dial = style({
  position: 'relative',
  width: '340px',
  height: '340px',
  maxWidth: '100%',
  filter: 'drop-shadow(0 22px 44px rgba(122, 126, 237, 0.24))',
  '@media': {
    'screen and (max-width: 968px)': {
      width: '240px',
      height: '240px',
    },
  },
});

const settle = keyframes({
  '0%': { transform: 'rotate(-70deg)' },
  '55%': { transform: 'rotate(62deg)' },
  '80%': { transform: 'rotate(38deg)' },
  '100%': { transform: 'rotate(45deg)' },
});

export const settlingNeedle = style({
  transform: 'rotate(45deg)',
  animation: `${settle} 1.8s cubic-bezier(0.3, 0.7, 0.3, 1) 0.25s both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});
