import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const addonsSection = style({
  padding: '1.5rem 0',
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.primary[50]} 100%)`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0',
    },
  },
});

export const addonsContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
});

export const addonsTitle = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  textAlign: 'center',
  marginBottom: spacing.sm,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const addonsSubtitle = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  textAlign: 'center',
  marginBottom: spacing['2xl'],
  maxWidth: '700px',
  margin: `0 auto ${spacing['2xl']}`,
});

export const addonsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const addonCard = style({
  background: colors.white,
  borderRadius: radius.lg,
  padding: spacing.lg,
  boxShadow: shadows.md,
  transition: 'all 0.3s ease',
  border: `1px solid ${colors.neutral[200]}`,
  display: 'flex',
  flexDirection: 'column',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.xl,
    borderColor: colors.primary[300],
  },
});

export const addonIcon = style({
  width: '48px',
  height: '48px',
  borderRadius: radius.md,
  background: colors.primary[100],
  color: colors.primary[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const addonName = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: 0,
});

export const addonNameWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const addonHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  marginBottom: spacing.md,
});

export const addonDescription = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.md,
  flex: 1,
});

export const addonPrice = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  marginBottom: spacing.md,
});

export const addonLearnMore = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.md}`,
  background: colors.white,
  border: `2px solid ${colors.primary[600]}`,
  borderRadius: radius.base,
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    background: colors.primary[50],
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});
