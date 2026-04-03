import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../styles/tokens.css';

export const heroSliderSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  minHeight: '600px',
  maxHeight: '800px',
  overflow: 'hidden',
  marginTop: '24px', // Account for fixed header (contact info + nav)
  backgroundColor: '#f8fafc', // Light background to prevent black flash
  userSelect: 'none', // Prevent text selection during swipe
  WebkitUserSelect: 'none',
  touchAction: 'pan-y pinch-zoom', // Allow vertical scroll but handle horizontal swipes
  '@media': {
    'screen and (max-width: 1024px)': {
      height: '70vh',
      minHeight: '550px',
      maxHeight: '700px',
      paddingTop: '40px',
    },
    'screen and (max-width: 767px)': {
      height: 'calc(100vh - 60px)',
      minHeight: '480px',
      maxHeight: 'none',
      marginTop: '60px', // Fixed header on mobile
    },
    'screen and (max-width: 480px)': {
      height: 'calc(60vh - 80px)',
      paddingTop: '80px', // Fixed header on small mobile
    },
  },
});

export const heroSliderContainer = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const heroSliderContent = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 767px)': {
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
    },
  },
});

// Split layout: 50% content left, 50% image right on desktop
export const heroSliderContentSplit = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  '@media': {
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: spacing.lg,
    },
  },
});

// Gradient background: centered content
export const heroSliderContentGradient = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const heroSliderImageWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

export const heroSliderImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const heroSliderOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  // No background - overlay removed
  zIndex: 2,
});

// Mobile overlay for narrow content slides to improve text readability
export const heroSliderOverlayMobile = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)', // White overlay for better black text contrast
  backdropFilter: 'blur(2px)', // Subtle blur effect
  zIndex: 2,
  '@media': {
    'screen and (min-width: 769px)': {
      display: 'none', // Hide on desktop
    },
  },
});

export const heroSliderTextContent = style({
  position: 'relative',
  zIndex: 3,
  textAlign: 'left',
  color: colors.neutral[900],
  maxWidth: '800px',
  padding: `0 ${spacing.lg}`,
  marginLeft: '5%', // Add left margin to move content from edge
  marginRight: '5%', // Add right margin to prevent overlap with right button
  '@media': {
    'screen and (max-width: 1200px)': {
      maxWidth: '700px',
      marginLeft: '8%', // Increase margins on medium screens
      marginRight: '0',
    },
    'screen and (max-width: 960px)': {
      maxWidth: '600px',
      marginLeft: '1.5rem', // Small margins on mobile
      marginRight: '1.5rem',
      textAlign: 'left',
      padding: '0',
    },
    'screen and (max-width: 768px)': {
      maxWidth: '80%',
      marginLeft: '1.5rem', // Small margins on mobile
      marginRight: '1.5rem',
      textAlign: 'left',
      padding: '0',
    },
    'screen and (max-width: 480px)': {
      maxWidth: '320px',
      marginLeft: '1.5rem', // Small margins on mobile
      marginRight: '1.5rem',
      textAlign: 'left',
      padding: '0',
    },
  },
});

// Custom width variant for slides that need narrower content
export const heroSliderTextContentNarrow = style({
  maxWidth: '30% !important',
  '@media': {
    'screen and (max-width: 1200px)': {
      maxWidth: '32% !important',
    },
    'screen and (max-width: 960px)': {
      maxWidth: '32% !important',
    },
    'screen and (max-width: 768px)': {
      maxWidth: '100% !important', // Full width on mobile
      padding: `${spacing.lg} ${spacing.md} 0 !important`,
      marginLeft: '0 !important',
      marginRight: '0 !important',
    },
    'screen and (max-width: 480px)': {
      maxWidth: '100% !important', // Full width on small mobile
      padding: `${spacing.md} ${spacing.sm} 0 !important`,
      marginLeft: '0 !important',
      marginRight: '0 !important',
    },
  },
});

// Mobile center alignment for narrow content (handled via inline styles)
export const heroSliderTextContentNarrowMobile = style({});

// Split layout text content: takes 50% width on desktop
export const heroSliderTextContentSplit = style({
  width: '50%',
  maxWidth: 'none !important',
  padding: `${spacing['2xl']} ${spacing.xl}`,
  marginLeft: '3%',
  marginRight: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 1200px)': {
      padding: `${spacing.xl} ${spacing.lg}`,
      marginLeft: '2%',
    },
    'screen and (max-width: 1024px)': {
      width: '55%',
      padding: `${spacing.lg} ${spacing.md}`,
      marginLeft: '2%',
    },
    'screen and (max-width: 767px)': {
      width: '100%',
      padding: `0 ${spacing.lg}`,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    'screen and (max-width: 480px)': {
      padding: `0 ${spacing.md}`,
    },
  },
});

// Gradient layout text content: centered with max width
export const heroSliderTextContentGradient = style({
  textAlign: 'center',
  color: colors.white,
  maxWidth: '800px',
  margin: '0 auto',
  padding: `${spacing['2xl']} ${spacing.xl}`,
  '@media': {
    'screen and (max-width: 1200px)': {
      maxWidth: '700px',
      padding: `${spacing.xl} ${spacing.lg}`,
    },
    'screen and (max-width: 767px)': {
      maxWidth: '90%',
      padding: `${spacing.lg} ${spacing.md}`,
    },
    'screen and (max-width: 480px)': {
      maxWidth: '95%',
      padding: `${spacing.md} ${spacing.sm}`,
    },
  },
});

export const heroSliderTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.lg,
  whiteSpace: 'pre-line', // This allows \n characters to create line breaks
  '@media': {
    // Large tablets / small desktops
    'screen and (max-width: 1200px)': {
      fontSize: '2rem',
      lineHeight: '1.2',
      marginBottom: spacing.md,
    },
    // Tablet devices
    'screen and (max-width: 1024px)': {
      fontSize: '1.75rem',
      lineHeight: '1.2',
      marginBottom: spacing.sm,
    },
    // Mobile devices
    'screen and (max-width: 767px)': {
      fontSize: '1.25rem',
      lineHeight: '24px',
      marginBottom: '20px',
      whiteSpace: 'normal', // Allow text to wrap naturally on mobile
      textAlign: 'center',
    },    
    
  },
});

export const heroSliderDescription = style({
  fontSize: typography.fontSize.lg,
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.lg,
  opacity: 0.9,
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: typography.fontSize.base,
      marginBottom: spacing.md,
    },
    'screen and (max-width: 1024px)': {
      fontSize: typography.fontSize.sm,
      marginBottom: spacing.sm,
    },
    'screen and (max-width: 767px)': {
      display: 'none', // Hide description on mobile
    },
  },
});

// Show description on mobile for gradient layouts
export const heroSliderDescriptionVisible = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      fontSize: typography.fontSize.base,
      marginBottom: spacing.lg,
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.sm,
      marginBottom: spacing.md,
    },
  },
});

// Global styles for links and paragraphs in description
globalStyle(`${heroSliderDescription} a`, {
  color: `${colors.primary[600]} !important`,
  textDecoration: 'none !important',
  fontWeight: `${typography.fontWeight.bold} !important`,
  transition: 'all 0.2s ease',
});

globalStyle(`${heroSliderDescription} a:hover`, {
  color: `${colors.primary[700]} !important`,
});

globalStyle(`${heroSliderDescription} p`, {
  margin: 0,
});

export const heroSliderButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.md} ${spacing.xl}`,
  backgroundColor: colors.primary[600],
  color: colors.white,
  textDecoration: 'none',
  borderRadius: radius.lg,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.body,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: shadows.lg,
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: shadows.xl,
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.sm} ${spacing.lg}`,
    },
    'screen and (max-width: 767px)': {
      fontSize: typography.fontSize.sm,
      padding: `${spacing.sm} ${spacing.md}`,
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.sm,
      padding: `${spacing.xs} ${spacing.sm}`,
      gap: spacing.xs,
    },
  },
});

export const heroSliderSecondaryButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.md} ${spacing.xl}`,
  backgroundColor: 'transparent',
  color: colors.primary[600],
  textDecoration: 'none',
  borderRadius: radius.lg,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.body,
  border: `2px solid ${colors.primary[600]}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[700],
    color: colors.primary[700],
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.sm} ${spacing.md}`,
    },
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.xs,
      padding: `${spacing.xs} ${spacing.sm}`,
      gap: spacing.xs,
    },
  },
});

export const heroSliderButtonContainer = style({
  display: 'flex',
  gap: spacing.lg,
  alignItems: 'center',
  justifyContent: 'flex-start',
  '@media': {
    'screen and (max-width: 767px)': {
      justifyContent: 'center',
      gap: spacing.sm,
      marginBottom: 0,
    },
    'screen and (max-width: 480px)': {
      gap: spacing.xs,
    },
  },
});

export const heroSliderButtonContainerCentered = style({
  display: 'flex',
  gap: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 767px)': {
      gap: spacing.sm,
      marginBottom: 0,
    },
    'screen and (max-width: 480px)': {
      gap: spacing.xs,
    },
  },
});

export const heroSliderNavigation = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  zIndex: 4,
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0 ${spacing.xl}`,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 1200px)': {
      padding: `0 ${spacing.lg}`,
    },
    'screen and (max-width: 960px)': {
      padding: `0 ${spacing.sm}`,
    },
    'screen and (max-width: 767px)': {
      top: '50%',
      padding: `0 ${spacing.xs}`,
    },
    'screen and (max-width: 480px)': {
      padding: `0 10px`,
    },
  },
});

const navigationButtonBase = style({
  width: '44px',
  height: '44px',
  borderRadius: radius.full,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: colors.neutral[700],
  boxShadow: shadows.md,
  transition: 'all 0.3s ease',
  pointerEvents: 'auto',
  ':active': {
    transform: 'translateY(-50%) scale(0.95)',
  },
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: colors.white,
        color: colors.primary[600],
        transform: 'translateY(-50%) scale(1.05)',
        boxShadow: shadows.lg,
      },
    },
    'screen and (max-width: 768px)': {
      width: '40px',
      height: '40px',
    },
    'screen and (max-width: 480px)': {
      width: '36px',
      height: '36px',
    },
  },
});

export const heroSliderPrevButton = style([
  navigationButtonBase,
  {
    transform: 'translateY(-50%)',
  },
]);

export const heroSliderNextButton = style([
  navigationButtonBase,
  {
    transform: 'translateY(-50%)',
  },
]);

export const heroSliderIndicators = style({
  position: 'absolute',
  bottom: spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 4,
  display: 'flex',
  gap: spacing.sm,
  '@media': {
    // Hide indicators on tablets and below
    'screen and (max-width: 1024px)': {
      display: 'none', // Hide on tablets
    },
    'screen and (max-width: 768px)': {
      display: 'none', // Hide on mobile
    },
    'screen and (max-width: 480px)': {
      display: 'none', // Hide on small mobile
    },
  },
});

export const heroSliderIndicator = style({
  width: '12px',
  height: '12px',
  borderRadius: radius.full,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.2)',
  },
});

export const heroSliderIndicatorActive = style({
  backgroundColor: colors.white,
  transform: 'scale(1.2)',
});

export const heroSliderEventInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  marginBottom: spacing.lg,
});

// Event info center alignment handled via inline styles

export const heroSliderEventItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.lg,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[900], // Changed to black for better contrast
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: typography.fontSize.base,
    },
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      gap: spacing.xs,
    },
  },
});

export const heroSliderEventIcon = style({
  flexShrink: 0,
  color: colors.primary[600],
});

// Split layout - Right side image wrapper (50% width on desktop)
export const heroSliderSplitImageWrapper = style({
  position: 'relative',
  width: '45%',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.lg,
  paddingRight: spacing.xl,
  paddingTop: '150px',
  zIndex: 3,
  marginRight: '2%',
  '@media': {
    'screen and (max-width: 1200px)': {
      width: '45%',
      padding: spacing.md,
      paddingRight: spacing.lg,
      marginRight: '0%',
    },
    'screen and (max-width: 1024px)': {
      width: '43%',
      padding: spacing.sm,
      paddingRight: spacing.md,
    },
    'screen and (max-width: 767px)': {
      width: '100%',
      height: '220px',
      minHeight: '220px',
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    'screen and (max-width: 480px)': {
      height: '180px',
      minHeight: '180px',
      padding: 0,
    },
  },
});

export const heroSliderSplitImage = style({
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: radius.xl,
  '@media': {
    'screen and (max-width: 1024px)': {
      maxHeight: '320px',
      borderRadius: radius.lg,
    },
    'screen and (max-width: 767px)': {
      maxWidth: '60%',
      maxHeight: '180px',
      borderRadius: radius.lg,
    },
    'screen and (max-width: 480px)': {
      maxWidth: '80%',
      maxHeight: '140px',
      borderRadius: radius.md,
    },
  },
});

// Gradient overlay for gradient layout mode
export const heroSliderGradientOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

// Full background image wrapper
export const heroSliderBackgroundWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});
