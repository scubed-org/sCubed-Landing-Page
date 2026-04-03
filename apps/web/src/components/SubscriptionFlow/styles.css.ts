import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '@/styles/tokens.css';

// ============================================================================
// ANIMATIONS
// ============================================================================

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const fadeInUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const scaleIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.9)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const shake = keyframes({
  '0%, 100%': { transform: 'translateX(0)' },
  '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
  '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
  '50%': { opacity: 0.8, transform: 'scale(1.05)' },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const drawCheckmark = keyframes({
  '0%': { strokeDashoffset: 100 },
  '100%': { strokeDashoffset: 0 },
});

const slideInRight = keyframes({
  '0%': { opacity: 0, transform: 'translateX(20px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideInLeft = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-20px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const bounceIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.3)' },
  '50%': { opacity: 1, transform: 'scale(1.05)' },
  '70%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1)' },
});

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// ============================================================================
// DESIGN SYSTEM - GRADIENTS
// ============================================================================

export const gradients = {
  primary: 'linear-gradient(135deg, #7C52FF 0%, #9370FF 100%)',
  primaryHover: 'linear-gradient(135deg, #6B42EF 0%, #8260EF 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  info: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  subtle: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
};

// ============================================================================
// DESIGN SYSTEM - ENHANCED SHADOWS
// ============================================================================

export const enhancedShadows = {
  layered: '0 2px 4px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.1)',
  elevated: '0 4px 6px rgba(0,0,0,0.07), 0 12px 24px rgba(0,0,0,0.12)',
  purpleGlow:
    '0 0 0 3px rgba(124, 82, 255, 0.1), 0 10px 30px -10px rgba(124, 82, 255, 0.4)',
  greenGlow:
    '0 0 0 3px rgba(16, 185, 129, 0.1), 0 10px 30px -10px rgba(16, 185, 129, 0.4)',
  blueGlow:
    '0 0 0 3px rgba(59, 130, 246, 0.1), 0 10px 30px -10px rgba(59, 130, 246, 0.4)',
};

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const pageWrapper = style({
  fontFamily: typography.fontFamily.body,
  minHeight: 'calc(100vh - 200px)',
  backgroundColor: '#f9fafb',
  padding: `${spacing.lg} ${spacing.md}`,
  animation: `${fadeIn} 0.6s ease-out`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.md} ${spacing.md}`,
    },
  },
});

export const containerWrapper = style({
  backgroundColor: '#f9fafb',
  padding: `${spacing.lg} 0`,
  animation: `${fadeIn} 0.6s ease-out`,
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  background: 'linear-gradient(135deg, #ffffff 0%, #fdfbff 50%, #f9f7ff 100%)',
  borderRadius: '20px',
  boxShadow: enhancedShadows.elevated,
  padding: `${spacing.xl} ${spacing.xl}`,
  position: 'relative',
  zIndex: 1,
  border: '1px solid rgba(124, 82, 255, 0.15)',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    backgroundImage:
      'radial-gradient(circle at 10% 20%, rgba(124, 82, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(124, 82, 255, 0.06) 0%, transparent 40%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    inset: '-1px',
    borderRadius: '20px',
    padding: '1px',
    background:
      'linear-gradient(135deg, rgba(124, 82, 255, 0.2) 0%, transparent 50%, rgba(124, 82, 255, 0.1) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: -1,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
      borderRadius: radius.lg,
      '::before': {
        borderRadius: radius.lg,
      },
      '::after': {
        borderRadius: radius.lg,
      },
    },
  },
});

export const stepContent = style({
  marginTop: spacing.lg,
  position: 'relative',
  zIndex: 1,
});

// ============================================================================
// STEP INDICATOR
// ============================================================================

export const stepIndicatorWrapper = style({
  width: '100%',
  padding: `0`,
  marginBottom: spacing.md,
  position: 'relative',
  zIndex: 1,
});

export const stepIndicatorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  maxWidth: '600px',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 600px)': {
      maxWidth: '100%',
    },
  },
});

export const stepItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
});

export const stepCircle = style({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  zIndex: 2,
  position: 'relative',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '44px',
      height: '44px',
      fontSize: typography.fontSize.base,
    },
  },
});

export const stepCircleCompleted = style({
  background: gradients.success,
  color: '#ffffff',
  boxShadow: enhancedShadows.greenGlow,
  transform: 'scale(1)',
  '::before': {
    content: '',
    position: 'absolute',
    inset: '-3px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.1) 100%)',
    zIndex: -1,
  },
});

export const stepCircleCurrent = style({
  background: gradients.primary,
  color: '#ffffff',
  boxShadow: enhancedShadows.purpleGlow,
  transform: 'scale(1.1)',
  animation: `${pulse} 2s ease-in-out infinite`,
  '::before': {
    content: '',
    position: 'absolute',
    inset: '-3px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(124, 82, 255, 0.3) 0%, rgba(124, 82, 255, 0.1) 100%)',
    zIndex: -1,
    animation: `${pulse} 2s ease-in-out infinite`,
  },
});

export const stepCircleInactive = style({
  backgroundColor: '#f3f4f6',
  color: '#9ca3af',
  border: '2px solid #e5e7eb',
  transform: 'scale(0.9)',
});

export const stepNumber = style({
  lineHeight: 1,
});

export const stepCheckIcon = style({
  width: '28px',
  height: '28px',
  strokeWidth: 2.5,
  animation: `${drawCheckmark} 0.5s ease-out`,
});

export const stepLabel = style({
  marginTop: spacing.sm,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: typography.fontSize.xs,
    },
  },
});

export const stepLabelCurrent = style({
  color: colors.primary[600],
  transform: 'scale(1.05)',
});

export const stepLabelInactive = style({
  color: '#9ca3af',
  transform: 'scale(0.95)',
});

export const stepConnector = style({
  position: 'absolute',
  top: '30px',
  left: '50%',
  width: '100%',
  height: '4px',
  transform: 'translateY(-50%)',
  transition: 'all 0.5s ease',
  zIndex: 1,
  borderRadius: '2px',
  '@media': {
    'screen and (max-width: 600px)': {
      top: '22px',
      height: '3px',
    },
  },
});

export const stepConnectorCompleted = style({
  background:
    'linear-gradient(90deg, rgba(16, 185, 129, 1) 0%, rgba(124, 82, 255, 1) 100%)',
  boxShadow: '0 1px 3px rgba(16, 185, 129, 0.3)',
});

export const stepConnectorInactive = style({
  backgroundColor: '#e5e7eb',
});

// ============================================================================
// FORM ELEMENTS
// ============================================================================

export const formTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.sm,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const formSubtitle = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  marginBottom: spacing.xl,
  textAlign: 'center',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const formSection = style({
  marginBottom: spacing.lg,
});

export const sectionTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  margin: '0',
  padding: '0',
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '0px',
    },
  },
});

export const formField = style({
  marginBottom: spacing.lg,
});

export const label = style({
  display: 'block',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: '#374151',
  marginBottom: spacing.xs,
});

export const requiredIndicator = style({
  color: '#ef4444',
  marginLeft: '4px',
});

export const input = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  '::placeholder': {
    textOverflow: 'ellipsis',
  },
  ':disabled': {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1rem',
      padding: '10px 14px',
    },
  },
});

export const inputError = style({
  borderColor: '#ef4444',
  ':focus': {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px #ef444420',
  },
});

export const errorMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  color: '#ef4444',
  marginTop: spacing.xs,
});

export const errorIcon = style({
  flexShrink: 0,
});

export const helpText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.xs,
});

export const select = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  cursor: 'pointer',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
});

export const textarea = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  resize: 'vertical',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  ':disabled': {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed',
  },
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.sm,
  cursor: 'pointer',
  userSelect: 'none',
});

export const checkbox = style({
  width: '18px',
  height: '18px',
  marginTop: '2px',
  cursor: 'pointer',
  accentColor: colors.primary[600],
});

export const checkboxText = style({
  fontSize: typography.fontSize.sm,
  color: '#374151',
  lineHeight: 1.5,
});

// ============================================================================
// BUTTONS
// ============================================================================

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: spacing.md,
  borderTop: '1px solid #f3f4f6',
  '@media': {
    'screen and (max-width: 600px)': {
      flexDirection: 'column-reverse',
      gap: spacing.sm,
    },
  },
});

export const button = style({
  padding: '14px 32px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  borderRadius: radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  fontFamily: typography.fontFamily.body,
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
});

export const buttonPrimary = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: shadows.purple,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primary[700],
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 40px -10px rgba(124, 82, 255, 0.5)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      backgroundColor: '#e5e7eb',
      color: '#6b7280',
      boxShadow: 'none',
    },
    '&:disabled:hover': {
      transform: 'none',
      backgroundColor: '#e5e7eb',
      boxShadow: 'none',
    },
  },
});

export const buttonSecondary = style({
  backgroundColor: '#ffffff',
  color: '#374151',
  border: '2px solid #d1d5db',
  selectors: {
    '&:hover': {
      backgroundColor: '#f9fafb',
      borderColor: '#9ca3af',
    },
  },
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderTopColor: '#ffffff',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

// ============================================================================
// SUCCESS/ERROR STATES
// ============================================================================

export const successContainer = style({
  textAlign: 'center',
  padding: `0 ${spacing.xl}`,
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: 0,
    },
    'screen and (max-width: 480px)': {
      padding: 0,
    },
  },
});

export const successIcon = style({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  color: '#ffffff',
  background: gradients.success,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: enhancedShadows.greenGlow,
  animation: `${scaleIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  position: 'relative',
  '::before': {
    content: '',
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
    animation: `${pulse} 2s ease-in-out infinite`,
  },
});

export const successTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.md,
  animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
});

export const successMessage = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  marginBottom: spacing.xl,
  lineHeight: 1.6,
  animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
});

export const alertContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  padding: spacing.lg,
  borderRadius: radius.lg,
  marginBottom: spacing.xl,
  fontSize: typography.fontSize.base,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
  },
});

export const alertText = style({
  width: 'calc(100% - 24px)',
});

export const alertTextCentered = style({
  textAlign: 'center',
});

export const alertWrap = style({
  flexWrap: 'wrap',
});

export const alertContainerCentered = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  padding: spacing.lg,
  borderRadius: radius.lg,
  marginBottom: spacing.md,
  fontSize: typography.fontSize.base,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
    },
    'screen and (max-width: 480px)': {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.sm,
    },
  },
});

globalStyle(`${alertContainerCentered} > svg`, {
  flexShrink: 0,
});

export const alertError = style({
  background:
    'linear-gradient(135deg, rgba(254, 226, 226, 0.9) 0%, rgba(252, 165, 165, 0.4) 100%)',
  color: '#991b1b',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  selectors: {
    '&::before': {
      background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
    },
  },
});

export const alertWarning = style({
  background:
    'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(252, 211, 77, 0.4) 100%)',
  color: '#92400e',
  border: '1px solid rgba(245, 158, 11, 0.3)',
  selectors: {
    '&::before': {
      background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
    },
  },
});

export const alertInfo = style({
  background:
    'linear-gradient(135deg, rgba(219, 234, 254, 0.9) 0%, rgba(191, 219, 254, 0.4) 100%)',
  color: '#1e40af',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  selectors: {
    '&::before': {
      background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
    },
  },
});

export const alertSuccess = style({
  background:
    'linear-gradient(135deg, rgba(209, 250, 229, 0.9) 0%, rgba(110, 231, 183, 0.4) 100%)',
  color: '#065f46',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  selectors: {
    '&::before': {
      background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
    },
  },
});

export const alertIconWrapper = style({
  flexShrink: 0,
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const alertContent = style({
  flex: 1,
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
});

export const alertTitle = style({
  fontWeight: typography.fontWeight.bold,
  fontSize: typography.fontSize.base,
  marginBlock: spacing.xs,
  display: 'block',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  width: '100%',
  '@media': {
    'screen and (max-width: 400px)': {
      fontSize: typography.fontSize.sm,
    },
  },
});

// ============================================================================
// OTP VERIFICATION
// ============================================================================

export const otpContainer = style({
  maxWidth: '500px',
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  '@media': {
    'screen and (max-width: 600px)': {
      maxWidth: '100%',
      padding: '0 8px',
    },
  },
});

export const otpIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  backgroundColor: colors.primary[600],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: shadows.purple,
});

export const otpIcon = style({
  width: '40px',
  height: '40px',
  color: '#ffffff',
});

export const resendContainer = style({
  marginTop: spacing.lg,
  textAlign: 'center',
});

export const resendText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginBottom: spacing.xs,
});

export const resendCooldown = style({
  fontSize: typography.fontSize.sm,
  color: '#9ca3af',
  fontStyle: 'italic',
});

export const resendButton = style({
  background: 'none',
  border: 'none',
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0,
  selectors: {
    '&:hover': {
      color: colors.primary[700],
    },
    '&:disabled': {
      color: '#9ca3af',
      cursor: 'not-allowed',
      textDecoration: 'none',
    },
  },
});

// ============================================================================
// LOADING & ERROR ICONS
// ============================================================================

export const loadingIconWrapper = style({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  animation: `${scaleIn} 0.6s ease-out`,
  '::before': {
    content: '',
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(124, 82, 255, 0.2) 0%, rgba(124, 82, 255, 0.05) 100%)',
    animation: `${pulse} 2s ease-in-out infinite`,
  },
});

export const loadingSpinnerLarge = style({
  display: 'inline-block',
  width: '64px',
  height: '64px',
  border: '5px solid #e5e7eb',
  borderTopColor: colors.primary[600],
  borderRightColor: colors.primary[600],
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const errorIconWrapper = style({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  color: '#ffffff',
  background: gradients.error,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow:
    '0 0 0 3px rgba(239, 68, 68, 0.1), 0 10px 30px -10px rgba(239, 68, 68, 0.4)',
  animation: `${shake} 0.5s ease-in-out, ${scaleIn} 0.6s ease-out`,
});

export const errorIconLarge = style({
  width: '64px',
  height: '64px',
});

export const paymentIconWrapper = style({
  width: '60px',
  height: '60px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  color: '#ffffff',
  background: gradients.info,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow:
    '0 0 0 3px rgba(59, 130, 246, 0.1), 0 10px 30px -10px rgba(59, 130, 246, 0.4)',
  animation: `${scaleIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  position: 'relative',
  '::before': {
    content: '',
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
    animation: `${pulse} 2s ease-in-out infinite`,
  },
});

// ============================================================================
// SUCCESS DETAILS
// ============================================================================

export const successList = style({
  listStyle: 'none',
  paddingLeft: 0,
  paddingRight: spacing.sm,
  marginTop: spacing.md,
  textAlign: 'left',
  lineHeight: 1.8,
  '@media': {
    'screen and (max-width: 480px)': {
      marginTop: spacing.sm,
      lineHeight: 1.6,
      paddingLeft: spacing.xs,
      paddingRight: spacing.xs,
    },
  },
});

export const successListItem = style({
  position: 'relative',
  paddingLeft: spacing.xl,
  marginBottom: spacing.sm,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.normal,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  '::before': {
    content: '"✓"',
    position: 'absolute',
    left: spacing.sm,
    top: 0,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
    color: 'currentColor',
    opacity: 0.8,
  },
  ':last-child': {
    marginBottom: 0,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      paddingLeft: spacing.md,
      '::before': {
        left: 0,
      },
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.sm,
      marginBottom: spacing.xs,
      '::before': {
        left: 0,
        fontSize: typography.fontSize.base,
      },
    },
  },
});

export const successDetails = style({
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  padding: spacing.xl,
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
  border: '2px solid transparent',
  position: 'relative',
  boxShadow: enhancedShadows.layered,
  animation: `${fadeInUp} 0.6s ease-out 0.5s both`,
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  '::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    padding: '2px',
    background:
      'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(124, 82, 255, 0.3) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
      marginLeft: 0,
      marginRight: 0,
    },
    'screen and (max-width: 480px)': {
      padding: spacing.md,
      marginTop: spacing.md,
      marginBottom: spacing.md,
      borderRadius: radius.md,
    },
  },
});

export const successDetailsTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
  textAlign: 'left',
});

export const successDetailsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing.md,
});

export const successDetailsItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: spacing.sm,
  borderBottom: '1px solid #e5e7eb',
  ':last-child': {
    borderBottom: 'none',
  },
  '@media': {
    'screen and (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing.xs,
      paddingBottom: spacing.sm,
    },
  },
});

export const successDetailsLabel = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  fontWeight: typography.fontWeight.semibold,
});

export const successDetailsValue = style({
  fontSize: typography.fontSize.sm,
  color: '#111827',
  fontWeight: typography.fontWeight.normal,
  textAlign: 'right',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  '@media': {
    'screen and (max-width: 480px)': {
      textAlign: 'left',
      fontWeight: typography.fontWeight.medium,
    },
  },
});

// ============================================================================
// CART / CHECKOUT
// ============================================================================

export const cartHeader = style({
  textAlign: 'center',
  marginBottom: spacing.xl,
});

export const cartIcon = style({
  color: colors.primary[600],
  margin: '0 auto',
  marginBottom: spacing.md,
});

export const billingCycleGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const billingCycleOption = style({
  position: 'relative',
  padding: spacing.lg,
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  selectors: {
    '&:hover': {
      borderColor: colors.primary[600],
      boxShadow: enhancedShadows.layered,
      transform: 'translateY(-1px)',
    },
  },
});

export const billingCycleOptionSelected = style({
  borderColor: colors.primary[600],
  backgroundColor: `${colors.primary[600]}10`,
  boxShadow: enhancedShadows.purpleGlow,
  transform: 'scale(1.02)',
});

export const billingCycleRadio = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
});

export const billingCycleContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const billingCycleTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
});

export const billingCyclePrice = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
});

export const billingCyclePriceWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  flexWrap: 'wrap',
});

export const billingCycleOriginalPrice = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  textDecoration: 'line-through',
  fontWeight: typography.fontWeight.normal,
});

export const billingCycleDiscountedPrice = style({
  fontSize: typography.fontSize.base,
  color: '#059669',
  fontWeight: typography.fontWeight.semibold,
});

export const billingCycleSavings = style({
  fontSize: typography.fontSize.sm,
  color: '#ffffff',
  fontWeight: typography.fontWeight.bold,
  backgroundColor: colors.accent.green,
  padding: '4px 10px',
  borderRadius: radius.md,
  display: 'inline-block',
  marginTop: spacing.xs,
  boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
  position: 'absolute',
  right: '10px',
  top: '0',
  zIndex: '100',
});

export const addonsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  gridAutoRows: 'minmax(auto, max-content)',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const addonCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  padding: spacing.md,
  border: '2px solid #e5e7eb',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: 'auto',
  selectors: {
    '&:hover': {
      borderColor: colors.primary[600],
      boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
    },
  },
});

export const addonCardSelected = style({
  borderColor: colors.primary[600],
  backgroundColor: `${colors.primary[600]}08`,
  boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
});

export const addonCheckbox = style({
  width: '24px',
  height: '24px',
  flexShrink: 0,
  border: '2px solid #d1d5db',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  transition: 'all 0.2s ease',
  selectors: {
    [`${addonCardSelected} &`]: {
      backgroundColor: colors.primary[600],
      borderColor: colors.primary[600],
    },
  },
});

export const addonContent = style({
  flex: 1,
});

export const addonTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginTop: '0px',
  marginBottom: '0',
  lineHeight: 1.3,
});

export const addonDescription = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginBottom: spacing.xs,
  lineHeight: 1.4,
});

export const addonPrice = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
});

export const orderSummary = style({
  backgroundColor: '#f9fafb',
  borderRadius: radius.md,
  padding: spacing.lg,
  marginTop: spacing.xl,
  marginBottom: spacing.lg,
});

export const orderSummaryTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
});

export const orderSummaryItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  marginBottom: spacing.sm,
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 480px)': {
      flexWrap: 'wrap',
    },
  },
});

export const orderSummaryDivider = style({
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: `${spacing.md} 0`,
});

export const orderSummaryTotal = style({
  alignItems: 'center',
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const savingsText = style({
  fontSize: typography.fontSize.sm,
  color: colors.accent.green,
  fontWeight: typography.fontWeight.semibold,
  marginLeft: spacing.xs,
});

export const loadingMessage = style({
  textAlign: 'center',
  color: '#6b7280',
  padding: spacing.lg,
  fontSize: typography.fontSize.base,
});

// ============================================================================
// CART REDESIGN - TWO COLUMN LAYOUT
// ============================================================================

export const cartGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: spacing.lg,
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 1200px)': {
      gridTemplateColumns: '1fr',
    },
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: '0px',
    },
    'screen and (max-width: 767px)': {
      display: 'block',
      gap: '0px',
    },
  },
});

export const planDetailsColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
});

export const orderSummaryColumn = style({
  '@media': {
    'screen and (min-width: 1025px)': {
      position: 'sticky',
      top: spacing.lg,
    },
  },
});

export const planCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid transparent',
  borderRadius: radius.lg,
  padding: spacing.lg,
  position: 'relative',
  boxShadow: enhancedShadows.layered,
  transition: 'all 0.3s ease',
  animation: `${fadeInUp} 0.6s ease-out`,
  '::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    padding: '2px',
    background:
      'linear-gradient(135deg, rgba(124, 82, 255, 0.4) 0%, rgba(124, 82, 255, 0.1) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
  ':hover': {
    boxShadow: enhancedShadows.purpleGlow,
    transform: 'translateY(-2px)',
  },
});

export const sectionBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `6px 12px`,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderRadius: radius.md,
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  marginBottom: spacing.sm,
});

export const planHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  marginBottom: spacing.md,
});

export const planName = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const planPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: typography.fontSize.xl,
  color: '#111827',
  flexWrap: 'wrap',
  marginTop: spacing.sm,
});

export const counterControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const counterButton = style({
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: '50%',
  cursor: 'pointer',
  color: '#374151',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  selectors: {
    '&:hover:not(:disabled)': {
      border: 'none',
      background: gradients.primary,
      color: '#ffffff',
      transform: 'scale(1.1)',
      boxShadow: enhancedShadows.purpleGlow,
    },
    '&:active:not(:disabled)': {
      transform: 'scale(0.95)',
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});

export const counterValue = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  minWidth: '50px',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
});

export const staffLabel = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  fontWeight: typography.fontWeight.medium,
  marginBottom: '20px',
  marginTop: '10px',
});

export const staffLabelHint = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginLeft: spacing.sm,
  fontWeight: typography.fontWeight.normal,
});

// Cart and order summary related styles
export const cartSection = style({
  flex: 1,
});

export const cartItemHeader = style({
  marginBottom: spacing.lg,
});

export const planStaffControl = style({
  marginTop: spacing.lg,
});

export const pricePerStaff = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.medium,
});

export const addonHeaderRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '0',
  marginTop: '0',
});

export const addonPriceRow = style({
  marginTop: spacing.xs,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const addonBilledInfo = style({
  fontSize: typography.fontSize.xs,
  color: '#9ca3af',
});

export const addonAddText = style({
  fontSize: typography.fontSize.sm,
  color: colors.primary[600],
  fontWeight: typography.fontWeight.medium,
  marginTop: spacing.sm,
});

export const orderSummaryContent = style({
  // Remove padding since it's now inside sectionCard
});

export const summaryTotalAmount = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  marginLeft: '10px',
});

export const summaryPriceWrapper = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: spacing.xs,
  '@media': {
    'screen and (max-width: 480px)': {
      flexWrap: 'wrap',
    },
  },
});

export const summaryOriginalPrice = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  textDecoration: 'line-through',
  fontWeight: typography.fontWeight.normal,
});

export const summaryDiscountedPrice = style({
  fontSize: typography.fontSize.xl,
  color: '#059669',
  fontWeight: typography.fontWeight.bold,
});

export const summaryNextBilling = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.sm,
  paddingTop: spacing.sm,
  borderTop: '1px solid #e5e7eb',
});

export const priceEquals = style({
  fontSize: typography.fontSize.xl,
  color: '#6b7280',
  fontWeight: typography.fontWeight.medium,
});

export const totalPrice = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const addonItemCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid transparent',
  borderRadius: radius.lg,
  padding: spacing.md,
  position: 'relative',
  boxShadow: enhancedShadows.layered,
  transition: 'all 0.3s ease',
  animation: `${fadeInUp} 0.6s ease-out`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  height: '100%',
  '::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    padding: '2px',
    background:
      'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.1) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
  ':hover': {
    boxShadow: enhancedShadows.greenGlow,
    transform: 'translateY(-2px)',
  },
});

export const addonItemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: spacing.xs,
});

export const addonItemTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  flex: 1,
  lineHeight: 1.4,
});

export const removeAddonButton = style({
  padding: '12px',
  minWidth: '44px',
  minHeight: '44px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#ef4444',
  borderRadius: radius.md,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  ':hover': {
    backgroundColor: '#fee2e2',
  },
});

export const addonItemPrice = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.xs,
});

export const recommendedAddonCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.md,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  animation: `${fadeInUp} 0.6s ease-out`,
  height: '100%',
  ':hover': {
    borderColor: colors.primary[600],
    boxShadow: enhancedShadows.layered,
    transform: 'translateY(-2px)',
  },
});

export const recommendedAddonHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const recommendedAddonTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  lineHeight: 1.4,
});

export const recommendedAddonPrice = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
});

export const addToSubscriptionButton = style({
  padding: '12px 24px',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: shadows.purple,
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const orderSummaryCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid transparent',
  borderRadius: radius.lg,
  padding: spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  position: 'relative',
  boxShadow: enhancedShadows.elevated,
  animation: `${fadeInUp} 0.6s ease-out`,
  '::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    padding: '2px',
    background:
      'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(124, 82, 255, 0.4) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
});

export const orderSummaryHeader = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  paddingBottom: spacing.md,
  borderBottom: '2px solid #e5e7eb',
});

export const summaryLineItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing.md,
});

export const summaryLineItemContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});

export const summaryLineItemTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: '#111827',
});

export const summarySubtext = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
});

export const summaryLineItemPrice = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  whiteSpace: 'nowrap',
});

export const summaryDivider = style({
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: `${spacing.sm} 0`,
});

export const summaryTotalRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  paddingTop: '0px',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 480px)': {
      flexWrap: 'wrap',
    },
  },
});

export const nextChargeText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.md,
  paddingTop: spacing.md,
  borderTop: '1px solid #e5e7eb',
});

export const nextChargeNote = style({
  fontSize: typography.fontSize.xs,
  color: '#9ca3af',
  marginTop: spacing.xs,
});

export const proceedButton = style({
  width: '100%',
  height: '52px',
  padding: '0 24px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  background: gradients.primary,
  color: '#ffffff',
  border: 'none',
  borderRadius: radius.lg,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: spacing.md,
  boxShadow: shadows.purple,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: typography.fontSize.sm,
      padding: '0 16px',
      letterSpacing: '0.03em',
    },
  },
  selectors: {
    '&:hover:not(:disabled)': {
      background: gradients.primaryHover,
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 60px -10px rgba(124, 82, 255, 0.6)',
    },
    '&:hover:not(:disabled)::before': {
      opacity: 1,
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const footerLinks = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  marginTop: spacing.xl,
  padding: spacing.md,
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  backgroundColor: '#f9fafb',
  borderRadius: radius.md,
  border: '1px solid #e5e7eb',
});

export const footerLink = style({
  color: colors.primary[600],
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: typography.fontWeight.semibold,
  transition: 'all 0.2s ease',
  padding: '4px 8px',
  borderRadius: radius.sm,
  background: 'none',
  border: 'none',
  ':hover': {
    color: colors.primary[700],
    backgroundColor: `${colors.primary[600]}10`,
    textDecoration: 'none',
  },
});

export const footerLinkDisabled = style({
  color: '#ef4444',
  cursor: 'not-allowed',
  fontWeight: typography.fontWeight.medium,
  padding: '4px 8px',
  ':hover': {
    textDecoration: 'none',
  },
});

export const sectionHeader = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.md,
  marginTop: spacing.lg,
  animation: `${fadeInUp} 0.6s ease-out`,
});

export const recommendedAddonsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  gridAutoRows: 'minmax(auto, max-content)',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// ============================================================================
// PLAN BADGE
// ============================================================================

export const planBadgeContainer = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.md} ${spacing.xl}`,
  borderRadius: radius.lg,
  border: '2px solid',
  boxShadow: enhancedShadows.layered,
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: enhancedShadows.elevated,
    transform: 'translateY(-1px)',
  },
});

export const planBadgeContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planBadgeIcon = style({
  flexShrink: 0,
});

export const planBadgeName = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planBadgeCycle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  opacity: 0.8,
});

export const planBadgeSubtext = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  opacity: 0.7,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const planBadgePriceContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  marginTop: spacing.xs,
});

export const planBadgePrice = style({
  fontSize: '1.25rem',
  fontWeight: typography.fontWeight.bold,
});

export const planBadgePriceStrike = style({
  fontSize: typography.fontSize.base,
  textDecoration: 'line-through',
  color: colors.neutral[600],
});

export const planBadgePriceSingle = style({
  fontSize: '1.25rem',
  fontWeight: typography.fontWeight.bold,
  marginTop: spacing.xs,
});

export const planBadgeWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  flexWrap: 'wrap',
  marginBottom: spacing.lg,
  position: 'relative',
  zIndex: 1,
});

export const editPlanButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  background: '#ffffff',
  border: `2px solid ${colors.primary[600]}`,
  cursor: 'pointer',
  padding: spacing.sm,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  width: '52px',
  height: '52px',
  flexShrink: 0,
  boxShadow: shadows.sm,
  ':hover': {
    backgroundColor: colors.primary[600],
    color: '#ffffff',
    transform: 'scale(1.1) rotate(15deg)',
    boxShadow: enhancedShadows.purpleGlow,
  },
  ':active': {
    transform: 'scale(0.95) rotate(15deg)',
  },
  ':focus': {
    outline: `3px solid ${colors.primary[600]}40`,
    outlineOffset: '2px',
  },
});

// ============================================================================
// MODAL STYLES
// ============================================================================

export const modalBackdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const modalContainer = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  boxShadow: shadows.xl,
  zIndex: 1000,
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing.lg,
  borderBottom: '1px solid #e5e7eb',
});

export const modalTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  margin: 0,
});

export const modalCloseButton = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: spacing.xs,
  borderRadius: radius.md,
  color: '#6b7280',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: '#f3f4f6',
    color: '#111827',
  },
});

export const modalBody = style({
  padding: spacing.lg,
  overflowY: 'auto',
  flex: 1,
});

export const modalFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: spacing.md,
  padding: spacing.lg,
  borderTop: '1px solid #e5e7eb',
});

// ============================================================================
// PLAN SELECTOR STYLES
// ============================================================================

export const billingToggleContainer = style({
  display: 'flex',
  gap: spacing.xs,
  backgroundColor: '#f3f4f6',
  padding: spacing.xs,
  borderRadius: radius.lg,
  marginBottom: spacing.lg,
});

export const billingToggleButton = style({
  flex: 1,
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: '#6b7280',
  background: 'transparent',
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    color: '#111827',
  },
});

export const billingToggleButtonActive = style({
  backgroundColor: '#ffffff',
  color: colors.primary[600],
  boxShadow: shadows.sm,
});

export const planOptionsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const planOptionCard = style({
  position: 'relative',
  padding: spacing.lg,
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff',
  ':hover': {
    borderColor: '#d1d5db',
    boxShadow: shadows.sm,
  },
});

export const planOptionCardSelected = style({
  boxShadow: shadows.md,
});

export const planOptionCheckbox = style({
  position: 'absolute',
  top: spacing.sm,
  right: spacing.sm,
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '2px solid #e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  transition: 'all 0.2s ease',
});

export const planOptionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const planOptionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
});

export const planOptionName = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planOptionBadge = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: `${spacing.xs} ${spacing.sm}`,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  borderRadius: radius.md,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  border: '1px solid transparent',
});

export const otpInputContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'nowrap',
  width: '100%',
  '@media': {
    'screen and (max-width: 600px)': {
      gap: '6px',
    },
    'screen and (max-width: 400px)': {
      gap: '4px',
    },
  },
});

export const otpInput = style({
  width: '50px',
  height: '50px',
  textAlign: 'center',
  fontSize: '24px',
});

// ============================================================================
// ENHANCED UTILITY STYLES
// ============================================================================

export const fadeInUpAnimation = style({
  animation: `${fadeInUp} 0.6s ease-out`,
});

export const scaleInAnimation = style({
  animation: `${scaleIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
});

export const shakeAnimation = style({
  animation: `${shake} 0.4s ease-in-out`,
});

export const pulseAnimation = style({
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const bounceInAnimation = style({
  animation: `${bounceIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
});

export const slideInRightAnimation = style({
  animation: `${slideInRight} 0.4s ease-out`,
});

export const slideInLeftAnimation = style({
  animation: `${slideInLeft} 0.4s ease-out`,
});

// ============================================================================
// ENHANCED INPUT STYLES
// ============================================================================

export const inputLarge = style({
  padding: '16px 20px',
  fontSize: typography.fontSize.lg,
  height: '56px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
});

export const inputReadOnly = style({
  backgroundColor: '#f9fafb',
  cursor: 'default',
  color: '#374151',
});

export const inputWithIcon = style({
  paddingLeft: '48px',
});

export const inputIconWrapper = style({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  pointerEvents: 'none',
});

export const inputSuccess = style({
  borderColor: colors.accent.green,
  ':focus': {
    borderColor: colors.accent.green,
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
  },
});

export const inputSuccessIcon = style({
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: colors.accent.green,
  pointerEvents: 'none',
  animation: `${scaleIn} 0.3s ease-out`,
});

export const floatingLabelContainer = style({
  position: 'relative',
});

export const floatingLabel = style({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: typography.fontSize.base,
  color: '#9ca3af',
  pointerEvents: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff',
  padding: '0 4px',
});

export const floatingLabelActive = style({
  top: '0',
  transform: 'translateY(-50%)',
  fontSize: typography.fontSize.sm,
  color: colors.primary[600],
});

// ============================================================================
// ENHANCED BUTTON STYLES
// ============================================================================

export const buttonLarge = style({
  padding: '16px 40px',
  fontSize: typography.fontSize.lg,
  height: '56px',
});

export const buttonExtraLarge = style({
  padding: '20px 48px',
  fontSize: typography.fontSize.lg,
  height: '60px',
});

export const buttonGradient = style({
  background: gradients.primary,
  color: '#ffffff',
  boxShadow: enhancedShadows.purpleGlow,
  selectors: {
    '&:hover:not(:disabled)': {
      background: gradients.primaryHover,
      transform: 'translateY(-3px)',
      boxShadow:
        '0 0 0 4px rgba(124, 82, 255, 0.15), 0 12px 40px -10px rgba(124, 82, 255, 0.6)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const buttonWithPulse = style({
  animation: `${pulse} 3s ease-in-out infinite`,
});

// ============================================================================
// ENHANCED OTP STYLES
// ============================================================================

export const otpBoxLarge = style({
  width: '64px',
  height: '64px',
  fontSize: '32px',
  fontWeight: typography.fontWeight.semibold,
  textAlign: 'center',
  border: '2px solid #d1d5db',
  borderRadius: radius.md,
  backgroundColor: '#ffffff',
  color: '#111827',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: enhancedShadows.purpleGlow,
    transform: 'scale(1.05)',
  },
  selectors: {
    '&[data-filled="true"]': {
      backgroundColor: `${colors.primary[600]}05`,
      borderColor: colors.primary[600],
    },
  },
  '@media': {
    'screen and (max-width: 600px)': {
      width: 'auto',
      flex: 1,
      minWidth: 0,
      maxWidth: '48px',
      height: 'auto',
      aspectRatio: '1',
      fontSize: '20px',
      border: '1.5px solid #d1d5db',
    },
    'screen and (max-width: 400px)': {
      fontSize: '18px',
    },
  },
});

export const otpBoxError = style({
  borderColor: '#ef4444',
  animation: `${shake} 0.4s ease-in-out`,
  boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
});

export const otpBoxSuccess = style({
  borderColor: colors.accent.green,
  backgroundColor: `${colors.accent.green}05`,
});

// ============================================================================
// ENHANCED ICON CONTAINERS
// ============================================================================

export const iconContainerLarge = style({
  width: '60px',
  height: '60px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${bounceIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
});

export const iconContainerPrimary = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: enhancedShadows.purpleGlow,
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const iconContainerSuccess = style({
  backgroundColor: colors.accent.green,
  color: '#ffffff',
  boxShadow: enhancedShadows.greenGlow,
});

export const iconContainerError = style({
  backgroundColor: '#ef4444',
  color: '#ffffff',
  boxShadow:
    '0 0 0 3px rgba(239, 68, 68, 0.1), 0 10px 30px -10px rgba(239, 68, 68, 0.4)',
});

export const iconContainerInfo = style({
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  boxShadow: enhancedShadows.blueGlow,
});

// ============================================================================
// ENHANCED ALERT STYLES
// ============================================================================

export const alertWithAnimation = style({
  animation: `${slideInRight} 0.4s ease-out`,
});

export const alertWithBorder = style({
  borderLeft: '4px solid currentColor',
  paddingLeft: spacing.lg,
});

// ============================================================================
// ENHANCED CARD STYLES
// ============================================================================

export const cardElevated = style({
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  boxShadow: enhancedShadows.layered,
  padding: spacing.xl,
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: enhancedShadows.elevated,
    transform: 'translateY(-2px)',
  },
});

export const cardGradientBorder = style({
  position: 'relative',
  background: '#ffffff',
  borderRadius: radius.lg,
  padding: spacing.xl,
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    padding: '2px',
    background: gradients.primary,
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
});

// ============================================================================
// ENHANCED STEP INDICATOR STYLES
// ============================================================================

export const stepCircleLarge = style({
  width: '60px',
  height: '60px',
  fontSize: typography.fontSize.xl,
  '@media': {
    'screen and (max-width: 600px)': {
      width: '48px',
      height: '48px',
      fontSize: typography.fontSize.lg,
    },
  },
});

export const stepCircleWithPulse = style({
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const stepConnectorAnimated = style({
  position: 'relative',
  overflow: 'hidden',
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: gradients.primary,
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s ease-out',
  },
});

export const stepConnectorAnimatedComplete = style({
  '::after': {
    transform: 'translateX(0)',
  },
});

// ============================================================================
// CONFETTI & CELEBRATION STYLES
// ============================================================================

export const confettiContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 9999,
});

// ============================================================================
// COUNTDOWN TIMER STYLES
// ============================================================================

export const countdownTimer = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '4px solid #e5e7eb',
  position: 'relative',
  margin: '0 auto',
  marginBottom: spacing.lg,
});

export const countdownText = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
});

export const countdownCircle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

// ============================================================================
// PROGRESS INDICATOR STYLES
// ============================================================================

export const formProgressBar = style({
  width: '100%',
  height: '8px',
  backgroundColor: '#e5e7eb',
  borderRadius: '999px',
  overflow: 'hidden',
  marginBottom: spacing.lg,
});

export const formProgressFill = style({
  height: '100%',
  background: gradients.primary,
  borderRadius: '999px',
  transition: 'width 0.5s ease-out, background 0.3s ease',
  boxShadow: '0 0 10px rgba(124, 82, 255, 0.3)',
});

export const formProgressComplete = style({
  background: gradients.success,
  boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
});

// ============================================================================
// GRADIENT TEXT STYLES
// ============================================================================

export const textGradientPrimary = style({
  background: gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const textGradientSuccess = style({
  background: gradients.success,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

// ============================================================================
// SECTION CARD STYLES (for clinic details form)
// ============================================================================

export const sectionCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.lg,
  marginBottom: spacing.lg,
  animation: `${fadeInUp} 0.6s ease-out`,
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: enhancedShadows.layered,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
    },
  },
});

export const sectionCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  marginBottom: spacing.lg,
  paddingBottom: spacing.md,
  borderBottom: '2px solid #e5e7eb',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: spacing.xs,
    },
  },
});

export const sectionNumber = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  flexShrink: 0,
});

export const sectionHeaderContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  flex: 1,
});

export const sectionIcon = style({
  color: colors.primary[600],
  flexShrink: 0,
});

// ============================================================================
// EXPORT ANIMATION KEYFRAMES (for use in components)
// ============================================================================

// Loading and Error States
export const loadingContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: spacing.lg,
  color: '#6b7280',
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.medium,
});

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: spacing.lg,
  color: '#dc2626',
  fontSize: typography.fontSize.lg,
  padding: spacing.xl,
  textAlign: 'center',
});

export const animations = {
  fadeIn,
  fadeInUp,
  scaleIn,
  shake,
  pulse,
  spin,
  drawCheckmark,
  slideInRight,
  slideInLeft,
  bounceIn,
  rotate,
};
