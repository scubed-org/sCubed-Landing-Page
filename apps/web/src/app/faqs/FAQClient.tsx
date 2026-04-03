'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import {
  answer,
  chevronIcon,
  contactLink,
  contactLinkWrapper,
  contactText,
  container,
  heroContainer,
  heroContent,
  heroDescription,
  heroSubtitle,
  heroTitle,
  heroTitleHighlight,
  qaContainer,
  qaItem,
  question,
  section,
  sectionExpanded,
  sectionHeader,
  sectionTitle,
  wrapper
} from './styles.css';

import { faqData } from '@/data/faq-data';


export default function FAQClient() {
  const [openSectionIndex, setOpenSectionIndex] = useState<number>(0); // First section open by default
  const sectionHeaderRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const preservePositionRef = useRef<{ index: number; top: number } | null>(null);

  const toggleSection = (index: number) => {
    if (openSectionIndex !== index) {
      const headerElement = sectionHeaderRefs.current[index];

      if (headerElement) {
        preservePositionRef.current = {
          index,
          top: headerElement.getBoundingClientRect().top
        };
      }
    } else {
      preservePositionRef.current = null;
    }

    setOpenSectionIndex(openSectionIndex === index ? -1 : index);
  };

  useLayoutEffect(() => {
    if (openSectionIndex < 0 || typeof window === 'undefined') {
      preservePositionRef.current = null;
      return undefined;
    }

    const pendingPosition = preservePositionRef.current;

    if (!pendingPosition || pendingPosition.index !== openSectionIndex) {
      return undefined;
    }

    const syncHeaderPosition = () => {
      const headerElement = sectionHeaderRefs.current[openSectionIndex];

      if (!headerElement) {
        return;
      }

      const currentTop = headerElement.getBoundingClientRect().top;
      const scrollDelta = currentTop - pendingPosition.top;

      if (Math.abs(scrollDelta) > 1) {
        window.scrollBy({
          top: scrollDelta,
          behavior: 'auto'
        });
      }
    };

    syncHeaderPosition();
    preservePositionRef.current = null;

    return () => {
      preservePositionRef.current = null;
    };
  }, [openSectionIndex]);

  // Animation variants for section content
  const sectionVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      transition: {
        height: {
          duration: 0
        },
        opacity: {
          duration: 0.15,
          ease: 'easeOut'
        }
      }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      overflow: 'hidden',
      transition: {
        height: {
          duration: 0
        },
        opacity: {
          duration: 0.2,
          ease: 'easeIn'
        }
      }
    }
  };

  // Chevron animation variants
  const chevronVariants: Variants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      rotate: 180,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <>
      
        <div className={heroContainer}>
          <div className={heroContent}>
            <h1 className={heroTitle}>
              Frequently Asked <span className={heroTitleHighlight}>Questions</span>
            </h1>
            <p className={heroSubtitle}>
              Everything you need to know about <span className={heroTitleHighlight} style={{ fontWeight: 600 }}>S Cubed</span> – from getting started to maximizing your practice efficiency
            </p>
            <p className={heroDescription}>
              Find quick answers to common questions about our ABA practice management software,
              or reach out to our support team for personalized assistance.
            </p>
          </div>
        </div>
      
      
      <div className={container}>
        <div className={wrapper}>
          {faqData.sections.map((sectionData, sectionIndex) => {
            const isOpen = openSectionIndex === sectionIndex;
            
            return (
              <div
                key={sectionData.name}
                className={`${section} ${isOpen ? sectionExpanded : ''}`}
              >
                <button
                  className={sectionHeader}
                  onClick={() => toggleSection(sectionIndex)}
                  aria-expanded={isOpen}
                  aria-controls={`section-${sectionIndex}`}
                  ref={(element) => {
                    sectionHeaderRefs.current[sectionIndex] = element;
                  }}
                >
                  <h2 className={sectionTitle}>{sectionData.name}</h2>
                  <motion.span
                    className={chevronIcon}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={chevronVariants}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`section-content-${sectionData.name}`}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={sectionVariants}
                      id={`section-${sectionIndex}`}
                      style={{ overflow: 'hidden' }}
                    >
                      <motion.div
                        className={qaContainer}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {sectionData.items.map((item) => (
                          <div key={item.question} className={qaItem}>
                            <h3 className={question}>{item.question}</h3>
                            <div className={answer}>
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ flexShrink: 0, marginRight: '12px', marginTop: '4px' }}
                              >
                                <path 
                                  d="M3 8H13M13 8L9 4M13 8L9 12" 
                                  stroke="#6B7280" 
                                  strokeWidth="1.5" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div>{item.answer}</div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          
          <div className={contactLinkWrapper}>
            <span className={contactText}>
              Didn't find your answer?{' '}
              <Link href="/get-started" className={contactLink}>
                Contact us
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
