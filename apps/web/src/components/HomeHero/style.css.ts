import { style } from '@vanilla-extract/css';

// Box model mirrors the original develop home hero (HeroImageSlider's
// heroSliderSection) so the section height matches exactly. Content is
// vertically centered; the fixed transparent nav overlays the top of the
// banner, same as the original slider.
export const heroSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  minHeight: '600px',
  maxHeight: '800px',
  overflow: 'hidden',
  marginTop: '24px', // Account for fixed header (contact info + nav)
  boxSizing: 'border-box',
  // Offset the centered content below the fixed transparent nav so the gap above
  // the title matches the gap below the supporting text (keeps height via border-box).
  paddingTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 1024px)': {
      height: '70vh',
      minHeight: '550px',
      maxHeight: '700px',
      paddingTop: '40px',
    },
    // On phones the stacked content (3-line title + subtitle + two buttons +
    // supporting text) is taller than a fixed vh, so let the section grow with
    // its content and use top padding to clear the fixed nav.
    'screen and (max-width: 767px)': {
      height: 'auto',
      minHeight: 'auto',
      maxHeight: 'none',
      overflow: 'visible',
      marginTop: '0',
      paddingTop: '150px',
      paddingBottom: '40px',
    },
    'screen and (max-width: 480px)': {
      paddingTop: '160px',
    },
  },
});

export const heroContainer = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 10,
});

export const heroContent = style({
  textAlign: 'center',
  position: 'relative',
  zIndex: 15,
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
    'linear-gradient(to bottom right, rgba(250, 250, 250, 0.35), rgba(255, 255, 255, 0.35))',
});

export const heroTitle = style({
  fontSize: '30px',
  fontWeight: '800',
  color: '#111827',
  marginBottom: '24px',
  lineHeight: 1.15,
  margin: '0 auto 24px',
  '@media': {
    'screen and (min-width: 480px)': { fontSize: '38px' },
    'screen and (min-width: 768px)': {
      fontSize: '60px',
      lineHeight: 1.25,
      marginBottom: '32px',
    },
  },
});

export const heroSubtitle = style({
  fontSize: '16px',
  color: '#6b7280',
  marginBottom: '32px',
  lineHeight: 1.6,
  maxWidth: '865px',
  margin: '0 auto 32px',
  '@media': {
    'screen and (min-width: 768px)': { fontSize: '22px', marginBottom: '48px' },
  },
});

export const buttonContainer = style({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '32px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 640px)': { flexDirection: 'column', gap: '12px' },
  },
});

export const primaryButton = style({
  padding: '16px 32px',
  backgroundColor: '#7a7eed',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px -1px rgba(122, 126, 237, 0.4)',
  ':hover': {
    backgroundColor: '#6c6ee5',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px -3px rgba(122, 126, 237, 0.4)',
  },
});

// Same dimensions/typography as primaryButton, but white background for use on
// dark/colored sections (e.g. the "Ready to scale" banner).
export const primaryButtonLight = style([
  primaryButton,
  {
    backgroundColor: '#ffffff',
    color: '#111827',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
    ':hover': {
      backgroundColor: '#f5f5f7',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.2)',
    },
  },
]);

export const secondaryButton = style({
  padding: '16px 24px',
  backgroundColor: 'transparent',
  color: '#6b7280',
  border: '1px solid #d1d5db',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#7a7eed',
    color: '#7a7eed',
  },
});

export const playIcon = style({ color: 'inherit' });

export const supportingText = style({
  fontSize: '16px',
  color: '#6b7280',
  maxWidth: '650px',
  margin: '0 auto',
  lineHeight: 1.6,
  '@media': { 'screen and (min-width: 768px)': { fontSize: '18px' } },
});
