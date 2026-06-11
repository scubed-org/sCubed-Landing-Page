import { keyframes, style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography,
  radius,
} from '../../../styles/tokens.css';

const float = keyframes({
  '0%, 100%': {
    transform: 'translateY(0) rotate(0deg)',
  },
  '50%': {
    transform: 'translateY(-10px) rotate(180deg)',
  },
});

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '-200% 0',
  },
  '100%': {
    backgroundPosition: '200% 0',
  },
});

export const bannerSection = style({
  position: 'relative',
  width: '100%',
  minHeight: '320px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: spacing['2xl'],
  marginTop: '-92px',
  paddingTop: '92px',
  background: `linear-gradient(135deg,
    ${colors.primary[600]} 0%,
    ${colors.primary[500]} 25%,
    #22d3ee 50%,
    ${colors.primary[600]} 75%,
    ${colors.primary[700]} 100%
  )`,
  backgroundSize: '200% 200%',
  animation: `${shimmer} 15s ease infinite`,
  '@media': {
    'screen and (max-width: 820px)': {
      marginTop: '-117px',
      paddingTop: '117px',
    },
    'screen and (max-width: 800px)': {
      marginTop: '-147px',
      paddingTop: '147px',
    },
    'screen and (max-width: 768px)': {
      minHeight: '280px',
      marginBottom: spacing.xl,
      marginTop: '-228px',
      paddingTop: '228px',
    },
    'screen and (max-width: 480px)': {
      minHeight: '260px',
    },
  },
});

export const bannerPattern = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.1,
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 35px,
      rgba(255, 255, 255, 0.05) 35px,
      rgba(255, 255, 255, 0.05) 70px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 35px,
      rgba(255, 255, 255, 0.03) 35px,
      rgba(255, 255, 255, 0.03) 70px
    )
  `,
  pointerEvents: 'none',
});

export const bannerContainer = style({
  position: 'relative',
  zIndex: 10,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const bannerContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: `${spacing.xl} ${spacing.md}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} ${spacing.md}`,
    },
  },
});

export const bannerTextContent = style({
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
});

export const bannerTitleWrapper = style({
  position: 'relative',
  marginBottom: spacing.lg,
});

export const bannerIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  marginBottom: 0,
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: radius.full,
  color: colors.white,
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3)
  `,
  animation: `${float} 4s ease-in-out infinite`,
});

export const bannerTitle = style({
  fontSize: '4rem',
  fontWeight: '900',
  color: colors.white,
  lineHeight: '1.1',
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
  letterSpacing: '-0.02em',
  textShadow: `
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.15)
  `,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '3rem',
    },
    'screen and (max-width: 480px)': {
      fontSize: '2.5rem',
    },
  },
});

export const bannerTitleHighlight = style({
  color: colors.white,
  position: 'relative',
  display: 'inline-block',
  background: `linear-gradient(90deg,
    ${colors.white} 0%,
    rgba(255, 255, 255, 0.9) 50%,
    ${colors.white} 100%
  )`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
});

export const bannerUnderline = style({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100px',
  height: '4px',
  background: `linear-gradient(90deg,
    transparent,
    ${colors.white},
    transparent
  )`,
  borderRadius: radius.full,
  transformOrigin: 'center',
});

export const bannerDescription = style({
  fontSize: typography.fontSize.xl,
  color: 'rgba(255, 255, 255, 0.95)',
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.medium,
  maxWidth: '600px',
  margin: '0 auto',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      maxWidth: '500px',
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

// Cleanup - removed unused styles
export const bannerImage = style({});
export const backgroundOverlay = style({});