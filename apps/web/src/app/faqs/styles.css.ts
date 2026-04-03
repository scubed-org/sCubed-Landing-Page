import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '@/styles/tokens.css';

// Hero Section Styles
export const heroSection = style({
  position: 'relative',
  width: '100%',
  marginTop: '0px',
  paddingBottom: '0',
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 100%)`,
  borderBottom: `1px solid ${colors.neutral[100]}`,
  overflow: 'hidden',
});

export const heroContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.sm}`,
    },
  },
});

export const heroContent = style({
  textAlign: 'center',
  maxWidth: '900px',
  margin: '0 auto',
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800',
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const heroTitleHighlight = style({
  color: colors.primary[600],
  position: 'relative',
});

export const heroSubtitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.normal,
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.body,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const heroDescription = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[500],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  maxWidth: '700px',
  margin: `0 auto ${spacing['2xl']} auto`,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.base,
      marginBottom: spacing.xl,
    },
  },
});

export const searchBar = style({
  display: 'flex',
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: spacing['2xl'],
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  backgroundColor: colors.white,
  '@media': {
    '(max-width: 768px)': {
      marginTop: spacing.xl,
    },
  },
});

export const searchInput = style({
  flex: 1,
  padding: `${spacing.md} ${spacing.lg}`,
  border: 'none',
  fontSize: typography.fontSize.lg,
  color: colors.neutral[800],
  backgroundColor: colors.white,
  outline: 'none',
  fontFamily: typography.fontFamily.body,
  '::placeholder': {
    color: colors.neutral[400],
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: colors.neutral[50],
  },
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.sm} ${spacing.md}`,
    },
  },
});

export const searchButton = style({
  padding: `0 ${spacing.lg}`,
  border: 'none',
  backgroundColor: colors.primary[600],
  color: colors.white,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: colors.primary[700],
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: colors.neutral[300],
  },
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.md}`,
    },
  },
});

// Main content styles
export const container = style({
  padding: `${spacing.xl} 0`,
  backgroundColor: colors.white,
  minHeight: 'auto',
});

export const wrapper = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.sm}`,
    },
  },
});

// Removed mainTitle as we're using hero title now
export const mainTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  textAlign: 'center',
  marginBottom: spacing.xl,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.lg,
    },
  },
});

export const section = style({
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
  borderRadius: '12px',
  transition: 'background-color 0.3s ease',
  overflowAnchor: 'none',
  ':hover': {
    backgroundColor: colors.neutral[100],
  },
  ':first-of-type': {
    marginTop: 0,
  },
  ':last-of-type': {
    marginBottom: 0,
  },
  '@media': {
    '(max-width: 768px)': {
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
  },
});

export const sectionHeader = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'none',
  border: 'none',
  padding: `${spacing.md} ${spacing.lg} ${spacing.md} ${spacing.lg}`,
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',
  '@media': {
    '(max-width: 768px)': {
      padding: `${spacing.sm} ${spacing.md} ${spacing.sm} ${spacing.md}`,
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  margin: 0,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'left',
  lineHeight: 1,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const chevronIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  flexShrink: 0,
  marginLeft: spacing.md,
  '@media': {
    '(max-width: 768px)': {
      marginLeft: spacing.sm,
    },
  },
});

export const qaItem = style({
  paddingBottom: spacing.sm,
  borderTop: `1px solid ${colors.neutral[200]}`,
  paddingTop: spacing.sm,
  ':first-child': {
    borderTop: 'none',
    paddingTop: 0,
  },
  '@media': {
    '(max-width: 768px)': {
      paddingBottom: spacing.md,
      paddingTop: spacing.md,
      ':first-child': {
        paddingTop: 0,
      },
    },
  },
});

export const question = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing.sm,
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.normal,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing.xs,
    },
  },
});

export const answer = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[600],
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.relaxed,
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: spacing.sm,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.base,
      marginTop: spacing.xs,
    },
  },
});

export const contactLinkWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: spacing['3xl'],
  paddingTop: spacing['2xl'],
  borderTop: `1px solid ${colors.neutral[200]}`,
  '@media': {
    '(max-width: 768px)': {
      marginTop: spacing['2xl'],
      paddingTop: spacing.xl,
    },
  },
});

export const contactText = style({
  fontSize: typography.fontSize['2xl'],
  color: colors.neutral[700],
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
      textAlign: 'center',
    },
  },
});

export const sectionExpanded = style({
  backgroundColor: colors.neutral[100],
});

export const qaContainer = style({
  padding: `${spacing.sm} ${spacing.lg} ${spacing.md} ${spacing.lg}`,
  '@media': {
    '(max-width: 768px)': {
      padding: `${spacing.xs} ${spacing.md} ${spacing.sm} ${spacing.md}`,
    },
  },
});

export const contactLink = style({
  color: colors.primary[600],
  fontWeight: typography.fontWeight.bold,
  fontSize: typography.fontSize['2xl'],
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  borderBottom: `2px solid ${colors.primary[600]}`,
  paddingBottom: '2px',
  ':hover': {
    color: colors.primary[700],
    borderBottomColor: colors.primary[700],
  },
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});
