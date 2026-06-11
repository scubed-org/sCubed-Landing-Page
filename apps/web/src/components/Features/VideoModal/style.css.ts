import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const slideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '80px 20px 20px',
  animation: `${fadeIn} 0.3s ease-out`,
});

export const modalWrapper = style({
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  animation: `${slideUp} 0.3s ease-out`,
});

export const modalContent = style({
  position: 'relative',
  width: '100%',
  maxHeight: '90vh',
  backgroundColor: '#000',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  isolation: 'isolate',
});

export const closeButton = style({
  position: 'absolute',
  top: '-60px',
  right: '0',
  width: '48px',
  height: '48px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  zIndex: 10,
  backdropFilter: 'blur(10px)',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '40px',
      height: '40px',
      top: '-50px',
      right: '0',
    },
  },
});

export const videoContainer = style({
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
});

export const videoFrame = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
});
``