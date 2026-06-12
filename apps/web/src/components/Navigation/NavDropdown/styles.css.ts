import { style } from '@vanilla-extract/css';

export const dropdownContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const dropdownTrigger = style({
  fontSize: '16px',
  color: '#474747',
  fontWeight: '400',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#7a7eed',
  },
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: '14px',
    },
  },
  
});

export const dropdownTriggerActive = style({
  color: '#000',
  fontWeight: '500',
});

export const chevronIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease',
});

export const dropdownMenu = style({
  position: 'absolute',
  top: 'calc(100% + 15px)',
  left: '0',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '8px 0',
  minWidth: '220px',
  zIndex: 1000,
  border: '1px solid #ededef',
});

export const dropdownMenuItem = style({
  display: 'block',
  padding: '12px 20px',
  fontSize: '16px',
  color: '#474747',
  fontWeight: '400',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  borderLeft: '3px solid transparent',
  ':hover': {
    backgroundColor: 'rgba(122, 126, 237, 0.08)',
    color: '#7a7eed',
    paddingLeft: '24px',
    borderLeftColor: '#7a7eed',
    fontWeight: '600',
  },
});

export const activeLinkUnderline = style({
  content: '""',
  display: 'block',
  width: '100%',
  height: '5px',
  backgroundColor: '#7a7eed',
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
});