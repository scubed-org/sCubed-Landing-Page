'use client';

import React, { useEffect, useState } from 'react';

import Navigation from '../../Navigation';

import { headerWrapperStyles, pageStyles } from './styles.css';

const HeaderSimple: React.FC = () => {
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={pageStyles}>
      <div
        className={headerWrapperStyles}
        style={{
          backgroundColor: '#fff',
          borderBottom: headerBackground
            ? '1px solid #ededef'
            : '1px solid transparent',
        }}
      >
        <Navigation />
      </div>
    </main>
  );
};

export default HeaderSimple;
