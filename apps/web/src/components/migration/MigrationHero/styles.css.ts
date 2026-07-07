import { style } from '@vanilla-extract/css';

import {
  heroContent,
  heroImageContent,
} from '../../data-collection/DataCollectionHero/styles.css';

// Give the migration hero image a bit more room than the shared data-collection hero.
export const migrationHeroContent = style([
  heroContent,
  {
    gridTemplateColumns: '1fr 1.2fr',
    '@media': {
      'screen and (max-width: 968px)': {
        gridTemplateColumns: '1fr',
      },
    },
  },
]);

export const migrationHeroImageContent = style([
  heroImageContent,
  {
    maxWidth: '720px',
    '@media': {
      'screen and (max-width: 968px)': {
        maxWidth: '480px',
      },
    },
  },
]);
