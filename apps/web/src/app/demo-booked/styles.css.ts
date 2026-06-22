import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../styles/tokens.css';

export const wrapper = style({
  maxWidth: '720px',
  margin: '0 auto',
  padding: `${spacing['3xl']} ${spacing.md}`,
  textAlign: 'center',
});

export const heading = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginTop: '0px',
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const lead = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.sm,
  fontFamily: typography.fontFamily.body,
});

export const subtext = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
});