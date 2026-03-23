import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const tooltipWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  verticalAlign: 'middle',
  marginLeft: '4px',
});

export const tooltipIcon = style({
  cursor: 'help',
  color: '#9ca3af',
  transition: 'color 0.2s ease',
  '@media': {
    '(hover: hover)': {
      ':hover': {
        color: '#6b7280',
      },
    },
  },
});

export const tooltipContent = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: '8px',
  padding: '12px 16px',
  backgroundColor: '#1f2937',
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.5',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  whiteSpace: 'normal',
  maxWidth: '280px',
  width: 'max-content',
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease`,
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '250px',
      width: '250px',
      fontSize: '0.8125rem',
      padding: '10px 14px',
    },
  },
});

// Arrow pointing down (tooltip is above the icon)
export const tooltipArrow = style({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '6px solid #1f2937',
});

// Arrow pointing up (tooltip is below the icon)
export const tooltipArrowAbove = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderBottom: '6px solid #1f2937',
});
