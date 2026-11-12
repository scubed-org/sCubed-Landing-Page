import React from 'react';

import { sectionContainer } from '../shared.css';

import {
  closingCard,
  closingHighlight,
  closingLead,
  closingRule,
  closingSection,
  closingStatement,
  closingTitle,
  titleHighlight,
} from './styles.css';

interface CompassClosingProps {
  // Drop the top padding when the section above is white and already ends
  // with the same padding (as the features section does).
  flushTop?: boolean;
}

const CompassClosing: React.FC<CompassClosingProps> = ({
  flushTop = false,
}) => (
  <section className={closingSection[flushTop ? 'flushTop' : 'default']}>
    <div className={sectionContainer}>
      <div className={closingCard}>
        <h2 className={closingTitle}>
          Your Future. Your Direction.{' '}
          <span className={titleHighlight}>Your Clinical Compass.</span>
        </h2>
        <p className={closingLead}>
          Whether you are beginning your fieldwork journey or advancing toward
          certification, The Clinical Compass provides the structure,
          mentorship, and support to help you move forward with purpose.
        </p>
        <span className={closingRule} aria-hidden="true" />
        <p className={closingStatement}>
          Because becoming a great behavior analyst is about more than meeting
          requirements. It&apos;s about becoming{' '}
          <span className={closingHighlight}>
            the clinician your future clients deserve.
          </span>
        </p>
      </div>
    </div>
  </section>
);

export default CompassClosing;
