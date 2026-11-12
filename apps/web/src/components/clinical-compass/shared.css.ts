import { style } from '@vanilla-extract/css';

import { colors, radius, spacing, typography } from '../../styles/tokens.css';

// Breakpoints used across The Clinical Compass page.
export const BREAKPOINTS = {
  // The section container narrows from 1400px to 1000px.
  narrowContainer: 'screen and (max-width: 1480px)',
  // Two-column layouts stack.
  stacked: 'screen and (max-width: 968px)',
  mobile: 'screen and (max-width: 767px)',
  phone: 'screen and (max-width: 480px)',
} as const;

export const sectionContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const tintedSection = style({
  padding: `${spacing.xl} 0`,
  background: `linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.primary[50]} 50%, ${colors.neutral[50]} 100%)`,
  '@media': {
    'screen and (max-width: 767px)': {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
  color: colors.neutral[900],
  textAlign: 'center',
  textWrap: 'balance',
  position: 'relative',
  marginBottom: spacing.xl,
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: colors.primary[600],
    borderRadius: radius.full,
  },
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.lg,
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const ctaButton = style({
  display: 'inline-block',
  padding: '16px 32px',
  backgroundColor: '#7a7eed',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px -1px rgba(122, 126, 237, 0.4)',
  ':hover': {
    backgroundColor: '#6c6ee5',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px -3px rgba(122, 126, 237, 0.4)',
  },
});
