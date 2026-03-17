import { style, keyframes } from '@vanilla-extract/css';

import { colors, radius, shadows, spacing, typography } from '../../../styles/tokens.css';

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 0.4 },
  '50%': { opacity: 0.8 },
});

export const heroSection = style({
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 50%, ${colors.primary[50]} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  padding: `${spacing['2xl']} ${spacing.md}`,
});

export const heroContent = style({
  maxWidth: '700px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
});

export const iconContainer = style({
  width: '80px',
  height: '80px',
  borderRadius: radius.lg,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[200]} 100%)`,
  color: colors.primary[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `0 auto ${spacing.lg}`,
  animation: `${float} 3s ease-in-out infinite`,
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.xs} ${spacing.md}`,
  background: colors.primary[100],
  color: colors.primary[700],
  borderRadius: '9999px',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.lg,
});

export const title = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.md,
  lineHeight: typography.lineHeight.tight,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const titleAccent = style({
  color: colors.primary[600],
});

export const titleSecondLine = style({
  display: 'block',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'inline',
    },
  },
});

export const description = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing['2xl'],
  maxWidth: '560px',
  margin: `0 auto ${spacing['2xl']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const ctaGroup = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  flexWrap: 'wrap',
});

export const primaryButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.lg}`,
  background: colors.primary[600],
  color: colors.white,
  borderRadius: radius.base,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  ':hover': {
    background: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});

export const secondaryButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.lg}`,
  background: colors.white,
  color: colors.primary[600],
  borderRadius: radius.base,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  border: `2px solid ${colors.primary[600]}`,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  ':hover': {
    background: colors.primary[50],
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});

export const decorCircle = style({
  position: 'absolute',
  borderRadius: '50%',
  background: colors.primary[100],
  opacity: 0.4,
  animation: `${pulse} 4s ease-in-out infinite`,
  pointerEvents: 'none',
});
