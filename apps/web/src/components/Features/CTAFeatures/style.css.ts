import { style } from '@vanilla-extract/css';

export const ctaSection = style({
  padding: '0 0 80px 0', // Removed top padding for seamless flow from FeaturesComprehensive
  backgroundColor: '#ffffff',
});

export const ctaContainer = style({
  maxWidth: '1280px', // Changed from 1200px to match FeaturesComprehensive
  margin: '0 auto',
  padding: '0 20px', // Changed from 16px to match FeaturesComprehensive
});

export const ctaContent = style({
  textAlign: 'center',
  margin: '0 auto',
  padding: '40px 40px', // Further reduced from 60px to 40px
  background: 'linear-gradient(135deg, #f8f9ff 0%, #e8e6ff 100%)',
  borderRadius: '32px',
  boxShadow: '0 20px 40px rgba(122, 126, 237, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  ':before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-25%',
    width: '600px',
    height: '600px',
    background:
      'radial-gradient(circle, rgba(122, 126, 237, 0.05) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: '50px 60px', // Further reduced from 80px to 50px
    },
  },
});

export const ctaTitle = style({
  fontSize: '36px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '24px',
  lineHeight: 1.3,
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  '@media': { 'screen and (min-width: 768px)': { fontSize: '48px' } },
});

export const ctaSubtitle = style({
  fontSize: '20px',
  color: '#374151',
  marginBottom: '20px',
  lineHeight: 1.6,
  position: 'relative',
  zIndex: 1,
});

export const ctaDescription = style({
  fontSize: '18px',
  color: '#6b7280',
  lineHeight: 1.6,
  marginBottom: '16px',
  position: 'relative',
  zIndex: 1,
});

export const ctaActions = style({
  marginTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
});
