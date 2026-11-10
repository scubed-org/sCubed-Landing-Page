import { style } from '@vanilla-extract/css';

import { colors, radius, spacing, typography } from '../../../styles/tokens.css';

export const partnersGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: spacing.lg,
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const illustrationPanel = style({
  position: 'relative',
  minHeight: '340px',
  borderRadius: radius.lg,
  overflow: 'hidden',
  background: colors.primary[600],
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '240px',
    },
  },
});

export const partnersIllustration = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'visible',
});

export const partnersText = style({
  display: 'grid',
  gap: spacing.sm,
  alignContent: 'center',
});

export const partnersParagraph = style({
  margin: 0,
  fontSize: typography.fontSize.base,
  lineHeight: '1.65',
  color: colors.neutral[600],
});
