import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../../styles/tokens.css';

export const eventsSection = style({
  // padding: `${spacing['2xl']} ${spacing.md} ${spacing['4xl']} ${spacing.md}`,
  position: 'relative',
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',
  padding: `0 ${spacing.xl} ${spacing['3xl']}`,
  '@media': {
    '(max-width: 768px)': {
      maxWidth: '800px',
      width: '90%',
      padding: '0 1rem 4rem',
    },
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '100%',
      boxSizing: 'border-box',
    },
  },
});

export const eventGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: spacing.md,
    },
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const eventCard = style({
  position: 'relative',
  background: colors.white,
  borderRadius: '16px',
  overflow: 'hidden',
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: `
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1)
  `,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',

  ':hover': {
    transform: 'translateY(-8px)',
    boxShadow: `
      0 20px 30px rgba(0, 0, 0, 0.12),
      0 8px 12px rgba(0, 0, 0, 0.08)
    `,
    borderColor: colors.primary[300],
  },

  '@media': {
    'screen and (max-width: 768px)': {
      borderRadius: '12px',
    },
  },
});

export const eventImageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '220px',
  overflow: 'hidden',
  flexShrink: 0,
});

export const eventThumbnail = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',

  selectors: {
    [`${eventCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const eventType = style({
  position: 'absolute',
  top: spacing.md,
  left: spacing.md,
  padding: `6px 12px`,
  borderRadius: '8px',
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 2,
  transition: 'transform 0.2s ease',

  selectors: {
    [`${eventCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const eventCardContent = style({
  padding: `${spacing.md} ${spacing.lg} ${spacing.lg}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
});

export const eventTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: '1.2',
  fontFamily: typography.fontFamily.heading,
  margin: 0,
  marginBottom: '8px',
  padding: 0,
  minHeight: '2.8rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'color 0.3s ease',

  selectors: {
    [`${eventCard}:hover &`]: {
      color: colors.primary[700],
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
      minHeight: '2.4rem',
    },
  },
});

export const eventDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: '1.5',
  fontFamily: typography.fontFamily.body,
  margin: 0,
  marginBottom: '12px',
  padding: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '2.8rem',
  flex: 1,

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      minHeight: '2.4rem',
    },
  },
});

export const eventDetails = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: spacing.md,
  paddingTop: '12px',
  paddingBottom: '8px',
  borderTop: `1px solid ${colors.neutral[100]}`,
  marginTop: 'auto',

  '@media': {
    'screen and (max-width: 1480px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '1rem',
    },
  },
});

export const eventDetailsInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
});

export const eventDetailsItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: '1.3',
});

export const eventIcon = style({
  color: colors.primary[600],
  flexShrink: 0,
});

export const eventDate = style({
  color: colors.neutral[700],
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  margin: 0,
  padding: 0,
  lineHeight: '1.3',
});

export const eventTime = style({
  color: colors.neutral[600],
  fontWeight: typography.fontWeight.normal,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  margin: 0,
  padding: 0,
  lineHeight: '1.3',
});

export const eventLocation = style({
  color: colors.neutral[600],
  fontWeight: typography.fontWeight.normal,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  margin: 0,
  padding: 0,
  lineHeight: '1.3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  '@media': {
    'screen and (min-width: 1024px)': {
      maxWidth: '200px',
    },
  },
});

export const eventLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: `8px 14px`,
  background: colors.primary[600],
  color: colors.white,
  borderRadius: '6px',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.body,
  textDecoration: 'none',
  transition: 'text-decoration 0.2s ease',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  alignSelf: 'flex-end',

  ':hover': {
    background: colors.primary[600],
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  ':focus': {
    outline: `2px solid ${colors.primary[500]}`,
    outlineOffset: '2px',
  },

  '@media': {
    'screen and (max-width: 1480px)': {
      justifyContent: 'center',
      padding: `8px 16px`,
      alignSelf: 'auto',
      fontSize: typography.fontSize.sm,
    },
  },
});

// Cleanup - removed unused styles
export const eventMeta = style({});
