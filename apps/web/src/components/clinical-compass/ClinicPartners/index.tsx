import React from 'react';

import PartnersIllustration from '../PartnersIllustration';
import {
  sectionContainer,
  sectionTitle,
  tintedSection,
} from '../shared.css';

import {
  illustrationPanel,
  partnersGrid,
  partnersIllustration,
  partnersParagraph,
  partnersText,
} from './styles.css';

const ClinicPartners: React.FC = () => (
  <section className={tintedSection}>
    <div className={sectionContainer}>
      <h2 className={sectionTitle}>
        Supporting Individuals &amp; Partnering with Clinics
      </h2>
      <div className={partnersGrid}>
        <div className={illustrationPanel}>
          <PartnersIllustration className={partnersIllustration} />
        </div>
        <div className={partnersText}>
          <p className={partnersParagraph}>
            At The Clinical Compass, we partner with both individual trainees
            seeking high-quality mentorship and clinics looking to streamline
            or outsource their fieldwork supervision programs.
          </p>
          <p className={partnersParagraph}>
            We understand that managing a comprehensive trainee program
            requires significant time, resources, and specialized attention.
            Our program allows clinics to offload the responsibilities of
            structured fieldwork supervision, curriculum development,
            evaluations, and mentorship to a dedicated team focused on
            developing future behavior analysts.
          </p>
          <p className={partnersParagraph}>
            This allows clinic leadership and clinical teams to remain focused
            on delivering exceptional client care while providing trainees with
            a consistent, structured, and meaningful learning experience.
          </p>
          <p className={partnersParagraph}>
            Whether you&apos;re an individual pursuing certification or an
            organization investing in the next generation of BCBAs, The
            Clinical Compass offers a collaborative solution designed to
            support clinical growth and professional excellence.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ClinicPartners;
