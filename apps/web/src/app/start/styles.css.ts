import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '@/styles/tokens.css';

// The site's Navigation bar is sticky, so anchored sections need headroom.
const ANCHOR_OFFSET = '96px';

/* ---------- Shared section layout ---------- */

export const section = style({
  padding: `${spacing['2xl']} 0`,
  background: colors.white,
  scrollMarginTop: ANCHOR_OFFSET,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const sectionAlt = style([
  section,
  {
    background: colors.neutral[50],
  },
]);

export const sectionInner = style({
  maxWidth: '1100px',
  margin: '0 auto',
  padding: `0 ${spacing.sm}`,
});

export const sectionCenter = style({
  textAlign: 'center',
  maxWidth: '720px',
  margin: '0 auto',
});

export const sectionEyebrow = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.primary[600],
  margin: 0,
});

export const sectionTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  color: colors.neutral[900],
  margin: `${spacing.xs} 0 ${spacing.sm}`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const sectionIntro = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `0 0 ${spacing.lg}`,
});

/* ---------- Hero ---------- */

export const heroInner = style({
  maxWidth: '820px',
  margin: '0 auto',
  textAlign: 'center',
});

globalStyle(`${heroInner} h1`, {
  marginBottom: spacing.md,
});

export const heroNote = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  margin: `${spacing.sm} 0 0`,
});

export const chooser = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.sm,
  marginTop: spacing.lg,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const chooserCard = style({
  width: '100%',
  cursor: 'pointer',
  font: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: `${spacing.md} ${spacing.md}`,
  borderRadius: radius.lg,
  border: `2px solid ${colors.primary[100]}`,
  background: colors.white,
  boxShadow: shadows.md,
  textDecoration: 'none',
  textAlign: 'left',
  transition: 'all 0.25s ease',
  ':hover': {
    borderColor: colors.primary[600],
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
  },
  ':focus-visible': {
    outline: `3px solid ${colors.primary[300]}`,
    outlineOffset: '2px',
  },
});

export const chooserTitle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.xs,
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
});

export const chooserHint = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

/* ---------- Social proof ---------- */

export const socialProof = style({
  background: colors.white,
  paddingBottom: spacing.lg,
});

/* ---------- Two paths ---------- */

export const pathGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  margin: `${spacing.md} 0 0`,
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const pathCard = style({
  display: 'flex',
  flexDirection: 'column',
  background: colors.white,
  borderRadius: radius.xl,
  padding: spacing.lg,
  boxShadow: shadows.md,
  border: `1px solid ${colors.neutral[200]}`,
  scrollMarginTop: ANCHOR_OFFSET,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
    },
  },
});

export const pathCardTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  margin: 0,
});

export const pathCardIntro = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `${spacing.xs} 0 ${spacing.md}`,
});

export const pathSteps = style({
  listStyle: 'none',
  counterReset: 'pathstep',
  padding: 0,
  margin: 0,
});

export const pathStep = style({
  counterIncrement: 'pathstep',
  position: 'relative',
  paddingLeft: '3rem',
  paddingBottom: spacing.md,
  '::before': {
    content: 'counter(pathstep)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '2rem',
    height: '2rem',
    borderRadius: radius.full,
    background: colors.primary[600],
    color: colors.white,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    left: 'calc(1rem - 1px)',
    top: '2.25rem',
    bottom: '0.25rem',
    width: '2px',
    background: colors.primary[100],
  },
  selectors: {
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});

export const pathStepTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: '0.2rem 0 0.25rem',
});

export const pathStepText = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.normal,
  color: colors.neutral[700],
  margin: 0,
});

/* ---------- All-in-one modules ---------- */

export const moduleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const moduleCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: spacing.md,
  borderRadius: radius.lg,
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.sm,
  textDecoration: 'none',
  color: 'inherit',
});

export const moduleLink = style({
  transition: 'all 0.25s ease',
  ':hover': {
    borderColor: colors.primary[300],
    boxShadow: shadows.purple,
    transform: 'translateY(-2px)',
  },
});

export const moduleIcon = style({
  width: '44px',
  height: '44px',
  borderRadius: radius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.primary[50],
  color: colors.primary[600],
  marginBottom: '4px',
});

export const moduleTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
});

export const moduleText = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.normal,
  color: colors.neutral[600],
});

/* ---------- Ease of use ---------- */

export const easeGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: spacing.sm,
  marginTop: spacing.md,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const easeCard = style({
  padding: spacing.md,
  borderRadius: radius.lg,
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
});

export const easeIcon = style({
  display: 'inline-flex',
  color: colors.primary[600],
});

export const easeTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: `${spacing.xs} 0 4px`,
});

export const easeText = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.normal,
  color: colors.neutral[600],
  margin: 0,
});

/* ---------- Savings calculator ---------- */

export const calcCard = style({
  background: colors.white,
  borderRadius: radius.xl,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.lg,
  padding: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
    },
  },
});

export const calcGrid = style({
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr',
  gap: spacing.lg,
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const calcRows = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const calcField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const calcLabel = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
});

export const calcSubhead = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: `${spacing.md} 0 ${spacing.sm}`,
});

export const calcInputWrap = style({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.base,
  background: colors.white,
  overflow: 'hidden',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ':focus-within': {
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
  },
});

export const calcInputPrefix = style({
  paddingLeft: '12px',
  color: colors.neutral[500],
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
});

export const calcInput = style({
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  padding: '12px',
  // 16px keeps iOS from zooming the page on focus.
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.body,
  color: colors.neutral[900],
  background: 'transparent',
});

export const calcResults = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const calcResultTile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: spacing.md,
  borderRadius: radius.lg,
  background: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
});

export const calcResultTileHighlight = style({
  background: colors.primary[50],
  borderColor: colors.primary[200],
});

export const calcResultLabel = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const calcResultValue = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  color: colors.neutral[900],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const calcNote = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[500],
  margin: `${spacing.md} 0 0`,
});

globalStyle(`${calcNote} a`, {
  color: colors.primary[600],
  fontWeight: typography.fontWeight.semibold,
});

/* ---------- Offer ---------- */

export const offerSection = style([
  section,
  {
    background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 50%, ${colors.primary[50]} 100%)`,
  },
]);

export const offerGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const offerCard = style({
  background: colors.white,
  borderRadius: radius.xl,
  border: `2px solid ${colors.primary[200]}`,
  padding: spacing.lg,
  boxShadow: shadows.purple,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
    },
  },
});

export const offerCardLabel = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.primary[600],
});

export const offerCardText = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.snug,
  color: colors.neutral[900],
  margin: `${spacing.xs} 0 0`,
});

export const offerDeadline = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  textAlign: 'center',
  color: colors.neutral[800],
  margin: `${spacing.lg} 0`,
});

/* ---------- Booking ---------- */

export const bookSection = style([
  sectionAlt,
  {
    paddingBottom: spacing.lg,
  },
]);

export const bookSubtitle = style([sectionIntro]);

export const embedFrame = style({
  // Calendly needs ~1000px wide and ~700px tall to show the calendar and the
  // time slots side by side without squeezing them.
  height: '760px',
  maxWidth: '1060px',
  margin: '0 auto',
  borderRadius: radius.xl,
  overflow: 'hidden',
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  '@media': {
    // Calendly stacks the calendar and time slots on narrow screens.
    'screen and (max-width: 768px)': {
      height: '1100px',
    },
  },
});

globalStyle(`${embedFrame} > p`, {
  padding: spacing.md,
  fontFamily: typography.fontFamily.body,
  color: colors.neutral[600],
  textAlign: 'center',
});

/* ---------- Path callouts and actions ---------- */

export const callout = style({
  display: 'flex',
  gap: spacing.sm,
  alignItems: 'flex-start',
  padding: spacing.md,
  margin: `0 0 ${spacing.md}`,
  borderRadius: radius.lg,
  background: colors.primary[50],
  border: `1px solid ${colors.primary[100]}`,
});

export const calloutIcon = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: radius.lg,
  background: '#7a7eed',
  color: colors.white,
});

export const calloutTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  margin: '0 0 4px',
});

export const calloutText = style({
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  margin: 0,
});

export const pathActions = style({
  marginTop: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing.sm,
  paddingTop: spacing.md,
  borderTop: `1px solid ${colors.neutral[200]}`,
});

// Same look as the home page hero's secondary button.
export const secondaryButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px 24px',
  backgroundColor: 'transparent',
  color: '#6b7280',
  border: '1px solid #d1d5db',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#7a7eed',
    color: '#7a7eed',
  },
});

/* ---------- Hero panel (after picking a path) ---------- */

export const heroPanel = style({
  textAlign: 'left',
  maxWidth: '720px',
  margin: '0 auto',
});

globalStyle(`${heroPanel} h1`, {
  textAlign: 'left',
});

globalStyle(`${heroPanel} > p`, {
  textAlign: 'left',
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: spacing.sm,
  padding: '6px 12px',
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.full,
  background: colors.white,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[600],
  cursor: 'pointer',
  ':hover': {
    borderColor: '#7a7eed',
    color: '#7a7eed',
  },
});
