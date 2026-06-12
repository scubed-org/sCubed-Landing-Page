'use client';

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import desktopLogoImg from '../../images/scubed-logo.webp';
import mobileLogoImg from '../../images/scubed-logo-small.png';
import { formatPhone } from '../../utils/phoneFormatter';
import CalendlyButton from '../Features/CalendlyButton';

import MobileNavDropdown from './MobileNavDropdown';
import NavDropdown, { DropdownItem } from './NavDropdown';
import {
  activeLinkStyle,
  bar,
  centerText,
  closeButtonWrapper,
  contactInfoContainer,
  contactInfoDivider,
  contactInfoGroup,
  contactInfoItem,
  contactInfoLink,
  contactInfoWrapper,
  crossLine1,
  crossLine2,
  desktopLogo,
  desktopLogoImage,
  hamburger,
  headerContentStyles,
  iconWrapper,
  loginButton,
  logoOuter,
  mobileActiveNavStyle,
  mobileHeaderWrapper,
  mobileHeaderWrapperOpen,
  mobileLogo,
  mobileOverlay,
  mobileOverlayOpen,
  navCenter,
  navMenu,
  navMenuOpen,
  navStyle,
  socialIconWrapper,
  socialIconsContainer,
  tryForFreeButton,
  tryForFreeLink,
} from './styles.css';

import { useFreeTrialModal } from '@/contexts/FreeTrialModalContext';

interface NavigationProps {
  menuItemColor?: string;
  activeMenuItemColor?: string;
  activeLinkAccentColor?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  menuItemColor = '#474747',
  activeMenuItemColor = '#000',
  activeLinkAccentColor = '#7a7eed',
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useFreeTrialModal();

  // Get environment variables for contact information
  const rawPhone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const phoneNumber = rawPhone ? formatPhone(rawPhone) : '';
  const phoneLink = rawPhone || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  // Get environment variables for social media links
  const fbUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '';
  const instaUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '';
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || '';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || '';

  useEffect(() => {
    if (menuOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('top');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('top');
    };
  }, [menuOpen]);

  // Close menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const featuresDropdownItems: DropdownItem[] = [
    { label: 'Practice Management', href: '/aba-practice-management-software' },
    {
      label: 'Scheduling & Appointments',
      href: '/scheduling-and-appointments',
    },
    {
      label: 'Data Collection',
      href: '/aba-data-collection-software',
    },
    { label: 'Guardian Portal', href: '/guardian-portal' },

    { label: 'ABA Authorization Software', href: '/aba-authorization-software' },
    { label: 'Telehealth', href: '/telehealth-platform' },
  ];

  const resourcesDropdownItems: DropdownItem[] = [
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'FAQs', href: '/faqs' },
  ];

  return (
    <>
      {/* Mobile overlay background */}
      <div
        className={`${mobileOverlay} ${menuOpen ? mobileOverlayOpen : ''}`}
      />

      {/* Contact info bar - hide on mobile when menu is open */}
      <div
        className={contactInfoContainer}
        style={{ display: menuOpen ? 'none' : undefined }}
      >
        <div className={contactInfoWrapper}>
          {/* Left: Phone and Email */}
          <div className={contactInfoGroup}>
            {phoneLink && (
              <div className={contactInfoItem}>
                <div className={iconWrapper} title="Call us">
                  <Phone size={16} />
                </div>
                <a href={`tel:+1${phoneLink}`} className={contactInfoLink}>
                  {phoneNumber}
                </a>
              </div>
            )}
            {email && (
              <>
                <div className={contactInfoDivider}></div>
                <div className={contactInfoItem}>
                  <div className={iconWrapper} title="Email us">
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:${email}`} className={contactInfoLink}>
                    {email}
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Center: Tagline */}
          <div className={centerText}>
            Crafted by a team of expert BCBAs, in collaboration with ST, OT, PT,
            and Billing professionals
          </div>

          {/* Right: Social Icons */}
          <div className={socialIconsContainer}>
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
              </svg>
            </a>
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile header wrapper - moves to top when menu is open */}
      <div
        className={`${mobileHeaderWrapper} ${menuOpen ? mobileHeaderWrapperOpen : ''}`}
      >
        <div className={headerContentStyles}>
          <div
            className={logoOuter}
            onClick={() => router.push('/')}
            onKeyDown={(e) => e.key === 'Enter' && router.push('/')}
            tabIndex={0}
            role="button"
            aria-label="Go to homepage"
          >
            <div className={desktopLogo}>
              <Image
                alt="S Cubed"
                src={desktopLogoImg}
                width={120}
                height={120}
                quality={100}
                className={desktopLogoImage}
              />
            </div>
            <div className={mobileLogo}>
              <Image
                alt="S Cubed"
                src={mobileLogoImg}
                quality={75}
                placeholder="blur"
                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
          <nav className={`${navMenu} ${menuOpen ? navMenuOpen : ''}`}>
            <div className={navCenter}>
            <Link
              href="/"
              className={`${navStyle} ${pathname === '/' ? mobileActiveNavStyle : ''}`}
              style={{
                color: pathname === '/' ? activeMenuItemColor : menuItemColor,
              }}
            >
              Home{' '}
              {pathname === '/' && (
                <span
                  className={activeLinkStyle}
                  style={{ backgroundColor: activeLinkAccentColor }}
                />
              )}
            </Link>

            <Link
              href="/billing"
              className={`${navStyle} ${pathname === '/billing' || pathname === '/billing/' ? mobileActiveNavStyle : ''}`}
              style={{
                color:
                  pathname === '/billing' || pathname === '/billing/'
                    ? activeMenuItemColor
                    : menuItemColor,
              }}
            >
              Billing{' '}
              {(pathname === '/billing' || pathname === '/billing/') && (
                <span
                  className={activeLinkStyle}
                  style={{ backgroundColor: activeLinkAccentColor }}
                />
              )}
            </Link>

            <NavDropdown
              label="Features"
              items={featuresDropdownItems}
              menuItemColor={menuItemColor}
              activeMenuItemColor={activeMenuItemColor}
              activeLinkAccentColor={activeLinkAccentColor}
            />

            <MobileNavDropdown
              label="Features"
              items={featuresDropdownItems}
              menuItemColor={menuItemColor}
              activeMenuItemColor={activeMenuItemColor}
              activeLinkAccentColor={activeLinkAccentColor}
            />

            <NavDropdown
              label="Resources"
              items={resourcesDropdownItems}
              menuItemColor={menuItemColor}
              activeMenuItemColor={activeMenuItemColor}
              activeLinkAccentColor={activeLinkAccentColor}
            />

            <MobileNavDropdown
              label="Resources"
              items={resourcesDropdownItems}
              menuItemColor={menuItemColor}
              activeMenuItemColor={activeMenuItemColor}
              activeLinkAccentColor={activeLinkAccentColor}
            />

            <Link
              href="/pricing"
              className={`${navStyle} ${pathname === '/pricing' || pathname === '/pricing/' ? mobileActiveNavStyle : ''}`}
              style={{
                color:
                  pathname === '/pricing' || pathname === '/pricing/'
                    ? activeMenuItemColor
                    : menuItemColor,
              }}
            >
              Pricing{' '}
              {(pathname === '/pricing' || pathname === '/pricing/') && (
                <span
                  className={activeLinkStyle}
                  style={{ backgroundColor: activeLinkAccentColor }}
                />
              )}
            </Link>

            <Link
              href="/our-team"
              className={`${navStyle} ${pathname === '/our-team' || pathname === '/our-team/' ? mobileActiveNavStyle : ''}`}
              style={{
                color:
                  pathname === '/our-team' || pathname === '/our-team/'
                    ? activeMenuItemColor
                    : menuItemColor,
              }}
            >
              Our Team
              {(pathname === '/our-team' || pathname === '/our-team/') && (
                <span
                  className={activeLinkStyle}
                  style={{ backgroundColor: activeLinkAccentColor }}
                />
              )}
            </Link>
            <Link
              href="/get-started"
              className={`${navStyle} ${pathname === '/get-started' || pathname === '/get-started/' ? mobileActiveNavStyle : ''}`}
              style={{
                color:
                  pathname === '/get-started' || pathname === '/get-started/'
                    ? activeMenuItemColor
                    : menuItemColor,
              }}
            >
              Get Started
              {(pathname === '/get-started' ||
                pathname === '/get-started/') && (
                <span
                  className={activeLinkStyle}
                  style={{ backgroundColor: activeLinkAccentColor }}
                />
              )}
            </Link>
            <button
              className={loginButton}
              onClick={() =>
                window.location.assign(
                  process.env.NEXT_PUBLIC_ADMIN_APP_URL + `auth/login`,
                )
              }
            >
              Login
            </button>
            <button
              className={tryForFreeLink}
              onClick={() => router.push('/subscribe?plan=free')}
            >
              Try for Free
            </button>
            </div>
            <CalendlyButton
              className={tryForFreeButton}
              buttonText="Book a 20-Minute Demo"
            />
          </nav>
          {!menuOpen ? (
            <div
              className={hamburger}
              onClick={toggleMenu}
              onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
              tabIndex={0}
              role="button"
              aria-label="Open menu"
            >
              {[...Array(3)].map((_, index) => (
                <div key={index} className={bar}></div>
              ))}
            </div>
          ) : (
            <div
              className={closeButtonWrapper}
              onClick={toggleMenu}
              onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
              tabIndex={0}
              role="button"
              aria-label="Close menu"
            >
              <div className={crossLine1}>
                <div className={crossLine2}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
