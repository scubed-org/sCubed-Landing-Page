'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo, useCallback } from 'react';

import {
  heroSliderSection,
  heroSliderContainer,
  heroSliderContent,
  heroSliderContentSplit,
  heroSliderContentGradient,
  heroSliderImageWrapper,
  heroSliderImage,
  heroSliderOverlay,
  heroSliderOverlayMobile,
  heroSliderTextContent,
  heroSliderTextContentNarrow,
  heroSliderTextContentNarrowMobile,
  heroSliderTextContentSplit,
  heroSliderTextContentGradient,
  heroSliderTitle,
  heroSliderDescription,
  heroSliderDescriptionVisible,
  heroSliderButton,
  heroSliderSecondaryButton,
  heroSliderButtonContainer,
  heroSliderButtonContainerCentered,
  heroSliderNavigation,
  heroSliderPrevButton,
  heroSliderNextButton,
  heroSliderIndicators,
  heroSliderIndicator,
  heroSliderIndicatorActive,
  heroSliderEventInfo,
  heroSliderEventItem,
  heroSliderEventIcon,
  heroSliderSplitImageWrapper,
  heroSliderSplitImage,
  heroSliderGradientOverlay,
  heroSliderBackgroundWrapper,
} from './styles.css';

import { useFreeTrialModal } from '@/contexts/FreeTrialModalContext';
import { formatEventDate } from '@/lib/events-api';


export interface HeroSliderItem {
  id: string;
  title: string;
  mobileTitle?: string; // Optional mobile-specific title without line breaks
  description: string | React.ReactNode; // Allow JSX/HTML in description
  
  // Layout mode determines how the slide is displayed
  layoutMode?: 'split' | 'fullBackground' | 'gradient';
  
  // Full background image (covers entire slide, changes per slide)
  backgroundImage?: {
    src: string | StaticImageData;
    alt: string;
    mobileSrc?: string | StaticImageData;
    position?: string; // CSS object-position
    mobilePosition?: string;
  };
  
  // Split layout image (appears on right side in split mode)
  splitImage?: {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    mobileSrc?: string | StaticImageData;
  };
  
  // Gradient background (for slides without images)
  gradientBackground?: {
    colors: string[]; // Array of colors for gradient (e.g., ['#1a1a2e', '#16213e', '#0f3460'])
    direction?: string; // Gradient direction (e.g., '135deg', 'to right')
  };
  
  // Legacy image support (kept for backward compatibility)
  image?: {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    mobileSrc?: string | StaticImageData;
    position?: string;
    mobilePosition?: string;
  };
  
  link?: {
    href: string;
    text: string;
    mobileText?: string;
    external?: boolean;
  };
  secondaryLink?: {
    href: string;
    text: string;
    mobileText?: string;
    external?: boolean;
  };
  contentAlign?: 'left' | 'center' | 'right';
  contentWidth?: string; // Optional content width (e.g., '50%', '600px', '100%')
  descriptionMaxWidth?: string; // Optional max-width for description on desktop (e.g., '500px', '80%')
  eventDate?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: string;
}

interface HeroImageSliderProps {
  items: HeroSliderItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { openModal } = useFreeTrialModal();

  // Memoize slide navigation functions to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, items.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, items.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, isTransitioning]);

  // Auto-play functionality - optimized with useCallback dependency
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, items.length, nextSlide]);

  // Mobile detection (includes iPad) - optimized with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 1024); // Include iPad (1024px and below)
        setIsSmallMobile(window.innerWidth <= 768); // Mobile phones (768px and below)
      }, 100); // Debounce resize events
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    if (items.length <= 1) return;

    const preloadAdjacentImages = () => {
      const nextIndex = (currentIndex + 1) % items.length;
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      
      [nextIndex, prevIndex].forEach(index => {
        const item = items[index];
        if (!imagesLoaded[index]) {
          // Get the image source to preload (background, split, or legacy image)
          const imageSource = item.backgroundImage?.src || item.splitImage?.src || item.image?.src;
          const mobileSource = item.backgroundImage?.mobileSrc || item.splitImage?.mobileSrc || item.image?.mobileSrc;
          
          if (!imageSource) {
            // No image to preload (gradient only slide)
            setImagesLoaded(prev => ({ ...prev, [index]: true }));
            return;
          }
          
          // For static imports, images are already optimized by Next.js
          if (typeof imageSource !== 'string') {
            setImagesLoaded(prev => ({ ...prev, [index]: true }));
          } else {
            // Only preload string URLs
            const img = new window.Image();
            const imageSrc = isMobile && mobileSource 
              ? mobileSource as string
              : imageSource as string;
            
            img.onload = () => {
              setImagesLoaded(prev => ({ ...prev, [index]: true }));
            };
            img.src = imageSrc;
          }
        }
      });
    };

    // Preload immediately for smoother transitions
    preloadAdjacentImages();
  }, [currentIndex, items, isMobile, imagesLoaded]);

  // Pause auto-play on hover - memoized for performance
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(autoPlay);
  }, [autoPlay]);

  // Touch/Swipe handlers
  const minSwipeDistance = 50; // Minimum distance in pixels for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
    // Pause autoplay when user starts swiping
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && items.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && items.length > 1) {
      prevSlide();
    }
    
    // Resume autoplay after swipe if it was originally enabled
    setTimeout(() => {
      setIsAutoPlaying(autoPlay);
    }, 1000);
  };

  const handleNavigationButtonClick = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
        | React.PointerEvent<HTMLButtonElement>,
      navigate: () => void
    ) => {
      event.stopPropagation();
      setIsAutoPlaying(false);
      navigate();
    },
    []
  );

  // Memoize computed values to prevent unnecessary recalculations
  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);
  
  // Determine layout mode - default to fullBackground for backward compatibility
  const layoutMode = useMemo(() => {
    if (currentItem?.layoutMode) return currentItem.layoutMode;
    if (currentItem?.splitImage) return 'split';
    if (currentItem?.gradientBackground) return 'gradient';
    return 'fullBackground';
  }, [currentItem]);
  
  // Get background image source (for fullBackground mode or as backdrop for split mode)
  const backgroundImageSrc = useMemo(() => {
    if (currentItem?.backgroundImage) {
      return isMobile && currentItem.backgroundImage.mobileSrc
        ? currentItem.backgroundImage.mobileSrc
        : currentItem.backgroundImage.src;
    }
    // Fallback to legacy image field
    if (currentItem?.image) {
      return isMobile && currentItem.image.mobileSrc
        ? currentItem.image.mobileSrc
        : currentItem.image.src;
    }
    return null;
  }, [isMobile, currentItem]);
  
  const backgroundImagePosition = useMemo(() => {
    if (currentItem?.backgroundImage) {
      return isMobile && currentItem.backgroundImage.mobilePosition
        ? currentItem.backgroundImage.mobilePosition
        : currentItem.backgroundImage.position || 'center';
    }
    if (currentItem?.image) {
      return isMobile && currentItem.image.mobilePosition
        ? currentItem.image.mobilePosition
        : currentItem.image.position || 'center';
    }
    return 'center';
  }, [isMobile, currentItem]);
  
  // Get split image source (for split layout mode)
  const splitImageSrc = useMemo(() => {
    if (currentItem?.splitImage) {
      return isMobile && currentItem.splitImage.mobileSrc
        ? currentItem.splitImage.mobileSrc
        : currentItem.splitImage.src;
    }
    return null;
  }, [isMobile, currentItem]);
  
  // Get gradient background style
  const gradientStyle = useMemo(() => {
    if (currentItem?.gradientBackground) {
      const { colors, direction = '135deg' } = currentItem.gradientBackground;
      return `linear-gradient(${direction}, ${colors.join(', ')})`;
    }
    return null;
  }, [currentItem]);
  
  // Legacy support
  const currentImageSrc = useMemo(() => 
    isMobile && currentItem?.image?.mobileSrc 
      ? currentItem.image.mobileSrc 
      : currentItem?.image?.src,
    [isMobile, currentItem]
  );
  
  const currentImagePosition = useMemo(() => 
    isMobile && currentItem?.image?.mobilePosition 
      ? currentItem.image.mobilePosition 
      : currentItem?.image?.position || 'center',
    [isMobile, currentItem]
  );
  
  const currentLinkText = useMemo(() => 
    isMobile && currentItem?.link?.mobileText 
      ? currentItem.link.mobileText 
      : currentItem?.link?.text,
    [isMobile, currentItem]
  );

  const formattedEventDate = useMemo(() => {
    if (currentItem?.eventStartDate && currentItem?.eventEndDate) {
      return formatEventDate(currentItem.eventStartDate, currentItem.eventEndDate);
    }
    return currentItem?.eventDate;
  }, [currentItem?.eventDate, currentItem?.eventStartDate, currentItem?.eventEndDate]);

  if (!items.length) return null;

  // Determine content class based on layout mode
  const getContentClassName = () => {
    let classes = heroSliderContent;
    if (layoutMode === 'split') {
      classes += ` ${heroSliderContentSplit}`;
    } else if (layoutMode === 'gradient') {
      classes += ` ${heroSliderContentGradient}`;
    }
    return classes;
  };

  // Determine text content class based on layout mode
  const getTextContentClassName = () => {
    let classes = heroSliderTextContent;
    if (layoutMode === 'split') {
      classes += ` ${heroSliderTextContentSplit}`;
    } else if (layoutMode === 'gradient') {
      classes += ` ${heroSliderTextContentGradient}`;
    }
    if (currentItem.contentWidth === '30%') {
      classes += ` ${heroSliderTextContentNarrow} ${heroSliderTextContentNarrowMobile}`;
    }
    return classes;
  };

  return (
    <header 
      className={`${heroSliderSection} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={heroSliderContainer}>
        <div 
          className={getContentClassName()}
          style={{
            // Only apply inline justifyContent for non-split layouts on desktop
            // Split layout handles its own justifyContent via CSS (center on mobile)
            ...(layoutMode !== 'split' && {
              justifyContent: layoutMode === 'gradient' ? 'center' :
                             currentItem.contentAlign === 'center' ? 'center' : 
                             currentItem.contentAlign === 'right' ? 'flex-end' : 'flex-start'
            })
          }}
        >
          {/* Background Image/Gradient Layer */}
          <AnimatePresence mode="wait">
            {layoutMode === 'gradient' && gradientStyle ? (
              <motion.div
                key={`gradient-${currentItem.id}`}
                className={heroSliderGradientOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: gradientStyle }}
              />
            ) : backgroundImageSrc ? (
              <motion.div
                key={`bg-${currentItem.id}`}
                className={heroSliderBackgroundWrapper}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: imagesLoaded[currentIndex] ? 1 : 0.8,
                  x: isDragging && touchStart && touchEnd ? (touchEnd - touchStart) * 0.2 : 0
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: isDragging ? 0 : 0.3,
                  type: isDragging ? 'tween' : 'spring',
                  ease: 'easeOut'
                }}
                style={{ cursor: items.length > 1 ? 'grab' : 'default' }}
              >
                <Image
                  src={backgroundImageSrc}
                  alt={currentItem.backgroundImage?.alt || currentItem.image?.alt || 'Hero background'}
                  width={1920}
                  height={800}
                  className={heroSliderImage}
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  quality={80}
                  placeholder={typeof backgroundImageSrc !== 'string' ? 'blur' : 'empty'}
                  sizes="100vw"
                  decoding="async"
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, [currentIndex]: true }))}
                  style={{ 
                    objectPosition: backgroundImagePosition,
                    filter: imagesLoaded[currentIndex] ? 'none' : 'blur(5px)',
                    transition: 'filter 0.3s ease-in-out',
                    objectFit: 'cover',
                  }}
                />
                <div className={heroSliderOverlay} />
                {currentItem.contentWidth === '30%' && (
                  <div className={heroSliderOverlayMobile} />
                )}
              </motion.div>
            ) : currentImageSrc ? (
              // Legacy image support
              <motion.div
                key={currentItem.id}
                className={heroSliderImageWrapper}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: imagesLoaded[currentIndex] ? 1 : 0.8,
                  x: isDragging && touchStart && touchEnd ? (touchEnd - touchStart) * 0.2 : 0
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: isDragging ? 0 : 0.3,
                  type: isDragging ? 'tween' : 'spring',
                  ease: 'easeOut'
                }}
                style={{ cursor: items.length > 1 ? 'grab' : 'default' }}
              >
                <Image
                  src={currentImageSrc}
                  alt={currentItem.image?.alt || 'Hero image'}
                  width={currentItem.image?.width || 1920}
                  height={currentItem.image?.height || 800}
                  className={heroSliderImage}
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  quality={80}
                  placeholder={typeof currentImageSrc !== 'string' ? 'blur' : 'empty'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  decoding="async"
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, [currentIndex]: true }))}
                  style={{ 
                    objectPosition: currentImagePosition,
                    filter: imagesLoaded[currentIndex] ? 'none' : 'blur(5px)',
                    transition: 'filter 0.3s ease-in-out',
                    objectFit: 'cover',
                  }}
                />
                <div className={heroSliderOverlay} />
                {currentItem.contentWidth === '30%' && (
                  <div className={heroSliderOverlayMobile} />
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Content Area */}
          <motion.div
            className={getTextContentClassName()}
            key={`content-${currentItem.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              textAlign: layoutMode === 'gradient' ? 'center' : (currentItem.contentAlign || 'left'),
              marginLeft: layoutMode === 'gradient' ? 'auto' :
                         currentItem.contentAlign === 'center' ? 'auto' : 
                         currentItem.contentAlign === 'right' ? 'auto' : undefined,
              marginRight: layoutMode === 'gradient' ? 'auto' :
                          currentItem.contentAlign === 'center' ? 'auto' : 
                          currentItem.contentAlign === 'right' ? undefined : undefined,
              ...(currentItem.contentWidth === '30%' && isSmallMobile && {
                textAlign: 'center',
              }),
            }}
          >
            <motion.h1
              className={heroSliderTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{
                __html: isMobile && currentItem.mobileTitle ? currentItem.mobileTitle : currentItem.title,
              }}
            />

            {/* Event Date and Location */}
            {(formattedEventDate || currentItem.eventLocation) && (
              <motion.div
                className={heroSliderEventInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{
                  ...(layoutMode === 'gradient' && {
                    alignItems: 'center',
                    justifyContent: 'center',
                  }),
                  ...(currentItem.contentWidth === '30%' && isSmallMobile && {
                    alignItems: 'center',
                  }),
                }}
              >
                {formattedEventDate && (
                  <div className={heroSliderEventItem}>
                    <Calendar size={20} className={heroSliderEventIcon} />
                    <span>{formattedEventDate}</span>
                  </div>
                )}
                {currentItem.eventLocation && (
                  <div className={heroSliderEventItem}>
                    <MapPin size={20} className={heroSliderEventIcon} />
                    <span>{currentItem.eventLocation}</span>
                  </div>
                )}
              </motion.div>
            )}
            
            <motion.div
              className={`${heroSliderDescription} ${layoutMode === 'gradient' ? heroSliderDescriptionVisible : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                ...(!currentItem.link && !currentItem.secondaryLink && {
                  marginBottom: 0,
                }),
                ...(currentItem.descriptionMaxWidth && !isMobile && {
                  maxWidth: currentItem.descriptionMaxWidth,
                }),
              }}
            >
              {typeof currentItem.description === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: currentItem.description }} />
              ) : (
                currentItem.description
              )}
            </motion.div>

            {(currentItem.link || currentItem.secondaryLink) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className={currentItem.secondaryLink ? 
                  (layoutMode === 'gradient' || currentItem.contentAlign === 'center' ? heroSliderButtonContainerCentered : heroSliderButtonContainer) 
                  : undefined}>
                  {currentItem.secondaryLink && (
                    currentItem.secondaryLink.external ? (
                      <a
                        href={currentItem.secondaryLink.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={heroSliderSecondaryButton}
                      >
                        {isMobile && currentItem.secondaryLink.mobileText
                          ? currentItem.secondaryLink.mobileText
                          : currentItem.secondaryLink.text}
                        <ExternalLink size={20} />
                      </a>
                    ) : (
                      <Link
                        href={currentItem.secondaryLink.href}
                        className={heroSliderSecondaryButton}
                      >
                        {isMobile && currentItem.secondaryLink.mobileText
                          ? currentItem.secondaryLink.mobileText
                          : currentItem.secondaryLink.text}
                      </Link>
                    )
                  )}
                  {currentItem.link && (
                    currentItem.link.external ? (
                      <a
                        href={currentItem.link.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={heroSliderButton}
                      >
                        {currentLinkText}
                        <ExternalLink size={20} />
                      </a>
                    ) : currentItem.link.href === '/get-started' ? (
                      <button
                        onClick={openModal}
                        className={heroSliderButton}
                      >
                        {currentLinkText}
                      </button>
                    ) : (
                      <Link href={currentItem.link.href} className={heroSliderButton}>
                        {currentLinkText}
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Split Layout - Right Side Image */}
          {layoutMode === 'split' && splitImageSrc && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`split-${currentItem.id}`}
                className={heroSliderSplitImageWrapper}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Image
                  src={splitImageSrc}
                  alt={currentItem.splitImage?.alt || 'Feature image'}
                  width={typeof splitImageSrc !== 'string' ? splitImageSrc.width : currentItem.splitImage?.width}
                  height={typeof splitImageSrc !== 'string' ? splitImageSrc.height : currentItem.splitImage?.height}
                  className={heroSliderSplitImage}
                  priority={currentIndex === 0}
                  quality={85}
                  placeholder={typeof splitImageSrc !== 'string' ? 'blur' : 'empty'}
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <div className={heroSliderNavigation}>
              <button
                className={heroSliderPrevButton}
                onClick={(event) => handleNavigationButtonClick(event, prevSlide)}
                onTouchEnd={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={heroSliderNextButton}
                onClick={(event) => handleNavigationButtonClick(event, nextSlide)}
                onTouchEnd={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Slide Indicators */}
          {items.length > 1 && (
            <div className={heroSliderIndicators}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  className={`${heroSliderIndicator} ${
                    index === currentIndex ? heroSliderIndicatorActive : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${item.title}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroImageSlider;
