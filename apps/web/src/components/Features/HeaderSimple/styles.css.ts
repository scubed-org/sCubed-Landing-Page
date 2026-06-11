import { style } from '@vanilla-extract/css';

export const headerWrapperStyles = style({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1001,
  borderBottom: '1px solid transparent',
  transition: 'all 0.3s ease',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)',
  maxWidth: '100vw',
  overflowX: 'hidden',
  boxSizing: 'border-box',
});

export const pageStyles = style({
  position: 'relative',
  width: '100%',
});
