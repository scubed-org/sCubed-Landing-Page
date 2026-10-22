import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../styles/tokens.css';

export const badgesRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 968px)': {
      justifyContent: 'center',
    },
  },
});

export const badgeLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  height: '48px',
  padding: '0 16px',
  boxSizing: 'border-box',
  backgroundColor: colors.black,
  color: '#ffffff',
  border: '1px solid #a6a6a6',
  borderRadius: '8px',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      height: '44px',
      padding: '0 14px',
    },
  },
});

export const badgeIcon = style({
  width: '24px',
  height: '24px',
  flexShrink: 0,
});

export const badgeText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: 1.1,
  textAlign: 'left',
});

export const badgeCaption = style({
  fontSize: '10px',
  letterSpacing: '0.02em',
});

export const badgeStore = style({
  fontSize: '18px',
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: '-0.01em',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '16px',
    },
  },
});

// Compact size (e.g. footer); defined last so it overrides the base styles
export const badgeLinkSmall = style({
  height: '40px',
  padding: '0 12px',
  gap: '8px',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '40px',
      padding: '0 12px',
    },
  },
});

export const badgeIconSmall = style({
  width: '20px',
  height: '20px',
});

export const badgeStoreSmall = style({
  fontSize: '15px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '15px',
    },
  },
});
