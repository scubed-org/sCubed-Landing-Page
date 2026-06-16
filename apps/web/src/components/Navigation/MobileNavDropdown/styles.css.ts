import { style } from '@vanilla-extract/css';

export const mobileDropdownContainer = style({
  display: 'none',
  '@media': {
    // Show the collapsible mobile dropdown wherever the hamburger menu is used
    // (tablet and below) — matches the nav's 1100px breakpoint.
    'screen and (max-width: 1100px)': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
});

export const mobileDropdownTrigger = style({
  fontSize: '18px',
  color: '#474747',
  fontWeight: '400',
  padding: '12px 30px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  ':hover': {
    color: '#7a7eed',
    backgroundColor: 'rgba(122, 126, 237, 0.05)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '16px',
      padding: '10px 25px',
    },
    'screen and (max-height: 700px)': {
      padding: '8px 20px',
      fontSize: '15px',
    },
  },
});

export const mobileActiveStyle = style({
  backgroundColor: 'rgba(122, 126, 237, 0.08)',
  color: '#7a7eed',
  fontWeight: '600',
});

export const mobileChevronIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const mobileDropdownContent = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: 'rgba(122, 126, 237, 0.02)',
  borderRadius: '8px',
  marginTop: '4px',
});

export const mobileDropdownItem = style({
  fontSize: '16px',
  color: '#474747',
  fontWeight: '400',
  padding: '10px 30px',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  borderRadius: '6px',
  borderLeft: '3px solid transparent',
  ':hover': {
    backgroundColor: 'rgba(122, 126, 237, 0.08)',
    color: '#7a7eed',
    borderLeftColor: '#7a7eed',
    fontWeight: '600',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '15px',
      padding: '8px 25px',
    },
    'screen and (max-height: 700px)': {
      padding: '6px 20px',
      fontSize: '14px',
    },
  },
});