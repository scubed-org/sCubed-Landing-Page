'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import bgImage from '../../images/Banner.jpg';
import CalendlyButton from '../features/CalendlyButton';
import VideoModal from '../features/VideoModal';

import {
  backgroundImage,
  buttonContainer,
  heroContainer,
  heroContent,
  heroSection,
  heroSubtitle,
  heroTitle,
  playIcon,
  primaryButton,
  secondaryButton,
  supportingText,
} from './style.css';

const HomeHero: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleWatchDemo = () => {
    setVideoUrl('https://www.youtube.com/watch?v=XpLFdVnEins');
    setIsVideoModalOpen(true);
  };

  return (
    <>
      <section className={heroSection}>
        {/* Background Image */}
        <div className={backgroundImage}>
          <Image
            src={bgImage}
            alt="S Cubed Practice Management"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 1,
            }}
            placeholder="blur"
            priority
          />
        </div>

        <div className={heroContainer}>
          <div className={heroContent}>
            <h1 className={heroTitle}>
              All-in-One ABA Platform
              <br />
              <span style={{ color: '#7a7eed' }}>Built by BCBAs</span>
              <br />
              To Get Your Clinic Running Fast
            </h1>

            <p className={heroSubtitle}>
              Simplify clinic management, streamline therapy, and see results
              faster.
            </p>

            <div className={buttonContainer}>
              <CalendlyButton
                className={primaryButton}
                buttonText="Book a 20-Minute Demo"
              />
              <button className={secondaryButton} onClick={handleWatchDemo}>
                <Play className={playIcon} size={16} />
                Watch Demo
              </button>
            </div>

            <p className={supportingText}>
              Designed by clinicians for clinics, S Cubed makes migrating from
              other systems easy and helps your team deliver quality care from
              day one.
            </p>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default HomeHero;
