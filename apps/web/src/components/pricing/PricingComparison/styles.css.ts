import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const comparisonSection = style({
  padding: '1rem 0',
  background: colors.neutral[50],
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '1.5rem 0',
    },
  },
});

export const comparisonContainer = style({
  maxWidth: '1320px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
});

export const comparisonTitle = style({
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

export const sectionDescription = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  textAlign: 'center',
  marginBottom: spacing['2xl'],
  maxWidth: '700px',
  margin: `0 auto ${spacing['2xl']}`,
});

export const comparisonTable = style({
  background: colors.white,
  borderRadius: radius.lg,
  boxShadow: shadows.lg,
  overflow: 'visible',
  border: `1px solid ${colors.neutral[200]}`,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const featureRow = style({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  borderBottom: `1px solid ${colors.neutral[200]}`,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const headerCell = style({
  padding: spacing.md,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  background: colors.neutral[50],
});

export const planHeader = style({
  padding: spacing.md,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  background: colors.neutral[50],
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  borderLeft: `1px solid ${colors.neutral[200]}`,
});

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'center',
});

export const originalPriceSmall = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  textDecoration: 'line-through',
  fontWeight: typography.fontWeight.normal,
});

export const discountedPriceSmall = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  '@media': {
    'screen and (max-width: 768px)': {
      color: colors.white,
    },
  },
});

export const discountBadgeSmall = style({
  fontSize: typography.fontSize.xs,
  color: colors.accent.green,
  fontWeight: typography.fontWeight.semibold,
});

export const featureCategory = style({
  borderBottom: `2px solid ${colors.neutral[200]}`,
});

export const expandButton = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing.md,
  background: colors.primary[50],
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  ':hover': {
    background: colors.primary[100],
  },
});

export const featureCategoryTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[700],
});

export const featureName = style({
  padding: spacing.md,
  fontSize: typography.fontSize.base,
  color: colors.neutral[700],
});

export const featureCell = style({
  padding: spacing.md,
  fontSize: typography.fontSize.base,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: `1px solid ${colors.neutral[200]}`,
});

export const mobileCard = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'block',
    },
  },
});

export const mobileCardHeader = style({
  background: colors.primary[600],
  color: colors.white,
  padding: spacing.md,
  borderRadius: `${radius.lg} ${radius.lg} 0 0`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const mobileFeatureList = style({
  background: colors.white,
  padding: spacing.md,
  borderRadius: `0 0 ${radius.lg} ${radius.lg}`,
  boxShadow: shadows.md,
});

export const mobileFeatureItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${spacing.sm} 0`,
  borderBottom: `1px solid ${colors.neutral[100]}`,
  fontSize: typography.fontSize.sm,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const buyNowButton = style({
  width: '100%',
  padding: `${spacing.sm} ${spacing.md}`,
  background: colors.primary[600],
  border: 'none',
  borderRadius: radius.md,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  marginTop: spacing.md,
  ':hover': {
    background: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});
