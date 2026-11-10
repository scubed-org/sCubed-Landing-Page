'use client';

import { motion, useInView, Variants } from 'framer-motion';
import {
  Building2,
  Lightbulb,
  Lock,
  RefreshCw,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useCallback, useEffect } from 'react';

import jaceImg from '../../images/Jace.jpg';
import stephanieImg from '../../images/Stephanie.jpg';
import uroosaImg from '../../images/Uroosa.jpg';

import * as styles from './styles.css';

const WORD_LIMIT = 40;

const truncateText = (text: string, wordLimit: number): { truncated: string; isTruncated: boolean } => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= wordLimit) {
    return { truncated: text, isTruncated: false };
  }
  return { truncated: words.slice(0, wordLimit).join(' ') + '...', isTruncated: true };
};

const MOBILE_BREAKPOINT = 768;

const OurTeam = () => {
  const router = useRouter();
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleBio = useCallback((memberName: string) => {
    setExpandedBios((prev) => ({
      ...prev,
      [memberName]: !prev[memberName],
    }));
  }, []);

  // Refs for scroll-triggered animations
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Check if sections are in view
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isMissionInView = useInView(missionRef, {
    once: true,
    margin: '-100px',
  });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const isWhyChooseInView = useInView(whyChooseRef, {
    once: true,
    margin: '-100px',
  });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const teamCardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const teamMembers = [
    {
      name: 'Stephanie Emmons',
      title: 'M.Ed., LBA, BCBA – CEO & President',
      image: stephanieImg,
      bio: "Stephanie is a dedicated leader and Board Certified Behavior Analyst (BCBA) with a passion for building innovative and compassionate services for individuals and families. With a Master's degree in Education and extensive experience in applied behavior analysis, she has spent her career driving meaningful change in the field. As CEO and President, Stephanie combines clinical expertise with visionary leadership, ensuring that the organization delivers high-quality care while fostering a culture of growth and collaboration. Guided by both professional dedication and personal commitment, she continues to shape programs that empower families and create lasting impact.",
    },
    {
      name: 'Jace Thomas',
      title: 'Head of Growth and Technology',
      image: jaceImg,
      bio: 'Jace leads growth at S Cubed. He built the AI-powered system behind how S Cubed finds and supports new clinics, and he shaped the sales, demo and onboarding experience alongside the team. He works closely with Stephanie, the team and our partners to keep the company growing and to make sure every clinic feels supported from the first conversation on.',
    },
    {
      name: 'Uroosa Ahmed',
      title: 'Clinical Engagement and Customer Experience Manager',
      image: uroosaImg,
      bio: 'Uroosa holds a Master’s degree in Applied Behavior Analysis and has a background in clinical practice, behavioral health, and healthcare technology. With experience as a Registered Behavior Technician and in client support, she brings an understanding of the challenges providers face and the importance of having the right tools and resources. She is passionate about supporting the ABA community, improving everyday workflows, and helping make technology more accessible and useful for practitioners and families.',
    },
  ];

  const missionPoints = [
    {
      icon: Lightbulb,
      title: 'What Keeps Us Going',
      content:
        "We didn't want to build a software, we wanted to reshape how care gets delivered.",
    },
    {
      icon: Rocket,
      title: 'What Moved Us To Start',
      content:
        'We know the work is heavy, so we give you tools to find space and focus on your practice.',
    },
    {
      icon: Target,
      title: 'What We Set Out To Do',
      content:
        'We don\'t want to innovate anything, we\'re here to take the "real weight" off your shoulders.',
    },
    {
      icon: RefreshCw,
      title: 'How We Turn Listing Into Action',
      content:
        'S Cubed is built by considering the real therapists and listening to their real needs so they can focus better on care.',
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: Building2,
      title: 'One Platform For All',
      content:
        'Most clinics struggle with different systems for different needs while S Cubed provides you with one clean, connected platform.',
    },
    {
      icon: Lock,
      title: 'Truly HIPAA-Compliant',
      content:
        'S Cubed is built with HIPAA Compliance which means you are care-free about your data and we make sure your data is encrypted, it has role-based access and secure cloud hosting.',
    },
    {
      icon: Users,
      title: 'Made With Providers, For Providers',
      content:
        'This platform is not built just to make it work, it is made to support after having a real talk with ABA therapists, BCBAs, OTs, PTs, and counselors.',
    },
    {
      icon: TrendingUp,
      title: 'Grows With You',
      content:
        'S Cubed is made to adapt to your requirements, whether you are a solo practitioner, a multi-location clinic or an educational institute, our platform will grow with you.',
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate={isHeroInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        <motion.div className={styles.heroContent} variants={staggerContainer}>
          <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
            Our <span style={{ color: '#ffffff' }}>Story</span>
          </motion.h1>
          <motion.p className={styles.heroText} variants={fadeInUp}>
            We didn't come up with S Cubed as a business plan. We started it
            because we came across too many educators and therapists struggling
            with tools that didn't make their job any easier. When we saw that
            care was slipping through the cracks of systems and brilliant
            professionals were buried in admin, we knew we could bridge this
            gap.
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section
        ref={missionRef}
        className={styles.sectionAlt}
        initial="hidden"
        animate={isMissionInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Our Mission and <span style={{ color: '#7a7eed' }}>Goal</span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            Driven by purpose, guided by experience, committed to your success
          </motion.p>
          <motion.div className={styles.grid} variants={staggerContainer}>
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.cardContent}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <point.icon
                      size={24}
                      style={{ color: '#7a7eed', flexShrink: 0 }}
                    />
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                      {point.title}
                    </h3>
                  </div>
                  <p className={styles.cardText}>{point.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={teamRef}
        className={styles.section}
        initial="hidden"
        animate={isTeamInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Meet Our <span style={{ color: '#7a7eed' }}>Expert Team</span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            Passionate professionals dedicated to transforming healthcare
            delivery
          </motion.p>
          <motion.div className={styles.teamGrid} variants={staggerContainer}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.teamCard}
                variants={teamCardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.teamCardLayout}>
                  <div className={styles.teamCardHeader}>
                    <motion.div
                      className={styles.teamImageWrapper}
                      whileHover={{ rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.title}`}
                        className={styles.teamImage}
                        width={160}
                        height={160}
                        placeholder="blur"
                      />
                    </motion.div>
                    <div className={styles.teamInfo}>
                      <h3 className={styles.teamName}>{member.name}</h3>
                      <p className={styles.teamTitle}>{member.title}</p>
                    </div>
                  </div>
                  <div className={styles.teamBio}>
                    {(() => {
                      if (!isMobile) {
                        return <p>{member.bio}</p>;
                      }
                      
                      const { truncated, isTruncated } = truncateText(member.bio, WORD_LIMIT);
                      const isExpanded = expandedBios[member.name];
                      
                      return (
                        <p>
                          {isExpanded || !isTruncated ? member.bio : truncated}
                          {isTruncated && (
                            <button
                              className={styles.readMoreButton}
                              onClick={() => toggleBio(member.name)}
                              type="button"
                            >
                              {isExpanded ? 'Read less' : 'Read more'}
                            </button>
                          )}
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={whyChooseRef}
        className={styles.sectionAlt}
        initial="hidden"
        animate={isWhyChooseInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Why Therapists{' '}
            <span style={{ color: '#7a7eed' }}>
              Choose <div style={{ display: 'inline-block' }}>S Cubed</div>
            </span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            The platform that grows with you, supports you, and never slows you
            down
          </motion.p>
          <motion.div className={styles.grid} variants={staggerContainer}>
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  backgroundColor: 'rgba(122, 126, 237, 0.05)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.cardContent}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <point.icon
                      size={24}
                      style={{ color: '#7a7eed', flexShrink: 0 }}
                    />
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                      {point.title}
                    </h3>
                  </div>
                  <p className={styles.cardText}>{point.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={ctaRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={isCtaInView ? 'visible' : 'hidden'}
      >
        <motion.div className={styles.ctaContent} variants={scaleIn}>
          <motion.h2 className={styles.ctaTitle} variants={fadeInUp}>
            Ready to{' '}
            <span
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textDecorationThickness: '3px',
                textUnderlineOffset: '5px',
              }}
            >
              Transform
            </span>{' '}
            Your Practice?
          </motion.h2>
          <motion.p className={styles.ctaText} variants={fadeInUp}>
            Join thousands of healthcare professionals who trust S Cubed to
            streamline their operations and focus on what matters most -
            providing exceptional care.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => router.push('/get-started')}
            >
              <span
                style={{
                  color: '#7a7eed',
                  fontSize: '18px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
              >
                Get Started Today
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default OurTeam;
