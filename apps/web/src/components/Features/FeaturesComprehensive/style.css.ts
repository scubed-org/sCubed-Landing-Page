import { style } from '@vanilla-extract/css';

import { typography } from '@/styles/tokens.css';

// Main section styles
export const featuresSection = style({
  position: 'relative',
  padding: '40px 0 60px 0',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  '@media': { 'screen and (min-width: 768px)': { padding: '60px 0 80px 0' } },
});

export const sectionBackground = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(122, 126, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
  `,
  pointerEvents: 'none',
  zIndex: 0,
});

export const featuresContainer = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 1,
});

export const sectionHeader = style({
  maxWidth: '90%',
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: '64px',
});

export const sectionTitle = style({
  fontSize: '36px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '16px',
  lineHeight: 1.2,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1024px)': {
      fontSize: '40px',
    },
    'screen and (min-width: 1025px)': {
      fontSize: '48px',
    },
  },
});

export const sectionDescription = style({
  fontSize: '20px',
  color: '#6b7280',
  lineHeight: 1.6,
  fontFamily: typography.fontFamily.body,
});

// Core Features Grid
export const coreFeatures = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  marginBottom: '100px',
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '28px',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '32px',
    },
  },
});

export const coreFeatureCard = style({
  backgroundColor: '#ffffff',
  padding: '36px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(229, 231, 235, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  animation: 'fadeInUp 0.6s ease-out both',
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  ':hover': {
    boxShadow: '0 12px 40px rgba(122, 126, 237, 0.12)',
    transform: 'translateY(-6px)',
    borderColor: 'rgba(122, 126, 237, 0.2)',
  },
});

export const coreFeatureIcon = style({
  width: '56px',
  height: '56px',
  backgroundColor: 'rgba(122, 126, 237, 0.1)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  transition: 'all 0.3s ease',
  color: '#7a7eed',
  selectors: {
    [`${coreFeatureCard}:hover &`]: {
      backgroundColor: 'rgba(122, 126, 237, 0.15)',
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
});

export const coreFeatureTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '12px',
  lineHeight: 1.3,
  fontFamily: typography.fontFamily.heading,
});

export const coreFeatureDescription = style({
  fontSize: '15px',
  color: '#6b7280',
  lineHeight: 1.6,
  fontFamily: typography.fontFamily.body,
});

// Additional Features Section
export const moreFeaturesTitle = style({
  fontSize: '36px',
  fontWeight: '700',
  color: '#111827',
  textAlign: 'center',
  marginBottom: '16px',
  lineHeight: 1.2,
  fontFamily: typography.fontFamily.heading,
  '@media': { 'screen and (min-width: 768px)': { fontSize: '48px' } },
});

export const moreFeaturesSubtitle = style({
  fontSize: '18px',
  color: '#6b7280',
  textAlign: 'center',
  marginBottom: '60px',
  maxWidth: '600px',
  margin: '0 auto 60px',
  fontFamily: typography.fontFamily.body,
});

export const additionalFeaturesList = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '40px',
  marginBottom: '24px',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '36px',
    },
    'screen and (min-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
    },
  },
});

export const additionalFeatureCard = style({
  backgroundColor: '#ffffff',
  padding: '36px',
  borderRadius: '24px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(229, 231, 235, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
  position: 'relative',
  overflow: 'hidden',
  ':hover': {
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px) scale(1.02)',
    borderColor: 'rgba(122, 126, 237, 0.15)',
  },
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #7a7eed 50%, #10b981 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  selectors: {
    '&:hover:before': { opacity: 1 },
  },
});

export const additionalFeatureCategory = style({
  fontSize: '22px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '28px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontFamily: typography.fontFamily.heading,
});

export const additionalFeatureIcon = style({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  flexShrink: 0,
  transition: 'all 0.3s ease',
  selectors: {
    [`${additionalFeatureCard}:hover &`]: {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
});

export const additionalFeatureItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: 1.6,
  marginBottom: '16px',
  fontFamily: typography.fontFamily.body,
  transition: 'all 0.2s ease',
  padding: '8px 0',
  borderRadius: '8px',
  ':hover': {
    paddingLeft: '8px',
    backgroundColor: 'rgba(122, 126, 237, 0.04)',
  },
  ':last-child': { marginBottom: 0 },
});

export const featureIcon = style({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: 'rgba(122, 126, 237, 0.08)',
  flexShrink: 0,
  transition: 'all 0.2s ease',
  selectors: {
    [`${additionalFeatureItem}:hover &`]: {
      transform: 'scale(1.15)',
      backgroundColor: 'rgba(122, 126, 237, 0.12)',
    },
  },
});

export const expandButton = style({
  marginTop: '24px',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '600',
  fontFamily: typography.fontFamily.body,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  width: '100%',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgba(122, 126, 237, 0.08)',
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const expandedContent = style({
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(229, 231, 235, 0.5)',
});

// CTA Section
export const ctaSection = style({
  marginTop: '20px',
  textAlign: 'center',
});

export const ctaButton = style({
  padding: '18px 48px',
  fontSize: '18px',
  fontWeight: '700',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #7a7eed 0%, #6c6ee5 100%)',
  border: 'none',
  borderRadius: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 6px 24px rgba(122, 126, 237, 0.35)',
  fontFamily: typography.fontFamily.body,
  letterSpacing: '0.02em',
  ':hover': {
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 12px 32px rgba(122, 126, 237, 0.45)',
    background: 'linear-gradient(135deg, #6c6ee5 0%, #5a5cc9 100%)',
  },
  ':active': {
    transform: 'translateY(-1px)',
  },
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '16px 36px',
      fontSize: '16px',
    },
  },
});

// Animations
// const fadeInUp = keyframes({
//   from: {
//     opacity: 0,
//     transform: 'translateY(30px)',
//   },
//   to: {
//     opacity: 1,
//     transform: 'translateY(0)',
//   },
// });
