'use client';

import {
  BookOpen,
  ClipboardCheck,
  LucideIcon,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

import CompassDial, { COMPASS_ACCENTS } from '../CompassDial';
import { sectionContainer, sectionTitle } from '../shared.css';

import {
  card,
  cardField,
  cardIcon,
  cardText,
  cardTitle,
  dial,
  featuresSection,
  sectionLead,
  sectionProvides,
  swingingNeedle,
} from './styles.css';

interface Feature {
  position: keyof typeof card;
  bearing: number;
  Icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  tint: string;
}

const features: Feature[] = [
  {
    position: 'northWest',
    bearing: -45,
    Icon: BookOpen,
    title: 'Structured Clinical Curriculum',
    description:
      'A guided learning experience focused on developing essential behavior-analytic competencies and applying evidence-based practices.',
    accent: COMPASS_ACCENTS.purple,
    tint: '#f5f3ff',
  },
  {
    position: 'northEast',
    bearing: 45,
    Icon: Users,
    title: 'Individualized & Collaborative Mentorship',
    description:
      'Personalized guidance through one-on-one meetings, complemented by group discussions, clinical collaboration, and shared learning.',
    accent: COMPASS_ACCENTS.teal,
    tint: '#ecfeff',
  },
  {
    position: 'southWest',
    bearing: -135,
    Icon: ClipboardCheck,
    title: 'Ongoing Evaluations & Meaningful Feedback',
    description:
      'Regular assessment of skill development, constructive feedback, and opportunities to strengthen clinical decision-making.',
    accent: COMPASS_ACCENTS.green,
    tint: '#ecfdf5',
  },
  {
    position: 'southEast',
    bearing: 135,
    Icon: TrendingUp,
    title: 'Professional Growth & Clinical Readiness',
    description:
      'Support designed to build ethical judgment, professional confidence, leadership skills, and readiness for independent practice.',
    accent: COMPASS_ACCENTS.coral,
    tint: '#fef2f2',
  },
];

// The smallest signed turn, in degrees, from the current angle to a bearing.
const shortestTurn = (current: number, bearing: number): number =>
  ((((bearing - current) % 360) + 540) % 360) - 180;

const CompassFeatures: React.FC = () => {
  // The rotation keeps accumulating past 360 so the needle never unwinds.
  const [needle, setNeedle] = useState<{ rotation: number; color: string }>({
    rotation: 0,
    color: COMPASS_ACCENTS.purple,
  });

  const pointNeedleAt = ({ bearing, accent }: Feature) => {
    setNeedle(({ rotation }) => ({
      rotation: rotation + shortestTurn(rotation, bearing),
      color: accent,
    }));
  };

  return (
    <section className={featuresSection}>
      <div className={sectionContainer}>
        <h2 className={sectionTitle}>
          More Than Supervision. A&nbsp;Path to Clinical Excellence.
        </h2>
        <p className={sectionLead}>
          At The Clinical Compass, we believe effective supervision should
          inspire growth, encourage critical thinking, and bridge the gap
          between academic knowledge and real-world clinical practice.
        </p>
        <p className={sectionProvides}>Our program provides:</p>
        <div className={cardField}>
          {features.map((feature) => {
            const { Icon, accent, position, tint } = feature;

            return (
              <div
                key={position}
                className={card[position]}
                onPointerEnter={() => pointNeedleAt(feature)}
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, ${tint} 100%)`,
                  borderColor: `${accent}33`,
                }}
              >
                <div
                  className={cardIcon}
                  style={{
                    background: `linear-gradient(135deg, ${accent}22 0%, ${accent}33 100%)`,
                    color: accent,
                  }}
                >
                  <Icon size={28} aria-hidden="true" />
                </div>
                <h3 className={cardTitle}>{feature.title}</h3>
                <p className={cardText}>{feature.description}</p>
              </div>
            );
          })}
          <CompassDial
            variant="cards"
            className={dial}
            needleClassName={swingingNeedle}
            needleStyle={{ transform: `rotate(${needle.rotation}deg)` }}
            needleColor={needle.color}
          />
        </div>
      </div>
    </section>
  );
};

export default CompassFeatures;
