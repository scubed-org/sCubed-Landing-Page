import Image from 'next/image';
import React from 'react';

import heroImg from '../../images/Image.jpg';
import CalendlyWidget from '../CalendlyWidget';
import { InnerContainerStyle } from '../Container/style.css';

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
          <CalendlyWidget
            buttonColor="#000"
            buttonBackground="#fff"
            buttonText="BOOK A FREE DEMO"
            buttonWidth="210px"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
