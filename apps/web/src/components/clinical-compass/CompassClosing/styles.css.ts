import { style, styleVariants } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';
import { BREAKPOINTS } from '../shared.css';

const TEAL = colors.accent.teal;
const GREEN = colors.accent.green;
const PURPLE = colors.primary[600];

const { mobile: MOBILE, phone: PHONE } = BREAKPOINTS;

const sectionBase = style({
  padding: `${spacing.xl} 0`,
  backgroundColor: colors.white,
  '@media': {
    [MOBILE]: {
      padding: `${spacing.lg} 0`,
    },
  },
});

// `flushTop` drops the top padding when the section above is also white and
// already ends with the same padding, so the gap isn't doubled.
export const closingSection = styleVariants({
  default: [sectionBase],
  flushTop: [
    sectionBase,
    { paddingTop: 0, '@media': { [MOBILE]: { paddingTop: 0 } } },
  ],
});

// The site doesn't set border-box globally, so it is set here to keep the
// padding inside the card. The card is a little wider than its text so the
// content has room to breathe, centred, with soft glows in two corners.
export const closingCard = style({
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  boxSizing: 'border-box',
  maxWidth: '880px',
  margin: '0 auto',
  padding: '56px 64px',
  borderRadius: radius.xl,
  textAlign: 'center',
  backgroundColor: colors.white,
  border: `1px solid ${colors.primary[100]}`,
  '::before': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    width: '280px',
    height: '280px',
    right: '-90px',
    top: '-110px',
    borderRadius: radius.full,
    background: 'rgba(122, 126, 237, 0.12)',
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    width: '200px',
    height: '200px',
    left: '-70px',
    bottom: '-90px',
    borderRadius: radius.full,
    background: 'rgba(34, 211, 238, 0.10)',
    pointerEvents: 'none',
  },
  '@media': {
    [MOBILE]: {
      padding: '40px 32px',
    },
    // Small phones: tighter padding and smaller glows, so they stay in the
    // corners instead of covering the card.
    [PHONE]: {
      padding: '36px 20px',
      borderRadius: '18px',
      '::before': {
        width: '180px',
        height: '180px',
        right: '-70px',
        top: '-80px',
      },
      '::after': {
        width: '130px',
        height: '130px',
        left: '-50px',
        bottom: '-60px',
      },
    },
  },
});

// Deliberately a step larger than the shared sectionTitle (40px), per the
// approved design, as this is the page's statement heading.
export const closingTitle = style({
  margin: 0,
  fontSize: '2.75rem',
  fontWeight: '800',
  fontFamily: typography.fontFamily.heading,
  lineHeight: '1.2',
  letterSpacing: '-0.02em',
  color: colors.neutral[900],
  // Evens out the lines when the heading wraps on narrow screens.
  textWrap: 'balance',
  '@media': {
    [BREAKPOINTS.narrowContainer]: {
      fontSize: '2.375rem',
    },
    [BREAKPOINTS.stacked]: {
      fontSize: 'clamp(1.75rem, 3.8vw, 2.375rem)',
    },
    // 24px on a 375px phone, so "Your Clinical Compass." fits on one line.
    [PHONE]: {
      fontSize: 'clamp(1.375rem, 6.4vw, 1.75rem)',
    },
  },
});

// "Your Clinical Compass." on its own line, in brand purple.
export const titleHighlight = style({
  display: 'block',
  color: PURPLE,
});

export const closingLead = style({
  maxWidth: '640px',
  margin: '20px auto 0',
  fontSize: typography.fontSize.lg,
  lineHeight: '1.75',
  color: colors.neutral[600],
  '@media': {
    [MOBILE]: {
      fontSize: typography.fontSize.base,
    },
  },
});

// A short teal-green-purple rule in the page's accent colours.
export const closingRule = style({
  display: 'block',
  width: '72px',
  height: '4px',
  margin: `${spacing.md} auto`,
  borderRadius: radius.full,
  background: `linear-gradient(90deg, ${TEAL}, ${GREEN}, ${PURPLE})`,
});

export const closingStatement = style({
  maxWidth: '660px',
  margin: '0 auto',
  fontSize: typography.fontSize.xl,
  lineHeight: '1.55',
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  '@media': {
    [MOBILE]: {
      fontSize: typography.fontSize.lg,
    },
    [PHONE]: {
      fontSize: '1.0625rem',
    },
  },
});

// A lilac highlighter stroke behind the closing phrase.
export const closingHighlight = style({
  padding: '0 2px',
  background: `linear-gradient(transparent 62%, ${colors.primary[300]} 62%)`,
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
});
