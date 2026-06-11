import { style } from '@vanilla-extract/css';

export const hidePanel = style({
  display: `none`,
});

export const tab = style({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  fontSize: `24px`,
  color: `#333`,
  fontWeight: `500`,
  padding: `10px 10px 14px 10px`, // Extra bottom padding for border
  marginBottom: '-4px', // Compensate for border height to align with tabsList border
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  flex: '1',
  '@media': {
    'screen and (max-width: 1024px)': {
      flex: '1 1 50%',
      minWidth: '150px',
      marginBottom: '0',
    },
    'screen and (max-width: 768px)': {
      flex: '1 1 50%',
      fontSize: '18px',
      padding: '8px',
      marginBottom: '0',
    },
    'screen and (max-width: 480px)': {
      flex: '1 1 50%',
      fontSize: '16px',
    },
  },
});
export const tabsList = style({
  display: `flex`,
  alignItems: `stretch`, // Keep this - needed for consistent tab heights
  justifyContent: `space-between`,
  borderBottom: `1px solid #ededef`,
  marginBottom: `35px`,
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      borderBottom: 'none',
    },
    'screen and (max-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      marginBottom: '20px',
    },
    'screen and (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
    },
  },
});

export const tabDataHeading = style({
  fontSize: `24px`,
  fontWeight: `500`,
  color: `#333`,
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: '18px',
    },
    'screen and (max-width: 768px)': {
      fontSize: '16px',
    },
    'screen and (max-width: 480px)': {
      fontSize: '14px',
    },
  },
});

export const tabData = style({
  maxWidth: `240px`,
  width: `100%`,
  textAlign: `center`,
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});

export const panelHeading = style({
  fontSize: `36px`,
  fontWeight: `700`,
  color: `#333`,
  maxWidth: `464px`,
  marginBottom: `34px`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: `center`,
      fontSize: `24px`,
      marginBottom: `15px`,
    },
    'screen and (min-width: 768px) and (max-width: 1200px)': {
      maxWidth: `100%`,
    },
  },
});

export const sectionDescription = style({
  fontSize: '20px',
  color: `#6e6e6e`,
  fontWeight: `400`,
  maxWidth: `464px`,
  marginBottom: `40px`,
  width: `100%`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: `center`,
    },
    'screen and (max-width: 600px)': {
      maxWidth: `350px`,
    },
  },
});

export const tabPanelImage = style({
  maxWidth: '820px',
  width: '100%',
  padding: `0 20px`,
});

export const ctaWrapper = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
});
