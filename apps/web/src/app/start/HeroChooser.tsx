'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

import { primaryButton } from '../../components/billing/CalendlyButton/styles.css';
import {
  heroDescription,
  heroTitle,
  heroTitleHighlight,
} from '../../components/data-collection/DataCollectionHero/styles.css';

import { BOOK_LABEL, PATHS, PathActions, PathCallout, type Path } from './paths';
import {
  backButton,
  chooser,
  chooserCard,
  chooserHint,
  chooserTitle,
  heroNote,
  heroPanel,
} from './styles.css';

/**
 * The /start hero. Picking "starting" or "switching" swaps the hero's content
 * in place (no scrolling), with a Back button to return to the choice.
 */

const choices: readonly { path: Path; label: string; hint: string }[] = [
  {
    path: 'starting',
    label: 'I’m starting a clinic',
    hint: 'We guide you from setup to first claim',
  },
  {
    path: 'switching',
    label: 'I’m switching software',
    hint: 'We move your data for you',
  },
];

const HeroChooser: React.FC = () => {
  const [view, setView] = useState<Path | null>(null);

  if (view) {
    const p = PATHS[view];
    return (
      <div className={heroPanel} aria-live="polite">
        <button
          type="button"
          className={backButton}
          onClick={() => setView(null)}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>
        <h1 className={heroTitle}>{p.title}</h1>
        <p className={heroDescription}>{p.intro}</p>
        <PathCallout path={view} />
        <PathActions path={view} />
        <p className={heroNote}>Free. 20 minutes. No pressure.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className={heroTitle}>
        Start or switch to <span className={heroTitleHighlight}>S Cubed</span>
      </h1>
      <p className={heroDescription}>
        One simple system for your ABA clinic: scheduling, data, billing,
        telehealth and your parent portal, all in one place.
      </p>
      <a className={primaryButton} href="#book">
        {BOOK_LABEL}
      </a>
      <p className={heroNote}>Free. 20 minutes. No pressure.</p>

      <div className={chooser}>
        {choices.map((c) => (
          <button
            type="button"
            key={c.path}
            className={chooserCard}
            onClick={() => setView(c.path)}
          >
            <span className={chooserTitle}>
              {c.label}
              <ArrowRight size={18} aria-hidden="true" />
            </span>
            <span className={chooserHint}>{c.hint}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default HeroChooser;
