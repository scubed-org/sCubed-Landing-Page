import { style, styleVariants } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../../styles/tokens.css';

const MOBILE = 'screen and (max-width: 767px)';

export const featuresSection = style({
  padding: `${spacing.xl} 0`,
  backgroundColor: colors.white,
  '@media': {
    [MOBILE]: {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const sectionLead = style({
  maxWidth: '680px',
  margin: `-${spacing.xs} auto ${spacing.sm}`,
  textAlign: 'center',
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
});

export const sectionProvides = style({
  textAlign: 'center',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
  margin: `0 0 ${spacing.lg}`,
});

export const cardField = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: '1fr',
  gap: '20px',
  filter: 'drop-shadow(0 8px 18px rgba(122, 126, 237, 0.13))',
  '@media': {
    [MOBILE]: {
      gridTemplateColumns: '1fr',
      gridAutoRows: 'auto',
      gap: spacing.sm,
    },
  },
});

const cardBase = style({
  borderRadius: '16px',
  borderStyle: 'solid',
  borderWidth: 0,
  borderLeftWidth: '4px',
  '@media': {
    'screen and (min-width: 768px)': {
      selectors: {
        '&:nth-child(even)': {
          borderLeftWidth: 0,
          borderRightWidth: '4px',
        },
      },
    },
  },
});

// Each card's inner corner is cut away in a circle around the compass. The
// circle's centre sits half the grid gap beyond the card's corner.
const NOTCH_RADIUS = 86;
const PAST_END = 'calc(100% + 10px)';
const BEFORE_START = '-10px';

const quadrant = (x: string, y: string, padding: string) => {
  const notch = `radial-gradient(circle ${NOTCH_RADIUS}px at ${x} ${y}, transparent ${NOTCH_RADIUS - 0.5}px, #000 ${NOTCH_RADIUS}px)`;

  return [
    cardBase,
    {
      padding,
      WebkitMaskImage: notch,
      maskImage: notch,
      '@media': {
        [MOBILE]: {
          padding: spacing.md,
          WebkitMaskImage: 'none',
          maskImage: 'none',
        },
      },
    },
  ];
};

export const card = styleVariants({
  northWest: quadrant(PAST_END, PAST_END, '26px 64px 64px 28px'),
  northEast: quadrant(BEFORE_START, PAST_END, '26px 28px 64px 64px'),
  southWest: quadrant(PAST_END, BEFORE_START, '64px 64px 26px 28px'),
  southEast: quadrant(BEFORE_START, BEFORE_START, '64px 28px 26px 64px'),
});

export const cardIcon = style({
  width: '56px',
  height: '56px',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '14px',
});

export const cardTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.snug,
  color: colors.neutral[900],
  margin: `0 0 ${spacing.xs}`,
});

export const cardText = style({
  margin: 0,
  fontSize: typography.fontSize.base,
  lineHeight: '1.6',
  color: colors.neutral[600],
});

export const dial = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '148px',
  height: '148px',
  transform: 'translate(-50%, -50%)',
  '@media': {
    [MOBILE]: {
      position: 'static',
      transform: 'none',
      width: '96px',
      height: '96px',
      margin: '0 auto',
      order: -1,
    },
  },
});

export const swingingNeedle = style({
  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});
