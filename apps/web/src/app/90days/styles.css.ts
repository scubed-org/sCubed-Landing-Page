import { style, globalStyle } from '@vanilla-extract/css';

import { colors, typography, spacing, radius, shadows } from '@/styles/tokens.css';

export const page = style({
  fontFamily: typography.fontFamily.body,
  color: colors.neutral[800],
  background: colors.white,
});

export const hero = style({
  background: `linear-gradient(160deg, ${colors.primary[900]} 0%, ${colors.primary[600]} 100%)`,
  color: colors.white,
  padding: `${spacing['3xl']} ${spacing.sm} ${spacing['2xl']}`,
});

export const heroInner = style({
  maxWidth: '880px',
  margin: '0 auto',
});

export const eyebrow = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.primary[200],
  margin: 0,
});

export const heroTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  margin: `${spacing.sm} 0 ${spacing.md}`,
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const heroLede = style({
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.primary[100],
  margin: 0,
});

export const byline = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.xs,
  alignItems: 'baseline',
  marginTop: spacing.lg,
  paddingTop: spacing.md,
  borderTop: `1px solid rgba(255, 255, 255, 0.22)`,
  fontSize: typography.fontSize.sm,
  color: colors.primary[100],
});

export const bylineName = style({
  fontWeight: typography.fontWeight.semibold,
  color: colors.white,
});

export const main = style({
  maxWidth: '880px',
  margin: '0 auto',
  padding: `${spacing['2xl']} ${spacing.sm} ${spacing['3xl']}`,
});

export const part = style({
  marginBottom: spacing['2xl'],
  scrollMarginTop: spacing.lg,
});

export const partLabel = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.primary[600],
  margin: 0,
});

export const partTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.snug,
  color: colors.neutral[900],
  margin: `${spacing.xs} 0 ${spacing.sm}`,
});

export const partIntro = style({
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `0 0 ${spacing.lg}`,
});

export const h3 = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: `${spacing.lg} 0 ${spacing.xs}`,
});

export const body = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  margin: `0 0 ${spacing.sm}`,
});

export const steps = style({
  listStyle: 'none',
  counterReset: 'step',
  padding: 0,
  margin: `${spacing.md} 0 0`,
});

export const step = style({
  counterIncrement: 'step',
  position: 'relative',
  paddingLeft: '3rem',
  marginBottom: spacing.lg,
  '::before': {
    content: 'counter(step)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '2rem',
    height: '2rem',
    borderRadius: radius.full,
    background: colors.primary[600],
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const stepTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: `0.3rem 0 ${spacing.xs}`,
});

export const bullets = style({
  margin: `0 0 ${spacing.sm}`,
  paddingLeft: '1.1rem',
  color: colors.neutral[700],
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
});

globalStyle(`${bullets} li`, {
  marginBottom: '0.4rem',
});

export const callout = style({
  background: colors.primary[50],
  borderLeft: `4px solid ${colors.primary[600]}`,
  borderRadius: `0 ${radius.base} ${radius.base} 0`,
  padding: `${spacing.md} ${spacing.md}`,
  margin: `${spacing.lg} 0`,
});

export const calloutLabel = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: colors.primary[800],
  margin: `0 0 ${spacing.xs}`,
});

export const tableWrap = style({
  overflowX: 'auto',
  margin: `${spacing.md} 0 ${spacing.lg}`,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.base,
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: typography.fontSize.base,
  textAlign: 'left',
});

globalStyle(`${table} th`, {
  background: colors.neutral[50],
  color: colors.neutral[900],
  fontWeight: typography.fontWeight.semibold,
  padding: `${spacing.xs} ${spacing.sm}`,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  whiteSpace: 'nowrap',
});

globalStyle(`${table} td`, {
  padding: `${spacing.xs} ${spacing.sm}`,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.normal,
  verticalAlign: 'top',
});

globalStyle(`${table} tr:last-child td`, {
  borderBottom: 'none',
});

export const capture = style({
  background: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.lg,
  padding: spacing.xl,
  margin: `${spacing['2xl']} 0 0`,
  boxShadow: shadows.sm,
});

export const captureTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  margin: `0 0 ${spacing.xs}`,
});

export const captureBody = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `0 0 ${spacing.md}`,
});

export const closing = style({
  borderTop: `1px solid ${colors.neutral[200]}`,
  marginTop: spacing['2xl'],
  paddingTop: spacing.xl,
});

export const closingQuote = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xl,
  lineHeight: typography.lineHeight.snug,
  color: colors.neutral[800],
  fontStyle: 'italic',
  margin: `0 0 ${spacing.md}`,
});

export const signoff = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  margin: 0,
});

export const contactLink = style({
  color: colors.primary[700],
  fontWeight: typography.fontWeight.semibold,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

// ---------------------------------------------------------------- booking CTA

export const ctaButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  background: colors.primary[600],
  color: colors.white,
  border: 'none',
  cursor: 'pointer',
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  padding: `0.7rem 1.25rem`,
  borderRadius: radius.full,
  textDecoration: 'none',
  boxShadow: shadows.purple,
  transition: 'background 150ms ease, transform 150ms ease',
  ':hover': {
    background: colors.primary[700],
    transform: 'translateY(-1px)',
  },
});

export const ctaBlock = style({
  background: colors.primary[50],
  border: `1px solid ${colors.primary[200]}`,
  borderRadius: radius.lg,
  padding: spacing.xl,
  margin: `${spacing.xl} 0 0`,
});

export const ctaBlockTitle = style({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  margin: `0 0 ${spacing.xs}`,
});

export const ctaBlockBody = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: `0 0 ${spacing.md}`,
});

// Sticky helper. Hidden until the reader is actually into the guide, and
// dismissible, because the piece promises no pitch.
export const stickyWrap = style({
  position: 'fixed',
  right: spacing.md,
  bottom: spacing.lg,
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.full,
  boxShadow: shadows.lg,
  padding: `0.5rem 0.6rem 0.5rem ${spacing.md}`,
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(12px)',
  transition: 'opacity 200ms ease, transform 200ms ease, visibility 200ms',
  '@media': {
    'screen and (max-width: 600px)': {
      left: spacing.sm,
      right: spacing.sm,
      bottom: spacing.sm,
      justifyContent: 'space-between',
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'opacity 200ms ease, visibility 200ms',
      transform: 'none',
    },
  },
});

export const stickyVisible = style({
  opacity: 1,
  visibility: 'visible',
  transform: 'translateY(0)',
});

export const stickyLabel = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[700],
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 420px)': {
      display: 'none',
    },
  },
});

export const stickyDismiss = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: colors.neutral[400],
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem',
  borderRadius: radius.full,
  ':hover': {
    color: colors.neutral[700],
  },
});
