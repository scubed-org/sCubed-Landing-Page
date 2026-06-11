import { style } from '@vanilla-extract/css';

export const heroSection = style({
  padding: '40px 0 60px 0',
  marginTop: '-92px', // -45px header - 47px underline position
  paddingTop: '132px', // 40px original + 92px for header and underline
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (min-width: 768px)': {
      padding: '50px 0 80px 0',
      paddingTop: '142px', // 50px original + 92px for header and underline
    },
    'screen and (max-width: 820px)': {
      marginTop: '-117px', // -70px header - 47px underline
      paddingTop: '157px', // 40px original + 117px for header and underline
    },
    'screen and (max-width: 800px)': {
      marginTop: '-147px', // -100px header - 47px underline
      paddingTop: '187px', // 40px original + 147px for header and underline
    },
    'screen and (max-width: 767px)': {
      marginTop: '-228px', // -220px header - 8px underline (mobile)
      paddingTop: '268px', // 40px original + 228px for header and underline
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
  marginBottom: '80px',
  position: 'relative',
  zIndex: 15,
  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: '100px',
    },
  },
});

export const heroBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '12px 28px',
  backgroundColor: 'rgba(122, 126, 237, 0.15)',
  color: '#7a7eed',
  borderRadius: '9999px',
  fontSize: '1.1rem',
  fontWeight: '600',
  marginBottom: '32px',
  border: '2px solid rgba(122, 126, 237, 0.3)',
  position: 'relative',
  zIndex: 20,
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(122, 126, 237, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px -3px rgba(122, 126, 237, 0.2)',
  },
});

export const heroBadgeDot = style({ display: 'none' });

export const heroTitle = style({
  fontSize: '48px',
  fontWeight: '800',
  color: '#111827',
  marginBottom: '32px',
  lineHeight: 1.1,
  margin: '0 auto 32px',
  '@media': { 'screen and (min-width: 768px)': { fontSize: '64px' } },
});

export const heroSubtitle = style({
  fontSize: '20px',
  color: '#6b7280',
  marginBottom: '48px',
  lineHeight: 1.6,
  maxWidth: '865px',
  margin: '0 auto 48px',
  '@media': { 'screen and (min-width: 768px)': { fontSize: '22px' } },
});

export const buttonContainer = style({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '48px',
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

export const trustBadges = style({
  display: 'flex',
  gap: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': { 'screen and (max-width: 768px)': { gap: '16px' } },
});

export const trustBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },
});

export const trustBadgeLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  ':hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
    borderColor: '#7a7eed',
  },
});

export const trustIcon = style({ color: '#10b981' });

export const trustText = style({
  fontSize: '1rem',
  fontWeight: '500',
  color: '#374151',
});

export const featureCards = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
    },
  },
});

export const featureCard = style({
  backgroundColor: '#ffffff',
  padding: '40px 32px',
  borderRadius: '20px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  ':hover': {
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-4px)',
  },
});

export const featureIcon = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
});

export const featureTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '16px',
  lineHeight: 1.3,
});

export const featureDescription = style({
  fontSize: '16px',
  color: '#6b7280',
  lineHeight: 1.6,
});

export const heroDescription = style({
  fontSize: '18px',
  color: '#6b7280',
  maxWidth: '700px',
  margin: '0 auto',
  lineHeight: 1.6,
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
    'linear-gradient(to bottom right, rgba(250, 250, 250, 0.9), rgba(255, 255, 255, 0.9))',
});

export const featureCardsWrapper = style({
  marginTop: '80px',
  '@media': { 'screen and (min-width: 768px)': { marginTop: '100px' } },
});

export const floatingElement1 = style({
  position: 'absolute',
  top: '-24px',
  right: '-24px',
  width: '80px',
  height: '80px',
  backgroundColor: '#7a7eed',
  borderRadius: '16px',
  opacity: 0.2,
  transform: 'rotate(12deg)',
});

export const floatingElement2 = style({
  position: 'absolute',
  top: '-24px',
  left: '-8px',
  width: '64px',
  height: '64px',
  backgroundColor: '#9f7aea',
  borderRadius: '12px',
  opacity: 0.3,
  transform: 'rotate(-12deg)',
});
