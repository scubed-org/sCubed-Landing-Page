import { style } from '@vanilla-extract/css';

import { colors, radius, spacing, typography } from '../../../styles/tokens.css';

// Wide screens: image on the left, all four paragraphs in one column on the right.
// Below 1480px the section container narrows to 1000px, so the image gets half
// the width and the last two paragraphs run full width underneath.
export const partnersGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gridTemplateAreas: '"image text" "image full"',
  columnGap: spacing.lg,
  rowGap: spacing.sm,
  '@media': {
    'screen and (max-width: 1480px)': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"image text" "full full"',
      rowGap: spacing.lg,
    },
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gridTemplateAreas: '"image" "text" "full"',
      rowGap: spacing.sm,
    },
  },
});

export const imageWrapper = style({
  gridArea: 'image',
  alignSelf: 'center',
  borderRadius: radius.lg,
  overflow: 'hidden',
  lineHeight: 0,
  '@media': {
    // Stacked: keep the image from filling the whole width on tablets.
    'screen and (max-width: 1024px)': {
      justifySelf: 'center',
      width: '100%',
      maxWidth: '560px',
      marginBottom: `calc(${spacing.lg} - ${spacing.sm})`,
    },
  },
});

export const partnersImage = style({
  display: 'block',
  width: '100%',
  height: 'auto',
});

export const partnersText = style({
  gridArea: 'text',
  alignSelf: 'end',
  display: 'grid',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 1480px)': {
      alignSelf: 'center',
    },
  },
});

export const partnersTextFull = style({
  gridArea: 'full',
  alignSelf: 'start',
  display: 'grid',
  gap: spacing.sm,
});

export const partnersParagraph = style({
  margin: 0,
  fontSize: typography.fontSize.base,
  lineHeight: '1.65',
  color: colors.neutral[600],
});
