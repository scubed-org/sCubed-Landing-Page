import React, { CSSProperties, SVGProps } from 'react';

import { needle } from './styles.css';

export const COMPASS_ACCENTS = {
  purple: '#7a7eed',
  teal: '#22d3ee',
  green: '#34d399',
  coral: '#fb7185',
} as const;

interface DialGeometry {
  arcWidth: number;
  tickWidth: number;
  tickDash: string;
  starFill: string;
  northNeedle: string;
  southNeedle: string;
  pinRadius: number;
  pinStroke: number;
  discStroke: number;
}

const GEOMETRY: Record<'hero' | 'cards', DialGeometry> = {
  hero: {
    arcWidth: 3,
    tickWidth: 3,
    tickDash: '.7 9.42',
    starFill: '#f1eefe',
    northNeedle: 'M74 26 82 74H66z',
    southNeedle: 'M74 122 66 74h16z',
    pinRadius: 4.5,
    pinStroke: 1.6,
    discStroke: 0.6,
  },
  cards: {
    arcWidth: 4,
    tickWidth: 4,
    tickDash: '1 9.12',
    starFill: '#ede9fe',
    northNeedle: 'M74 30 83 74H65z',
    southNeedle: 'M74 118 65 74h18z',
    pinRadius: 5,
    pinStroke: 2,
    discStroke: 1,
  },
};

// Each arc spans 66 degrees and is centred on its quadrant.
const ARCS = [
  { color: COMPASS_ACCENTS.purple, rotation: 192 },
  { color: COMPASS_ACCENTS.teal, rotation: -78 },
  { color: COMPASS_ACCENTS.green, rotation: 102 },
  { color: COMPASS_ACCENTS.coral, rotation: 12 },
];

// x, y, width and height place the dial when it is nested inside another svg.
interface CompassDialProps
  extends Pick<SVGProps<SVGSVGElement>, 'x' | 'y' | 'width' | 'height'> {
  variant: keyof typeof GEOMETRY;
  className?: string;
  needleClassName?: string;
  needleStyle?: CSSProperties;
  needleColor?: string;
}

const CompassDial: React.FC<CompassDialProps> = ({
  variant,
  className,
  needleClassName,
  needleStyle,
  needleColor = COMPASS_ACCENTS.purple,
  ...placement
}) => {
  const geometry = GEOMETRY[variant];

  return (
    <svg
      {...placement}
      className={className}
      viewBox="0 0 148 148"
      aria-hidden="true"
    >
      <circle
        cx="74"
        cy="74"
        r="73"
        fill="#ffffff"
        stroke="#ede9fe"
        strokeWidth={geometry.discStroke}
      />
      {ARCS.map(({ color, rotation }) => (
        <circle
          key={color}
          cx="74"
          cy="74"
          r="66"
          fill="none"
          stroke={color}
          strokeWidth={geometry.arcWidth}
          strokeLinecap="round"
          strokeDasharray="76 338.69"
          transform={`rotate(${rotation} 74 74)`}
        />
      ))}
      <circle
        cx="74"
        cy="74"
        r="58"
        fill="none"
        stroke="#c4b5fd"
        strokeWidth={geometry.tickWidth}
        strokeDasharray={geometry.tickDash}
      />
      <path
        d="M74 28 80 68 120 74 80 80 74 120 68 80 28 74 68 68Z"
        fill={geometry.starFill}
      />
      <g
        className={`${needle} ${needleClassName ?? ''}`.trim()}
        style={needleStyle}
      >
        <path d={geometry.northNeedle} fill={needleColor} />
        <path d={geometry.southNeedle} fill="#ddd6fe" />
      </g>
      <circle
        cx="74"
        cy="74"
        r={geometry.pinRadius}
        fill="#ffffff"
        stroke={needleColor}
        strokeWidth={geometry.pinStroke}
      />
    </svg>
  );
};

export default CompassDial;
