import { style } from '@vanilla-extract/css';

import { colors, radius, spacing, typography } from '../../styles/tokens.css';

export const footerWrapper = style({
  width: '100%',
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, rgba(122, 126, 237, 0.05) 100%)`,
  borderTop: `1px solid ${colors.primary[100]}`,
  marginTop: '0px',
  overflowX: 'hidden',
});

export const footerContainer = style({
  maxWidth: '1400px',
  width: '100%',
  margin: '0 auto',
  padding: `${spacing.lg} ${spacing.md}`,
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.md} 15px`,
      width: '100%',
      maxWidth: '100%',
    },
  },
});

export const footerContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: spacing.xl,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const brandSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridColumn: '1 / -1',
      alignItems: 'center',
      textAlign: 'center',
      paddingRight: 0,
      paddingBottom: spacing.md,
      borderBottom: `1px solid ${colors.neutral[200]}`,
    },
    'screen and (max-width: 768px)': {
      alignItems: 'center',
    },
  },
});

export const rightColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
});

export const newsletterRow = style({
  width: '100%',
  paddingBottom: spacing.md,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  '@media': {
    'screen and (max-width: 768px)': {
      paddingBottom: spacing.sm,
    },
  },
});

export const linksRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.sm,
      textAlign: 'center',
    },
  },
});

export const logoWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  width: 'fit-content',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const brandDescription = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  maxWidth: '400px',
  marginBottom: '0',
  marginBlockStart: '5px',
  '@media': {
    'screen and (max-width: 1024px)': {
      maxWidth: '600px',
      textAlign: 'center',
      margin: '0 auto',
      paddingTop: spacing.md,
    },
    'screen and (max-width: 768px)': {
      textAlign: 'center',
      fontSize: typography.fontSize.sm,
      maxWidth: '100%',
      marginBottom: '0',
    },
  },
});

export const footerColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    'screen and (max-width: 768px)': {
      alignItems: 'center',
      marginBottom: spacing.md,
      gap: spacing.xs,
    },
  },
});

export const columnTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '8px',
  position: 'relative',
  display: 'inline-block',
  ':after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '25px',
    height: '2px',
    background: colors.primary[600],
    borderRadius: radius.full,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing.xs,
      ':after': {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
});

export const footerLink = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  position: 'relative',
  paddingLeft: '0',
  ':hover': {
    color: colors.primary[600],
    paddingLeft: '3px',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      ':hover': {
        paddingLeft: '0',
      },
    },
  },
});

export const bottomSection = style({
  marginTop: spacing.md,
  paddingTop: spacing.md,
  borderTop: `1px solid ${colors.neutral[200]}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: spacing.sm,
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
    },
  },
});

export const copyrightText = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  fontWeight: typography.fontWeight.normal,
});

export const legalLinks = style({
  display: 'flex',
  gap: spacing.md,
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      gap: spacing.xs,
    },
  },
});

export const legalLink = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  textDecoration: 'none',
  position: 'relative',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.primary[600],
  },
  selectors: {
    '&:not(:last-child)::after': {
      content: '"|"',
      position: 'absolute',
      right: `-${spacing.sm}`,
      color: colors.neutral[300],
      '@media': {
        'screen and (max-width: 768px)': {
          display: 'none',
        },
      },
    },
  },
});

export const contactInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
  '@media': {
    'screen and (max-width: 768px)': {
      marginBottom: spacing.md,
    },
  },
});

export const contactItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.primary[600],
  },
  '@media': {
    'screen and (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
});



export const iconStyle = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
});

export const logosRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xl,
  // marginTop: spacing.md,
  '@media': {
    'screen and (max-width: 1024px)': {
      justifyContent: 'center',
      gap: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      justifyContent: 'center',
      gap: spacing.lg,
    },
  },
});

export const certificationImage = style({
  height: '70px',
  width: '70px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: `2px solid ${colors.neutral[200]}`,
  '@media': {
    'screen and (max-width: 768px)': {
      height: '60px',
      width: '60px',
    },
  },
});

export const hipaaLogo = style({
  height: '70px',
  width: 'auto',
  objectFit: 'contain',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '60px',
    },
  },
});

// Review Platforms Section
export const reviewPlatformsSection = style({
  marginTop: spacing.md,
  paddingTop: 0,
  borderTop: `1px solid ${colors.neutral[200]}`,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  columnGap: '96px',
  rowGap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

export const reviewPlatformsSectionTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[700],
  marginBottom: spacing.sm,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      marginBottom: spacing.xs,
    },
  },
});

export const reviewPlatformsGrid = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.lg,
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: spacing.md,
    },
  },
});

export const reviewPlatformLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  opacity: 0.8,
  transition: 'all 0.3s ease',
  padding: spacing.xs,
  ':hover': {
    opacity: 1,
    transform: 'translateY(-3px)',
  },
});

export const reviewPlatformLogo = style({
  height: '45px',
  width: 'auto',
  objectFit: 'contain',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '40px',
    },
  },
});

export const badgeGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const appGroups = style({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  columnGap: '96px',
  rowGap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

// Doubled selector outranks the shared StoreBadges row styles regardless of CSS load order.
// minHeight matches reviewPlatformLink (logo + padding) so badges centre against the logos.
export const appBadges = style({
  selectors: {
    '&&': {
      gap: spacing.xs,
      justifyContent: 'center',
      minHeight: '61px',
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      selectors: {
        '&&': {
          minHeight: '56px',
        },
      },
    },
  },
});
