import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const heroSection = style({
  position: 'relative',
  width: '100%',
  padding: `${spacing.xl} 0`,
  backgroundColor: colors.white,
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const backgroundImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
});

export const backgroundOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  backgroundImage:
    'linear-gradient(to bottom right, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.88))',
});

export const heroContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  position: 'relative',
  zIndex: 10,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const heroContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing['3xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: spacing['2xl'],
    },
  },
});

export const heroTextContent = style({
  '@media': {
    'screen and (max-width: 968px)': {
      textAlign: 'center',
    },
  },
});

export const heroImageContent = style({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',  
  margin: '0 auto',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '400px',
    },
    'screen and (max-width: 480px)': {
      maxWidth: '320px',
    },
  },
});

export const heroImage = style({
  objectFit: 'contain',
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '100%',
      height: 'auto',
    },
    'screen and (max-width: 480px)': {
      width: '100%',
      height: 'auto',
    },
  },
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800',
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  margin: '0px',
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const heroTitleHighlight = style({
  color: colors.primary[600],
});

export const heroDescription = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.xl,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const heroValueStack = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
  lineHeight: typography.lineHeight.relaxed,
  marginTop: `-${spacing.md}`,
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.body,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
    },
  },
});

export const heroTrustBar = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[600],
  marginBottom: spacing.xl,
  fontFamily: typography.fontFamily.body,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xs,
    },
  },
});

export const ctaSection = style({
  display: 'flex',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 968px)': {
      justifyContent: 'center',
    },
  },
});

export const trustIndicator = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  marginTop: spacing.sm,
  fontWeight: typography.fontWeight.medium,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      textAlign: 'center',
    },
  },
});

// Bullet list card styles
export const bulletSection = style({
  padding: `${spacing.lg} 0 ${spacing.xl} 0`,
  background: `
    linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.primary[50]} 30%, ${colors.neutral[50]} 70%, ${colors.primary[50]} 100%),
    radial-gradient(ellipse at top, rgba(122, 126, 237, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse at bottom, rgba(34, 211, 238, 0.08) 0%, transparent 60%)
  `,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(122, 126, 237, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 10%, rgba(52, 211, 153, 0.06) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)
    `,
    pointerEvents: 'none',
    opacity: 0.6,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.md} 0 ${spacing.lg} 0`,
    },
  },
});

export const bulletCard = style({
  background: `
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 255, 0.9) 100%),
    linear-gradient(135deg, transparent 0%, rgba(122, 126, 237, 0.02) 100%)
  `,
  borderRadius: '32px',
  padding: spacing.xl,
  boxShadow: `
    0 32px 64px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
  `,
  border: `2px solid rgba(255, 255, 255, 0.7)`,
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '300px',
    height: '300px',
    background: `
      radial-gradient(circle, rgba(122, 126, 237, 0.08) 0%, transparent 60%),
      radial-gradient(circle, rgba(34, 211, 238, 0.04) 20%, transparent 80%)
    `,
    borderRadius: '50%',
    transform: 'translate(100px, -100px)',
    transition: 'all 0.6s ease',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '250px',
    height: '250px',
    background: `radial-gradient(circle, rgba(52, 211, 153, 0.06) 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(-80px, 80px)',
    transition: 'all 0.6s ease',
  },
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: `
      0 40px 80px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.8),
      inset 0 1px 0 rgba(255, 255, 255, 1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  selectors: {
    '&:hover::before': {
      opacity: 1.2,
      transform: 'translate(80px, -80px) scale(1.1)',
    },
    '&:hover::after': {
      opacity: 1.2,
      transform: 'translate(-60px, 60px) scale(1.1)',
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      borderRadius: '24px',
    },
  },
});

globalStyle(`${bulletCard} > h3`, {
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing['2xl'],
  lineHeight: typography.lineHeight.tight,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
      marginBottom: spacing.xl,
    },
  },
});

globalStyle(`${bulletCard} > p`, {
  fontSize: typography.fontSize.xl,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  marginTop: spacing['2xl'],
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.medium,
  textAlign: 'center',
  maxWidth: '700px',
  margin: `${spacing['2xl']} auto 0 auto`,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      maxWidth: '100%',
      marginTop: spacing.xl,
    },
  },
});

globalStyle(`${heroDescription} strong`, {
  color: colors.primary[700],
  fontWeight: typography.fontWeight.bold,
  background: `linear-gradient(120deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  padding: '2px 6px',
  borderRadius: '4px',
});

export const bulletGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.xl,
  margin: `0 auto`,
  maxWidth: '800px',
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      maxWidth: '600px',
      gap: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
      maxWidth: '400px',
    },
  },
});

export const bulletItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.md,
  padding: spacing.xl,
  borderRadius: '24px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  background: `
    linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 255, 0.6) 100%),
    linear-gradient(135deg, transparent 0%, rgba(122, 126, 237, 0.03) 100%)
  `,
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(0, 0, 0, 0.03)
  `,
  border: `1px solid rgba(255, 255, 255, 0.5)`,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  overflow: 'hidden',
  cursor: 'pointer',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 50% 0%, rgba(122, 126, 237, 0.1) 0%, transparent 60%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    `,
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },

  ':hover': {
    transform: 'translateY(-12px) scale(1.05)',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 255, 0.8) 100%),
      linear-gradient(135deg, rgba(122, 126, 237, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)
    `,
    boxShadow: `
      0 20px 60px rgba(122, 126, 237, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.8),
      inset 0 1px 0 rgba(255, 255, 255, 1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
    `,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
  },

  selectors: {
    '&:hover::before': {
      opacity: 1,
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      borderRadius: '20px',
      flexDirection: 'row',
      textAlign: 'left',
      alignItems: 'flex-start',
    },
  },
});

export const bulletIcon = style({
  flexShrink: 0,
  width: '64px',
  height: '64px',
  borderRadius: radius.full,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[200]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `3px solid ${colors.white}`,
  boxShadow: `
    0 8px 24px rgba(122, 126, 237, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
  `,
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  selectors: {
    [`${bulletItem}:hover &`]: {
      transform: 'scale(1.15) rotate(8deg) translateY(-4px)',
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
      color: colors.white,
      boxShadow: `
        0 16px 40px rgba(122, 126, 237, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.9),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2)
      `,
      borderColor: colors.white,
    },
    [`${bulletItem}:hover &::before`]: {
      opacity: 1,
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      width: '56px',
      height: '56px',
    },
  },
});

export const bulletText = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[800],
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.semibold,
  lineHeight: typography.lineHeight.relaxed,
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  transition: 'color 0.3s ease',

  selectors: {
    [`${bulletItem}:hover &`]: {
      color: colors.neutral[900],
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      textAlign: 'left',
      flex: 1,
      paddingTop: '2px',
    },
  },
});
