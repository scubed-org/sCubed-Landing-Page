import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const plansGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.lg,
  maxWidth: '880px',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
      maxWidth: '480px',
    },
  },
});

export const planCard = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.xl,
  boxShadow: '0 8px 24px rgba(122, 126, 237, 0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.lg,
  },
});

export const planHeader = style({
  padding: spacing.lg,
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  '@media': {
    'screen and (max-width: 480px)': {
      padding: spacing.md,
    },
  },
});

export const planName = style({
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  letterSpacing: '0.06em',
  margin: `0 0 ${spacing.sm}`,
});

export const planPrice = style({
  fontSize: '3rem',
  fontWeight: '800',
  lineHeight: 1,
  letterSpacing: '-0.02em',
  color: colors.neutral[900],
  margin: `0 0 ${spacing.md}`,
});

export const planPeriod = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.normal,
  letterSpacing: 0,
  color: colors.neutral[600],
});

export const planHours = style({
  display: 'inline-block',
  margin: 0,
  padding: '6px 14px',
  borderRadius: radius.full,
  background: colors.white,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
});

export const planBody = style({
  padding: `${spacing.sm} ${spacing.lg} ${spacing.md}`,
  '@media': {
    'screen and (max-width: 480px)': {
      padding: `${spacing.xs} ${spacing.md} ${spacing.sm}`,
    },
  },
});

export const planList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const planListItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.sm,
  padding: `${spacing.sm} 0`,
  color: colors.neutral[700],
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.snug,
  borderBottom: `1px solid ${colors.neutral[100]}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const planBullet = style({
  flexShrink: 0,
  width: '8px',
  height: '8px',
  margin: '7px 0 0 4px',
  borderRadius: radius.full,
  background: colors.primary[600],
  boxShadow: `0 0 0 4px ${colors.primary[100]}`,
});
