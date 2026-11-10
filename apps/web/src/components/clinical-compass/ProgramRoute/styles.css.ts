import { style, styleVariants } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../../styles/tokens.css';

const DOT_RADIUS = '11px';

// The horizontal centre of the second dot: half the column gap past the middle.
const secondDotFromLeft = `calc(50% + ${spacing.lg} + ${DOT_RADIUS})`;
const secondDotFromRight = `calc(50% - ${spacing.lg} - ${DOT_RADIUS})`;

export const routeSection = style({
  padding: `${spacing.xl} 0`,
  backgroundColor: colors.white,
  '@media': {
    'screen and (max-width: 767px)': {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const route = style({
  position: 'relative',
});

const trackBase = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '130px',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const track = styleVariants({
  lilac: [trackBase, { clipPath: `inset(0 ${secondDotFromRight} 0 ${DOT_RADIUS})` }],
  blue: [trackBase, { clipPath: `inset(0 0 0 ${secondDotFromLeft})` }],
});

export const trackSvg = style({
  position: 'absolute',
  top: 0,
  left: secondDotFromLeft,
  overflow: 'visible',
});

const trackPathBase = style({
  fill: 'none',
  strokeWidth: 2,
  strokeDasharray: '2 8',
  strokeLinecap: 'round',
});

export const trackPath = styleVariants({
  lilac: [trackPathBase, { stroke: colors.primary[300] }],
  blue: [trackPathBase, { stroke: '#22d3ee', strokeOpacity: 0.45 }],
});

export const stops = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing['2xl'],
  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const stop = style({
  position: 'relative',
  paddingTop: '42px',
  selectors: {
    '&:nth-child(2)': {
      marginTop: '88px',
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      paddingTop: 0,
      paddingLeft: '44px',
      selectors: {
        '&:nth-child(2)': {
          marginTop: 0,
        },
      },
    },
  },
});

// On phones the route runs down the left edge, from dot to dot. The first
// segment stops at the next dot; the second carries on to the section's end.
const LINE_START = '30px';

const stopLineBase = style({
  display: 'none',
  position: 'absolute',
  left: '10px',
  top: LINE_START,
  width: '2px',
  overflow: 'visible',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
    },
  },
});

export const stopLine = styleVariants({
  lilac: [
    stopLineBase,
    { height: `calc(100% - ${LINE_START} + ${spacing.md} - 5px)` },
  ],
  blue: [
    stopLineBase,
    { height: `calc(100% - ${LINE_START} + ${spacing.lg})` },
  ],
});

const dotBase = style({
  position: 'absolute',
  left: 0,
  top: '2px',
  boxSizing: 'border-box',
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  backgroundColor: colors.white,
  borderWidth: '6px',
  borderStyle: 'solid',
});

export const dot = styleVariants({
  lilac: [dotBase, { borderColor: colors.primary[600], boxShadow: `0 0 0 5px ${colors.primary[100]}` }],
  blue: [dotBase, { borderColor: '#22d3ee', boxShadow: '0 0 0 5px #cffafe' }],
});

export const stopText = style({
  margin: 0,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
});
