'use client';

import { ExternalLink, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import bacbaImage from '../../images/BACBA.jpg';
import capterraLogo from '../../images/Capterra.png';
import g2Logo from '../../images/G2.png';
import getAppLogo from '../../images/GetApp.png';
import logoImage from '../../images/scubed-logo.webp';
import hipaaImage from '../../images/HIPAA.png';
import softwareAdviceLogo from '../../images/SoftwareAdvice.png';
import { formatPhone } from '../../utils/phoneFormatter';
import NewsletterForm from '../NewsletterForm';
import StoreBadges from '../StoreBadges';

import {
  appBadges,
  appGroups,
  badgeGroup,
  bottomSection,
  brandDescription,
  brandSection,
  certificationImage,
  columnTitle,
  contactInfo,
  contactItem,
  copyrightText,
  footerColumn,
  footerContainer,
  footerContent,
  footerLink,
  footerWrapper,
  hipaaLogo,
  iconStyle,
  legalLink,
  legalLinks,
  linksRow,
  logosRow,
  logoWrapper,
  newsletterRow,
  reviewPlatformLink,
  reviewPlatformLogo,
  reviewPlatformsGrid,
  reviewPlatformsSection,
  reviewPlatformsSectionTitle,
  rightColumn,
} from './styles.css';

interface ReviewPlatform {
  name: string;
  url: string;
  logo: any;
  height: number;
}

interface MobileApp {
  title: string;
  name: string;
  appStoreUrl: string;
  googlePlayUrl: string;
}

const mobileApps: MobileApp[] = [
  {
    title: 'Download Staff App',
    name: 'S Cubed Staff Portal',
    appStoreUrl: 'https://apps.apple.com/us/app/s-cubed-staff-portal/id6670171821',
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=com.spectrum.solutions.scubed.admin',
  },
  {
    title: 'Download Guardian App',
    name: 'S Cubed Guardian Portal',
    appStoreUrl: 'https://apps.apple.com/us/app/s-cubed-guardian-portal/id6670190478',
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=com.spectrum.solutions.scubed.guardian',
  },
];

const reviewPlatforms: ReviewPlatform[] = [
  {
    name: 'Capterra',
    url: 'https://www.capterra.com/p/10030734/S-Cubed/#reviews',
    logo: capterraLogo,
    height: 45,
  },
  {
    name: 'Software Advice',
    url: 'https://www.softwareadvice.com/product/529516-S-Cubed/',
    logo: softwareAdviceLogo,
    height: 45,
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/healthcare-pharmaceuticals-software/a/s-cubed/',
    logo: getAppLogo,
    height: 45,
  },
  {
    name: 'G2',
    url: 'https://www.g2.com/products/s-cubed/reviews',
    logo: g2Logo,
    height: 45,
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  // Get environment variables for contact information
  const rawPhone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const phoneNumber = rawPhone ? formatPhone(rawPhone) : '';
  const phoneLink = rawPhone ? `tel:${rawPhone}` : '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <footer className={footerWrapper}>
      <div className={footerContainer}>
        {/* Main Footer Content - Two Column Layout */}
        <div className={footerContent}>
          {/* Column 1: Brand Section */}
          <div className={brandSection}>
            <div className={logosRow}>
              <div className={logoWrapper} onClick={handleLogoClick}>
                <Image
                  src={logoImage}
                  alt="S Cubed"
                  placeholder="blur"
                  quality={75}
                  style={{ width: 'auto', height: '95px' }}
                />
              </div>
              <Image
                src={hipaaImage}
                alt="HIPAA Compliant"
                className={hipaaLogo}
                quality={75}
              />
              <Image
                src={bacbaImage}
                alt="BACBA Certification"
                className={certificationImage}
                placeholder="blur"
                quality={75}
              />
            </div>
            <p className={brandDescription}>
              S Cubed strives to leave a positive impact on every child who needs
              help by ensuring our advanced clinical and practice management
              solutions are nothing short of the best for our practitioners.
              <br />
              S Cubed, or Spectrum Solutions Software, aims to revolutionize the effectiveness of therapy practices and improve client care.
            </p>
          </div>

          {/* Column 2: Newsletter + Footer Links */}
          <div className={rightColumn}>
            {/* Row 1: Newsletter Section */}
            <div className={newsletterRow}>
              <NewsletterForm />
            </div>
            
            {/* Row 2: Company, Resources, Contact */}
            <div className={linksRow}>
              {/* Company */}
              <div className={footerColumn}>
                <h4 className={columnTitle}>Company</h4>
                <Link href="/" className={footerLink}>
                  Home
                </Link>
                <Link href="/billing" className={footerLink}>
                  Billing
                </Link>
                <Link href="/aba-practice-management-software" className={footerLink}>
                Practice Management
                </Link>
                
                <Link href="/guardian-portal" className={footerLink}>
                  Guardian Portal
                </Link>
              </div>

              {/* Resources */}
              <div className={footerColumn}>
                <h4 className={columnTitle}>Resources</h4>
                <a
                  href={process.env.NEXT_PUBLIC_GUARDIAN_APP_URL + `auth/login`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  Guardian Portal Login <ExternalLink className={iconStyle} style={{ display: 'inline-block', width: '14px', height: '14px', marginLeft: '4px' }} />
                </a>
                <Link href="/blog" className={footerLink}>
                  Blog
                </Link>
                <Link href="/events" className={footerLink}>
                  Events & News
                </Link>
                <Link href="/faqs" className={footerLink}>
                  FAQs
                </Link>
              </div>

              {/* Contact */}
              <div className={footerColumn}>
                <h4 className={columnTitle}>Contact</h4>
                <div className={contactInfo}>
                  {phoneNumber && (
                    <a href={phoneLink} className={contactItem}>
                      <Phone className={iconStyle} />
                      {phoneNumber}
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className={contactItem}>
                      <Mail className={iconStyle} />
                      {email}
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Review Platforms + Mobile Apps Section */}
        <div className={reviewPlatformsSection}>
          <div className={badgeGroup}>
            <h3 className={reviewPlatformsSectionTitle}>
              Recognized On Top Review Platforms
            </h3>
            <div className={reviewPlatformsGrid}>
              {reviewPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={reviewPlatformLink}
                  aria-label={`View ${platform.name} reviews`}
                >
                  <Image
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    height={platform.height}
                    className={reviewPlatformLogo}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className={appGroups}>
            {mobileApps.map((app) => (
              <div key={app.title} className={badgeGroup}>
                <h3 className={reviewPlatformsSectionTitle}>{app.title}</h3>
                <StoreBadges
                  appName={app.name}
                  appStoreUrl={app.appStoreUrl}
                  googlePlayUrl={app.googlePlayUrl}
                  size="small"
                  className={appBadges}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={bottomSection}>
          <span className={copyrightText}>
            © {currentYear} S Cubed. All rights reserved.
          </span>
          <div className={legalLinks}>
            <Link href="/terms-conditions" className={legalLink}>
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className={legalLink}>
              Privacy Policy
            </Link>
            <Link href="/sitemap" className={legalLink}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;