'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import treatment from '../../images/Customized Treatment Plans.png';
import collection from '../../images/Data Collection & Reporting.png';
import guardian from '../../images/Easy-to-use Guardian Portal.png';
import appointment from '../../images/Efficient Appointment Scheduling.png';
import appointmentPanel from '../../images/tabs/appointment.png';
import dashboardPanel from '../../images/tabs/dashboard.jpg';
import collectionPanel from '../../images/tabs/data-collection.png';
import treatmentPanel from '../../images/tabs/treatment-plan.png';
import CalendlyButton from '../features/CalendlyButton';
import { primaryButton } from '../HomeHero/style.css';
import {
  InnerContainerStyle,
  panelContent,
  sectionHeading,
  tabPanel,
} from '../Container/style.css';

import {
  ctaWrapper,
  hidePanel,
  panelHeading,
  sectionDescription,
  tab,
  tabData,
  tabDataHeading,
  tabPanelImage,
  tabsList,
} from './styles.css';
const tabBox: React.CSSProperties = { marginTop: '80px' };

const tabContents = [
  {
    heading: 'Therapy Appointment Scheduling, Simplified',
    description: (
      <>
        Optimize your practice with{' '}
        <Link href="/scheduling-and-appointments">
          therapy appointment scheduling software
        </Link>{' '}
        that keeps everything organized and efficient. Our powerful calendar system functions as intuitive ABA scheduling software, helping you streamline operations across clinics and school-based settings with automated reminders that reduce no-shows and keep schedules running smoothly.
      </>
    ),
    image: appointment,
    alt: 'appointment',
    panel: appointmentPanel,
  },
  {
    heading: 'Customized Treatment Plans',
    description:
      'Create personalized treatment plans for each patient with our versatile tools. Tailor therapies and monitor progress efficiently.',
    image: treatment,
    alt: 'treatment',
    panel: treatmentPanel,
  },
  {
    heading: 'ABA Data Collection Software & Reporting Made Simple',
    description: (
      <>
        Gather, analyze, and report critical data with ease. Our <Link href="/aba-data-collection-software">ABA data collection software</Link> and ABA data collection systems provide accurate, comprehensive insights - helping you make informed decisions that improve outcomes.
      </>
    ),
    image: collection,
    alt: 'collection',
    panel: collectionPanel,
  },
  {
    heading: 'Easy-to-use Guardian Portal',
    description:
      'Provide guardians with an intuitive portal to access updates, view information, and communicate with the clinic effortlessly. As part of our comprehensive clinical management solutions, this feature strengthens transparency and keeps families engaged in the care process.',
    image: guardian,
    alt: 'guardian',
    panel: dashboardPanel,
  },
];

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  return (
    <div className={InnerContainerStyle}>
      <div style={tabBox}>
        <h2 className={sectionHeading}>Our Core Capabilities</h2>
        <div className={tabsList}>
          {tabContents.map((content, index) => (
            <div
              key={content.heading}
              className={tab}
              onClick={() => setActiveTab(index)}
              style={{
                cursor: 'pointer',
                borderBottom:
                  screenWidth > 768 && activeTab === index
                    ? '4px solid #7a7eed'
                    : screenWidth > 768
                    ? '4px solid transparent'
                    : 'none',
                backgroundColor:
                  activeTab === index
                    ? 'rgba(122, 126, 237, 0.1)'
                    : 'transparent',
                borderRadius: screenWidth <= 768 ? '8px' : '0',
                boxShadow:
                  screenWidth <= 768 && activeTab === index
                    ? '0 2px 8px rgba(122, 126, 237, 0.2)'
                    : 'none',
              }}
            >
              <Image
                src={content.image}
                alt={content.alt}
                sizes="(min-width: 1200px) 240px, 33vw"
                style={{
                  maxWidth: screenWidth <= 768 ? '60px' : '100%',
                  height: 'auto',
                }}
              />
              <div className={tabData}>
                <h3 className={tabDataHeading}>{content.heading}</h3>
              </div>
            </div>
          ))}
        </div>
        {/* Display content panel for all screen sizes */}
        {tabContents.map((content, index) => (
          <div
            key={content.heading}
            className={activeTab === index ? tabPanel : hidePanel}
          >
            <Image
              className={tabPanelImage}
              src={content.panel}
              alt={content.alt}
              sizes="(min-width: 1400px) 820px, (min-width: 768px) 60vw, 100vw"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              placeholder="blur"
              priority
            />
            <div className={panelContent}>
              <div className={panelHeading}>{content.heading}</div>
              <div className={sectionDescription}>{content.description}</div>
              <div className={ctaWrapper}>
                <CalendlyButton
                  className={primaryButton}
                  buttonText="Book a 20-Minute Demo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
