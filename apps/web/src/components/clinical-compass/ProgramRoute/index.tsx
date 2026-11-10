import React from 'react';

import { sectionContainer } from '../shared.css';

import {
  dot,
  route,
  routeSection,
  stop,
  stopLine,
  stopText,
  stops,
  track,
  trackPath,
  trackSvg,
} from './styles.css';

// Coordinates are pixels relative to the second dot, so the curve meets that
// dot at every screen width. Each track clips the line to its own colour.
const ROUTE_PATH = 'M-2000 13 H-100 C-33.5 13 -43 101 23.6 101 H2000';

const ROUTE_STOPS = [
  {
    colour: 'lilac',
    text: 'The Clinical Compass is a comprehensive mentorship and fieldwork experience program designed around the 2027 Behavior Analyst Certification Board (BACB) fieldwork requirements and expectations.',
  },
  {
    colour: 'blue',
    text: 'Our program combines individualized supervision, collaborative group learning, a structured curriculum, ongoing evaluations, and constructive feedback to help aspiring behavior analysts develop the knowledge, confidence, and clinical judgment necessary for professional success.',
  },
] as const;

const ProgramRoute: React.FC = () => (
  <section className={routeSection}>
    <div className={sectionContainer}>
      <div className={route}>
        {ROUTE_STOPS.map(({ colour }) => (
          <div key={colour} className={track[colour]} aria-hidden="true">
            <svg className={trackSvg} width="1" height="130">
              <path className={trackPath[colour]} d={ROUTE_PATH} />
            </svg>
          </div>
        ))}
        <div className={stops}>
          {ROUTE_STOPS.map(({ colour, text }) => (
            <div key={colour} className={stop}>
              <svg className={stopLine[colour]} aria-hidden="true">
                <line
                  className={trackPath[colour]}
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                />
              </svg>
              <span className={dot[colour]} />
              <p className={stopText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProgramRoute;
