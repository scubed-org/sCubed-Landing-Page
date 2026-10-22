import React from 'react';

import {
  badgeCaption,
  badgeIcon,
  badgeIconSmall,
  badgeLink,
  badgeLinkSmall,
  badgesRow,
  badgeStore,
  badgeStoreSmall,
  badgeText,
} from './styles.css';

interface StoreBadgesProps {
  appName: string;
  appStoreUrl: string;
  googlePlayUrl: string;
  size?: 'default' | 'small';
  className?: string;
}

const StoreBadges: React.FC<StoreBadgesProps> = ({
  appName,
  appStoreUrl,
  googlePlayUrl,
  size = 'default',
  className,
}) => {
  const isSmall = size === 'small';
  const linkClass = isSmall ? `${badgeLink} ${badgeLinkSmall}` : badgeLink;
  const iconClass = isSmall ? `${badgeIcon} ${badgeIconSmall}` : badgeIcon;
  const storeClass = isSmall ? `${badgeStore} ${badgeStoreSmall}` : badgeStore;

  return (
    <div className={`${badgesRow} ${className ?? ''}`}>
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`Download ${appName} on the App Store`}
      >
        <svg
          className={iconClass}
          viewBox="0 0 384 512"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <span className={badgeText}>
          <span className={badgeCaption}>Download on the</span>
          <span className={storeClass}>App Store</span>
        </span>
      </a>
      <a
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`Get ${appName} on Google Play`}
      >
        <svg className={iconClass} viewBox="0 0 512 512" aria-hidden="true">
          <path
            fill="#00d7fe"
            d="M47 16.6C37.6 21.7 32 31.9 32 44.6v422.8c0 12.7 5.6 22.9 15 28L281.6 256 47 16.6z"
          />
          <path
            fill="#ffce00"
            d="M359.3 334.4 281.6 256l77.7-78.4 92.8 52.8c26.5 15.1 26.5 39.8 0 54.9l-92.8 49.1z"
          />
          <path
            fill="#ff3a44"
            d="M359.3 334.4 281.6 256 47 495.4c8.7 4.7 20.1 4.3 32.6-2.8l279.7-158.2z"
          />
          <path
            fill="#00f076"
            d="M359.3 177.6 79.6 19.4C67.1 12.3 55.7 11.9 47 16.6L281.6 256l77.7-78.4z"
          />
        </svg>
        <span className={badgeText}>
          <span className={badgeCaption}>GET IT ON</span>
          <span className={storeClass}>Google Play</span>
        </span>
      </a>
    </div>
  );
};

export default StoreBadges;
