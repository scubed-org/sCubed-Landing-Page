'use client';

import {
  Archive,
  Award,
  BarChart3,
  Bell,
  Building,
  Calculator,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  CreditCard,
  Database,
  DollarSign,
  Edit,
  FileCheck,
  FileText,
  FolderOpen,
  History,
  KeyRound,
  MapPin,
  MessageSquare,
  Palette,
  RefreshCw,
  ScrollText,
  Settings,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  Video,
  Workflow,
  Zap,
} from 'lucide-react';
import React, { cloneElement, useState } from 'react';

import {
  additionalFeatureCard,
  additionalFeatureCategory,
  additionalFeatureIcon,
  additionalFeatureItem,
  additionalFeaturesList,
  coreFeatureCard,
  coreFeatureDescription,
  coreFeatureIcon,
  coreFeatures,
  coreFeatureTitle,
  expandButton,
  featureIcon,
  featuresContainer,
  featuresSection,
  moreFeaturesSubtitle,
  moreFeaturesTitle,
  sectionBackground,
  sectionDescription,
  sectionHeader,
  sectionTitle,
} from './style.css';

const minItemsToShow = 5;

const FeaturesComprehensive: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const coreFeaturesList = [
    {
      icon: <Calendar />,
      title: 'Smart Scheduling & Appointments',
      description:
        'Easily manage sessions, internal meetings, and recurring appointments using our intelligent calendar system-designed to save time and reduce scheduling errors.',
    },
    {
      icon: <FileText />,
      title: 'Fully Customizable Templates',
      description:
        'Tailor treatment plans and session notes to match your clinical or educational approach. Ensure consistency, compliance, and efficiency with customizable templates.',
    },
    {
      icon: <CreditCard />,
      title: 'Modern Assessment, Backed by VB-MAPP',
      description:
        'Seamlessly manage scoring, data, and reporting through our S Cubed platform with built-in VB-MAPP - empowering you to make informed decisions and drive meaningful progress.',
    },
    {
      icon: <BarChart3 />,
      title: 'Real-Time Reporting & Insights',
      description:
        'Track progress, goals, and behavior outcomes with detailed graphs, annotations, and custom reports. From clinic performance to individual session summaries.',
    },
    {
      icon: <Target />,
      title: 'Smarter Goal Tracking',
      description:
        'Set mastery criteria (e.g., 80% accuracy over 3 sessions), and let S Cubed do the tracking. Automatically mark targets as mastered - saving time for BCBAs, RBTs, and educators.',
    },
    {
      icon: <Clock />,
      title: 'Smart Clock In/Out for Staff',
      description:
        'Let your team log hours, breaks, and availability with just a few clicks. Transparent, easy-to-use time tracking that supports accountability and team management.',
    },
    {
      icon: <MessageSquare />,
      title: 'Secure Communication & Collaboration',
      description:
        'HIPAA-Compliant messaging, shared document storage, and task assignment features keep your team aligned and your data protected.',
    },
    {
      icon: <Settings />,
      title: 'Flexible for Any Setting',
      description:
        "Whether you're in private practice, a school-based clinic, or a multidisciplinary environment, S Cubed adapts to your workflow - supporting your goals with unmatched flexibility.",
    },
  ];

  const additionalFeatures = [
    {
      category: 'Scheduling & Staff Management',
      id: 'scheduling',
      icon: <Calendar />,
      color: '#3b82f6',
      items: [
        {
          text: 'Timesheet Management & Payroll Exports',
          icon: <DollarSign size={16} />,
        },
        { text: 'Multi-Signature Workflow', icon: <FileCheck size={16} /> },
        { text: 'Caseload Assignment Tools', icon: <UserCheck size={16} /> },
        { text: 'Customizable Push Notifications', icon: <Bell size={16} /> },
        { text: 'Staff Credential Tracking', icon: <Award size={16} /> },
        {
          text: 'Staff-Wide & Parent-Wide Announcements',
          icon: <Users size={16} />,
        },
      ],
    },
    {
      category: 'Progress Tracking & Data Collection',
      id: 'progress-tracking',
      icon: <BarChart3 />,
      color: '#10b981',
      items: [
        { text: 'Client Progress Dashboards', icon: <TrendingUp size={16} /> },
        { text: 'Digital Data Sheets', icon: <FileText size={16} /> },
        { text: 'Skill Acquisition Goal Tracking', icon: <Target size={16} /> },
        {
          text: 'Task Analysis / Chaining Support',
          icon: <Workflow size={16} />,
        },
        { text: 'Real-Time Data Entry & Sync', icon: <Zap size={16} /> },
        {
          text: 'Maintenance & Generalization Tracking',
          icon: <RefreshCw size={16} />,
        },
        { text: 'Movable Data Widget', icon: <Database size={16} /> },
        { text: 'Group Session Support', icon: <Users size={16} /> },
        { text: 'Offline Mode with Auto-Sync', icon: <Cloud size={16} /> },
        { text: 'Progress Summaries & Reports', icon: <FileText size={16} /> },
      ],
    },
    {
      category: 'Documentation & Notes',
      id: 'documentation',
      icon: <FileText />,
      color: '#f59e0b',
      items: [
        { text: 'Write Notes During Session', icon: <Edit size={16} /> },
        { text: 'Custom Note & Plan Templates', icon: <FileText size={16} /> },
        { text: 'Automatically Populate Notes', icon: <Zap size={16} /> },
        { text: 'Program & Session Note History', icon: <History size={16} /> },
        { text: 'Build Custom Goal Bank', icon: <Database size={16} /> },
        { text: 'Video/Media Embeds in Programs', icon: <Video size={16} /> },
      ],
    },
    {
      category: 'Billing & Financials',
      id: 'billing',
      icon: <CreditCard />,
      color: '#ef4444',
      items: [
        {
          text: 'Electronic Remittance Import (ERA/EOB)',
          icon: <FileCheck size={16} />,
        },
        { text: 'Copay Tracking & Invoicing', icon: <Calculator size={16} /> },
        { text: 'Audit-Ready Billing Logs', icon: <ScrollText size={16} /> },
        { text: 'Multi-Payer Management', icon: <Building size={16} /> },
        { text: 'Billing Services Available', icon: <DollarSign size={16} /> },
        { text: 'Credentialing Services Available', icon: <Award size={16} /> },
        { text: 'CPT Code Library', icon: <Database size={16} /> },
        { text: 'Transparent Pricing', icon: <CheckCircle size={16} /> },
      ],
    },
    {
      category: 'Compliance & Security',
      id: 'compliance',
      icon: <Shield />,
      color: '#22c55e',
      items: [
        {
          text: 'Two-Factor Authentication (2FA)',
          icon: <KeyRound size={16} />,
        },
        {
          text: 'Audit Trail & Action History',
          icon: <ScrollText size={16} />,
        },
        { text: 'Secure Document Vault', icon: <Archive size={16} /> },
        { text: 'Employee Document Vault', icon: <FolderOpen size={16} /> },
        {
          text: 'Secure Cloud-Based Infrastructure',
          icon: <Cloud size={16} />,
        },
      ],
    },
    {
      category: 'Customization & Flexibility',
      id: 'customization',
      icon: <Settings />,
      color: '#a855f7',
      items: [
        {
          text: 'Customizable Roles & Dashboards',
          icon: <UserCog size={16} />,
        },
        { text: 'Color-Coded Sessions', icon: <Palette size={16} /> },
        { text: 'Custom Mastery Criteria', icon: <Target size={16} /> },
        {
          text: 'Location Tags (Clinic, School, Home)',
          icon: <MapPin size={16} />,
        },
        { text: 'Seamlessly Switch Devices', icon: <RefreshCw size={16} /> },
        { text: 'Scalable for Growth', icon: <TrendingUp size={16} /> },
        { text: 'Available on Web & Mobile', icon: <Smartphone size={16} /> },
      ],
    },
  ];

  return (
    <section className={featuresSection}>
      <div className={sectionBackground} />
      <div className={featuresContainer}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>
          Powerful ABA Therapy Software Features That{' '}
            <span style={{ color: '#7a7eed' }}>Work for Your ABA Practice</span>
          </h2>
          <p className={sectionDescription}>
            No more switching between apps or struggling with outdated systems.
            S Cubed combines all your essential tools into one seamless
            solution.
          </p>
        </div>

        {/* Core Features Grid */}
        <div id="practice-management" className={coreFeatures}>
          {coreFeaturesList.map((feature, index) => (
            <div
              key={feature.title}
              className={coreFeatureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={coreFeatureIcon}>
                {cloneElement(feature.icon as React.ReactElement, {
                  size: 24,
                } as any)}
              </div>
              <h3 className={coreFeatureTitle}>{feature.title}</h3>
              <p className={coreFeatureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features by Category */}
        <div>
          <h2 className={moreFeaturesTitle}>
          Discover ABA Features That{' '}
            <span style={{ color: '#7a7eed' }}>Empower</span> You
          </h2>
          <p className={moreFeaturesSubtitle}>
          Explore our comprehensive suite of tools designed to transform your ABA practice
          </p>

          <div className={additionalFeaturesList}>
            {additionalFeatures.map((category, index) => (
              <div key={category.category} id={category.id} className={additionalFeatureCard}>
                <h3 className={additionalFeatureCategory}>
                  <span
                    className={additionalFeatureIcon}
                    style={{
                      backgroundColor: `${category.color}15`,
                      color: category.color,
                    }}
                  >
                    {cloneElement(category.icon as React.ReactElement, {
                      size: 24,
                    } as any)}
                  </span>
                  {category.category}
                </h3>

                <ul>
                  {category.items
                    .slice(
                      0,
                      expandedCards.includes(index)
                        ? undefined
                        : minItemsToShow,
                    )
                    .map((item) => (
                      <li key={item.text} className={additionalFeatureItem}>
                        <span
                          className={featureIcon}
                          style={{ color: category.color }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                </ul>

                {category.items.length > minItemsToShow && (
                  <button
                    className={expandButton}
                    onClick={() => toggleCard(index)}
                    style={{ color: category.color }}
                  >
                    {expandedCards.includes(index) ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        <span>
                          Show {category.items.length - minItemsToShow} More
                          Features
                        </span>
                        <ChevronDown size={20} />
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComprehensive;
