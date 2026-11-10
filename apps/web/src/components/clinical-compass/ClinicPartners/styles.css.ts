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

export const imageWrapper = style({
  position: 'relative',
  minHeight: '340px',
  borderRadius: radius.lg,
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '240px',
    },
  },
});

// Keeps both the clinician's and the child's face in frame for tall and wide crops.
export const partnersImage = style({
  objectFit: 'cover',
  objectPosition: '41% 25%',
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
