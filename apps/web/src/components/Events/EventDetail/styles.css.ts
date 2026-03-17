import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const articleContainer = style({
  backgroundColor: colors.neutral[50],
  minHeight: '100vh',
  marginTop: '-80px', // Compensate for layout margin
  paddingTop: '80px', // Add padding to push content below header
  position: 'relative',

  '@media': {
    '(max-width: 768px)': {
      marginTop: '-60px',
      paddingTop: '60px',
    },
  },
});

export const heroSection = style({
  position: 'relative',
  height: '60vh',
  minHeight: '400px',
  maxHeight: '600px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    '(max-width: 1024px)': {
      height: 'auto',
      minHeight: 'auto',
    },
    '(max-width: 768px)': {
      height: 'auto',
      minHeight: 'auto',
    },
    '(max-width: 414px)': {
      height: 'auto',
      minHeight: 'auto',
    },
  },
});

export const heroImageWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',

  '@media': {
    '(max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const heroImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'none',

  '@media': {
    '(max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const heroOverlay = style({});

export const heroContent = style({});

export const heroTitle = style({});

export const heroMeta = style({});

export const heroMetaItem = style({});

export const heroCta = style({});

export const heroRegisterButton = style({});

// Mobile image rendering similar to ModuleImage behavior
export const heroMobileWrapper = style({
  display: 'none',
  width: '100%',
  padding: `${spacing.lg} 0 0`,

  '@media': {
    '(max-width: 1024px)': {
      display: 'block',
      width: 'calc(100vw + 2rem)',
      marginLeft: 'calc(50% - 50vw - 1rem)',
      marginRight: 'calc(50% - 50vw - 1rem)',
    },
  },
});

export const heroMobileImage = style({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: radius.lg,
  display: 'block',
  margin: 0,

  '@media': {
    '(max-width: 768px)': {
      height: 'auto',
      minHeight: '180px',
    },
    '(max-width: 414px)': {
      height: 'auto',
      minHeight: '120px',
    },
  },
});

export const contentWrapper = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: spacing.xl,
  backgroundColor: colors.white,
  position: 'relative',
  marginTop: '-2rem',
  borderRadius: `${radius.xl} ${radius.xl} 0 0`,
  boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
  zIndex: 1,

  '@media': {
    '(max-width: 768px)': {
      maxWidth: '100%',
      padding: spacing.sm,
      marginTop: '-1rem',
    },
  },
});

export const breadcrumbRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing.md,

  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing.sm,
    },
  },
});

export const breadcrumb = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  marginBottom: spacing.lg,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
});

export const contentLayout = style({
  display: 'flex',
  gap: spacing.xl,

  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
      gap: spacing.lg,
    },
  },
});

export const mainContent = style({
  flex: '1',
  minWidth: '0',
});

export const articleContent = style({
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  scrollPaddingTop: '100px', // Account for fixed header

  '@media': {
    '(max-width: 768px)': {
      scrollPaddingTop: '80px',
    },
  },
});

// Categories and Tags Section - Match BlogArticle exactly
export const categoriesTagsSection = style({
  marginTop: spacing.xl,
  paddingTop: spacing.lg,
  borderTop: `1px solid ${colors.neutral[200]}`,
});

export const sectionWrapper = style({
  marginBottom: spacing.lg,
});

export const sectionLabel = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[500],
  marginBottom: spacing.sm,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.sm,
  marginTop: spacing.lg,
});

export const tag = style({
  backgroundColor: colors.primary[100],
  color: colors.primary[700],
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radius.base,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  textDecoration: 'none',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: colors.primary[200],
    color: colors.primary[800],
  },
});

// Enhanced Social Share - Match BlogArticle exactly
export const socialShare = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  boxShadow: shadows.md,
  overflow: 'hidden',
  marginTop: spacing.xl,
  border: `1px solid ${colors.neutral[100]}`,
});

export const shareHeader = style({
  padding: spacing.xl,
  paddingBottom: spacing.lg,
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.neutral[50]} 100%)`,
  borderBottom: `1px solid ${colors.neutral[100]}`,
});

export const socialShareTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  fontFamily: typography.fontFamily.heading,
  margin: 0,
});

export const shareStats = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  fontStyle: 'italic',
});

export const socialShareGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: spacing.sm,
  padding: spacing.xl,
  paddingTop: spacing.lg,

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const socialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm}`,
  borderRadius: radius.lg,
  textDecoration: 'none',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
  },

  ':active': {
    transform: 'translateY(0)',
  },
});

export const copyLinkButton = style([
  socialButton,
  {
    backgroundColor: colors.neutral[100],
    color: colors.neutral[700],
    border: `2px solid ${colors.neutral[200]}`,

    ':hover': {
      backgroundColor: colors.neutral[200],
      borderColor: colors.neutral[300],
      color: colors.neutral[800],
    },
  },
]);

// X (formerly Twitter) button
export const twitterButton = style([
  socialButton,
  {
    backgroundColor: '#000000', // X's official black color
    color: colors.white,

    ':hover': {
      backgroundColor: '#333333',
    },
  },
]);

export const linkedinButton = style([
  socialButton,
  {
    backgroundColor: '#0077B5',
    color: colors.white,

    ':hover': {
      backgroundColor: '#005885',
    },
  },
]);

export const facebookButton = style([
  socialButton,
  {
    backgroundColor: '#1877F2',
    color: colors.white,

    ':hover': {
      backgroundColor: '#0d61bf',
    },
  },
]);

// Sidebar styles - hidden on mobile since content is duplicated in main area
export const sidebar = style({
  flex: '0 0 340px',
  position: 'relative',
  top: 'auto',
  height: 'auto',

  '@media': {
    '(max-width: 1024px)': {
      display: 'none', // Hide sidebar on mobile - content is shown in main area instead
    },
  },
});

export const eventInfoCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  overflow: 'hidden',
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

// New Event Details Card styles
export const eventDetailsCard = style({
  backgroundColor: colors.white,
  borderRadius: '16px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  marginBottom: '32px',

  '::before': {
    content: '""',
    display: 'block',
    height: '4px',
    background: 'linear-gradient(135deg, #7a7eed 0%, #9f7aea 100%)',
  },

  ':hover': {
    boxShadow:
      '0 10px 25px -5px rgba(122, 126, 237, 0.25), 0 10px 10px -5px rgba(159, 122, 234, 0.15)',
    transform: 'translateY(-2px)',
  },
});

export const cardContent = style({
  padding: '32px',

  '@media': {
    '(max-width: 640px)': {
      padding: '24px',
    },
  },
});

export const eventLabel = style({
  display: 'inline-block',
  background: 'linear-gradient(135deg, #7a7eed 0%, #9f7aea 100%)',
  color: colors.white,
  fontSize: '12px',
  fontWeight: '600',
  padding: '6px 12px',
  borderRadius: '20px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  marginBottom: '20px',
});

export const eventCardTitle = style({
  color: '#1a1a2e',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.3',
  marginBottom: '24px',

  '@media': {
    '(max-width: 640px)': {
      fontSize: '20px',
    },
  },
});

export const eventDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '24px',
});

export const detailItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
});

export const iconContainer = style({
  width: '40px',
  height: '40px',
  background:
    'linear-gradient(135deg, rgba(122, 126, 237, 0.1), rgba(159, 122, 234, 0.1))',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const icon = style({
  width: '20px',
  height: '20px',
  fill: '#8b7eed', // Middle color between the gradient colors
});

export const detailText = style({
  flex: 1,
});

export const detailLabel = style({
  fontSize: '12px',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '2px',
  fontWeight: '500',
});

export const detailValue = style({
  fontSize: '15px',
  color: '#1a1a2e',
  fontWeight: '500',
});

export const registrationStatusClosed = style({
  background: '#fef3c7',
  color: '#92400e',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const statusIcon = style({
  width: '16px',
  height: '16px',
  fill: '#92400e',
});

export const cardHeader = style({
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  padding: spacing.lg,
  borderBottom: `2px solid ${colors.primary[200]}`,
});

// Header icon for calendar
export const headerIcon = style({
  width: '48px',
  height: '48px',
  borderRadius: radius.full,
  backgroundColor: colors.primary[50],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
});

// Keep for compatibility
export const cardHeaderIcon = style({
  display: 'none',
});

export const eventInfoTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[700],
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textAlign: 'center',
});

export const cardBody = style({
  padding: spacing.lg,
  backgroundColor: colors.neutral[50],
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

// Event name at the top
export const eventName = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  textAlign: 'center',
  padding: spacing.md,
  backgroundColor: colors.white,
  borderRadius: radius.md,
  marginBottom: spacing.xs,
});

// Info group container
export const infoGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

// Consistent info row styling - with proper alignment
export const infoRow = style({
  display: 'flex',
  gap: spacing.md,
  alignItems: 'center', // Changed to center for proper alignment
  backgroundColor: colors.white,
  padding: spacing.md,
  borderRadius: radius.md,
});

export const infoIconWrapper = style({
  width: '40px',
  height: '40px',
  borderRadius: radius.full,
  backgroundColor: colors.primary[50],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  flexShrink: 0,
});

export const infoContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
});

export const infoMain = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  lineHeight: '1.2',
  marginBottom: spacing.xs,
});

export const infoSub = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  lineHeight: '1.2',
});

export const infoIcon = style({
  flexShrink: 0,
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.neutral[50],
  borderRadius: radius.md,
  color: colors.primary[600],
});

export const infoText = style({
  flex: 1,
});

// Keep old style for backward compatibility but unused
export const infoSection = style({
  display: 'none',
});

export const iconWrapper = style({
  display: 'none',
});

export const infoLabel = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: colors.neutral[500],
  marginBottom: spacing.xs,
});

export const infoSubtext = style({
  display: 'none',
});

// New clean styles
export const infoValue = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
});

export const infoDetail = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const statusDot = style({
  display: 'none',
});

export const statusUpcoming = style({});
export const statusOngoing = style({});
export const statusCompleted = style({});

// Registration section with consistent styling
export const registrationSection = style({
  marginTop: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.primary[50],
  borderRadius: radius.md,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const registerButton = style({
  display: 'block',
  width: '100%',
  padding: `${spacing.md} ${spacing.lg}`,
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
  color: colors.white,
  borderRadius: radius.md,
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: typography.fontWeight.bold,
  fontSize: typography.fontSize.base,
  transition: 'all 0.2s ease',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },

  ':focus-visible': {
    outline: `2px solid ${colors.primary[600]}`,
    outlineOffset: '2px',
  },
});

export const registrationClosedText = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  textAlign: 'center',
  padding: `${spacing.sm} ${spacing.md}`,
  backgroundColor: colors.white,
  borderRadius: radius.md,
  border: `1px solid ${colors.neutral[200]}`,
});

export const secondaryButton = style({
  display: 'none', // Removed as per request
});

export const ctaDeadline = style({
  display: 'none',
});

// Global styles for breadcrumb links
globalStyle(`${breadcrumb} a`, {
  color: colors.primary[600],
  textDecoration: 'none',
  transition: 'color 0.2s',
});

globalStyle(`${breadcrumb} a:hover`, {
  color: colors.primary[700],
});

globalStyle(`${breadcrumb} span`, {
  color: colors.neutral[800],
  fontWeight: typography.fontWeight.medium,
});

// Add these markdown-specific styles to your styles.css file

// Markdown Typography Styles
export const markdownH1 = style({
  fontSize: '2.5rem',
  fontWeight: typography.fontWeight.bold,
  lineHeight: '1.2',
  marginTop: spacing.xl,
  marginBottom: spacing.lg,
  color: colors.neutral[900],

  ':first-child': {
    marginTop: 0,
  },

  '@media': {
    '(max-width: 768px)': {
      fontSize: '2rem',
    },
  },
});

export const markdownH2 = style({
  fontSize: '2rem',
  fontWeight: typography.fontWeight.semibold,
  lineHeight: '1.3',
  color: colors.neutral[900],

  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.75rem',
    },
  },
});

export const markdownH3 = style({
  fontSize: '1.5rem',
  fontWeight: typography.fontWeight.semibold,
  lineHeight: '1.4',
  color: colors.neutral[900],

  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
});

export const markdownH4 = style({
  fontSize: '1.25rem',
  fontWeight: typography.fontWeight.semibold,
  lineHeight: '1.4',
  color: colors.neutral[900],

  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.125rem',
    },
  },
});

export const markdownP = style({
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  fontSize: typography.fontSize.base,
});

export const markdownUl = style({
  listStyleType: 'disc',
  color: colors.neutral[700],
});

export const markdownOl = style({
  marginLeft: spacing.sm,
  listStyleType: 'decimal',
  color: colors.neutral[700],
});

export const markdownLi = style({
  lineHeight: typography.lineHeight.relaxed,
  paddingLeft: spacing.xs,
});

export const markdownA = style({
  color: colors.primary[600],
  textDecoration: 'underline',
  transition: 'color 0.2s ease',

  ':hover': {
    color: colors.primary[700],
  },
});

export const markdownBlockquote = style({
  borderLeft: `4px solid ${colors.primary[500]}`,
  backgroundColor: colors.primary[50],
  padding: spacing.lg,
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  fontStyle: 'italic',
  color: colors.neutral[700],
});

export const markdownStrong = style({
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
});

export const markdownEm = style({
  fontStyle: 'italic',
  color: colors.neutral[800],
});

export const markdownHr = style({
  border: 'none',
  borderTop: `2px solid ${colors.neutral[200]}`,
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
});

// Table Styles - CRITICAL FOR TABLE RENDERING
export const tableWrapper = style({
  overflowX: 'auto',
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  borderRadius: radius.lg,
  border: `1px solid ${colors.neutral[200]}`,
});

export const markdownTable = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: typography.fontSize.sm,
});

export const markdownThead = style({
  backgroundColor: colors.neutral[50],
});

export const markdownTh = style({
  padding: `${spacing.md} ${spacing.lg}`,
  textAlign: 'left',
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  borderBottom: `2px solid ${colors.neutral[200]}`,
  fontSize: typography.fontSize.sm,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',

  ':first-child': {
    borderTopLeftRadius: radius.md,
  },

  ':last-child': {
    borderTopRightRadius: radius.md,
  },
});

export const markdownTbody = style({
  backgroundColor: colors.white,
});

export const markdownTr = style({
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: colors.neutral[50],
  },
});

export const markdownTd = style({
  padding: `${spacing.md} ${spacing.lg}`,
  color: colors.neutral[700],
  borderBottom: `1px solid ${colors.neutral[100]}`,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
});

// Remove unused styles (clean up)
// Remove these from your file:
// - cardHeaderIcon
// - infoSection
// - iconWrapper
// - infoSubtext
// - statusDot
// - statusUpcoming
// - statusOngoing
// - statusCompleted
// - secondaryButton
// - ctaDeadline

// Global styles for markdown list items
globalStyle(`${markdownUl} li`, {
  marginBottom: spacing.xs,
});

globalStyle(`${markdownOl} li`, {
  marginBottom: spacing.xs,
});

// Global style for table last row td
globalStyle(`${markdownTbody} tr:last-child ${markdownTd}`, {
  borderBottom: 'none',
});

// Mobile-specific styles for reordering content
export const articleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

// Mobile Event Details - shown only on mobile, hidden on desktop
export const mobileEventDetails = style({
  display: 'none',

  '@media': {
    '(max-width: 1024px)': {
      display: 'block',
    },
  },
});

// Mobile Contact Form - shown only on mobile, hidden on desktop
export const mobileContactForm = style({
  display: 'none',

  '@media': {
    '(max-width: 1024px)': {
      display: 'block',
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  },
});
