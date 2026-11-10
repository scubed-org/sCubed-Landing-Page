import React, { ReactNode } from 'react';

import CompassDial, { COMPASS_ACCENTS } from '../CompassDial';

const INK = '#2a2670';
const GROUND = '#5d61d8';
const SKIN = '#f0bd99';
const LILAC = '#c4b5fd';
const SLEEVE = '#e4e1fb';
const WHITE = '#ffffff';

const DIAL_CENTRE = { x: 280, y: 172 };
const RING_RADII = [160, 220, 280, 340, 400, 460, 520, 580, 640];

// One token per dial arc: supervision, curriculum, evaluations and mentorship.
const RESPONSIBILITIES: { x: number; y: number; fill: string; glyph: ReactNode }[] = [
  {
    x: 183,
    y: 75,
    fill: COMPASS_ACCENTS.purple,
    glyph: (
      <>
        <circle cx="-3" cy="-6" r="5.5" />
        <path d="M-14 11C-14 3-8 1-3 1S4 2 7 6" />
        <path d="M5 9 9 13 16 4" />
      </>
    ),
  },
  {
    x: 377,
    y: 75,
    fill: COMPASS_ACCENTS.teal,
    glyph: (
      <>
        <path d="M0-7C-4-11-10-11-14-9V9C-10 7-4 7 0 11 4 7 10 7 14 9V-9C10-11 4-11 0-7Z" />
        <path d="M0-7V11" />
      </>
    ),
  },
  {
    x: 377,
    y: 269,
    fill: COMPASS_ACCENTS.coral,
    glyph: (
      <>
        <rect x="-10" y="-12" width="20" height="26" rx="3" />
        <path d="M-4-12H4" />
        <path d="M-5 2-1 6 6-3" />
      </>
    ),
  },
  {
    x: 183,
    y: 269,
    fill: COMPASS_ACCENTS.green,
    glyph: (
      <>
        <path d="M-14-11H4A2 2 0 0 1 6-9V0A2 2 0 0 1 4 2H-7L-12 7V2H-14A2 2 0 0 1-16 0V-9A2 2 0 0 1-14-11Z" />
        <path d="M10-4H14A2 2 0 0 1 16-2V7A2 2 0 0 1 14 9H12V13L8 9H0" />
      </>
    ),
  },
];

const CLINIC_WINDOWS = [
  { x: 448, y: 290 },
  { x: 503, y: 290 },
  { x: 448, y: 328 },
  { x: 503, y: 328 },
];

interface PartnersIllustrationProps {
  className?: string;
}

// The rings and ground are drawn past the viewBox so they keep filling the
// panel when it is much wider than the artwork; give the svg overflow: visible.
const PartnersIllustration: React.FC<PartnersIllustrationProps> = ({
  className,
}) => (
  <svg
    className={className}
    viewBox="0 0 560 420"
    role="img"
    aria-label="Illustration of a trainee and a clinic on two paths that meet at a compass, surrounded by icons for supervision, curriculum, evaluations and mentorship"
  >
    <g fill="none" stroke={WHITE} strokeOpacity="0.13" strokeWidth="1.5">
      {RING_RADII.map((radius) => (
        <circle
          key={radius}
          cx={DIAL_CENTRE.x}
          cy={DIAL_CENTRE.y}
          r={radius}
        />
      ))}
    </g>

    <path
      d="M-900 372H70C170 372 205 296 280 296S390 372 490 372H1460V1000H-900Z"
      fill={GROUND}
    />

    <g
      fill="none"
      stroke={WHITE}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeDasharray="1 10"
    >
      <path d="M122 382C196 382 226 318 280 306" />
      <path d="M420 382C358 382 334 318 280 306" />
      <path d="M280 306V276" />
    </g>
    <circle cx="280" cy="306" r="7" fill={WHITE} />

    <CompassDial variant="hero" x={176} y={68} width={208} height={208} />

    {RESPONSIBILITIES.map(({ x, y, fill, glyph }) => (
      <g key={fill} transform={`translate(${x} ${y})`}>
        <circle r="27" fill={fill} stroke={WHITE} strokeWidth="3.5" />
        <g
          fill="none"
          stroke={INK}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {glyph}
        </g>
      </g>
    ))}

    {/* Trainee */}
    <g transform="translate(-10 0)">
      <rect
        x="42"
        y="268"
        width="26"
        height="50"
        rx="11"
        fill={COMPASS_ACCENTS.coral}
      />
      <g fill="none" stroke={INK} strokeWidth="15" strokeLinecap="round">
        <path d="M74 320 62 376" />
        <path d="M84 320 100 376" />
      </g>
      <g stroke={WHITE} strokeWidth="9" strokeLinecap="round">
        <path d="M60 381H76" />
        <path d="M98 381H114" />
      </g>
      <rect x="73" y="246" width="15" height="22" rx="6" fill={SKIN} />
      <rect x="56" y="260" width="46" height="70" rx="19" fill={WHITE} />
      <circle cx="83" cy="233" r="20" fill={SKIN} />
      <path
        d="M62 240C56 216 74 203 92 209 100 212 104 219 103 226 92 226 84 222 79 217 77 227 71 235 62 240Z"
        fill={INK}
      />
      <rect
        x="112"
        y="266"
        width="32"
        height="42"
        rx="4"
        transform="rotate(8 128 287)"
        fill={COMPASS_ACCENTS.teal}
      />
      <path
        d="M120 279 138 281.5M119 288 137 290.5M118 297 130 298.7"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M86 276 118 298"
        fill="none"
        stroke={SLEEVE}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle cx="121" cy="300" r="7.5" fill={SKIN} />
    </g>

    {/* Clinic */}
    <g>
      <circle cx="430" cy="370" r="15" fill={COMPASS_ACCENTS.green} />
      <rect x="436" y="272" width="96" height="112" rx="5" fill={WHITE} />
      <rect x="428" y="260" width="112" height="16" rx="6" fill={INK} />
      {CLINIC_WINDOWS.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="17"
          height="20"
          rx="3"
          fill={LILAC}
        />
      ))}
      <path
        d="M471 345A3 3 0 0 1 474 342H494A3 3 0 0 1 497 345V384H471Z"
        fill={INK}
      />
      <path
        d="M484 330C480 324 469 315 469 306 469 300 473 296 478 296 481 296 483 298 484 300 485 298 487 296 490 296 495 296 499 300 499 306 499 315 488 324 484 330Z"
        fill={COMPASS_ACCENTS.coral}
      />
    </g>
  </svg>
);

export default PartnersIllustration;
