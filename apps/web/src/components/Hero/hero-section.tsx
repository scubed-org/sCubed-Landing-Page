import Image from 'next/image';
import React from 'react';

import heroImg from '../../images/Image.jpg';
import { InnerContainerStyle } from '../Container/style.css';
import CalendlyButton from '../Features/CalendlyButton';
import { primaryButtonLight } from '../HomeHero/style.css';

import {
  heroHeading,
  heroImage,
  heroStyles,
  textBlockStyles,
} from './style.css';


const Hero: React.FC = () => {
  return (
    <main className={heroStyles}>
      <Image
        className={heroImage}
        src={heroImg}
        alt="banner"
        placeholder="blur"
        priority
        quality={75}
      />
      <div className={InnerContainerStyle}>
        <div className={textBlockStyles}>
          <p className={heroHeading}>
            Ready to scale your business with our easy-to-use clinical and
            practice management platform?
          </p>
          <div style={{ textAlign: 'center' }}>
            <CalendlyButton
              className={primaryButtonLight}
              buttonText="Book a 20-Minute Demo"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
