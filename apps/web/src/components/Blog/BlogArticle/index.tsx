'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, Share2, Check, Copy } from 'lucide-react';

// Import Strapi types and utilities
import {
  BlogPost,
  getStrapiImageUrl,
  formatPublishDate,
  calculateReadTime
} from '../../../lib/strapi';
import DynamicContentRenderer from '../DynamicContentRenderer';
import BlogContactForm from '../BlogContactForm';
import AudioButton from '../AudioButton';
import TTSButton from '../TTSButton';

import {
  articleContainer,
  heroSection,
  heroImage,
  heroOverlay,
  heroContent,
  heroTitle,
  heroMeta,
  heroMetaItem,
  contentWrapper,
  articleContent,
  tableOfContents,
  tocTitle,
  tocList,
  tocItem,
  sidebar,
  socialShare,
  breadcrumb,
  authorInfo,
  authorAvatar,
  authorAvatarFallback,
  authorDetails,
  tags,
  tag,
  socialShareTitle,
  twitterButton,
  linkedinButton,
  facebookButton,
  contentLayout,
  mainContent,
  categoriesTagsSection,
  sectionWrapper,
  sectionLabel,
  authorName,
  shareHeader,
  copyLinkButton,
  socialShareGrid,
  shareStats,
  authorCard,
  authorContent,
  breadcrumbRow,
  audioButtonInline,
} from './styles.css';
import './global.css';

interface BlogArticleProps {
  post: BlogPost;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ post }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Get post data
  const title = post.title;
  const heroImageUrl = (post.hero_image) 
    ? getStrapiImageUrl(post.hero_image) 
    : '';
  const authorName = post.author?.name || 'S Cubed Team';
  const authorAvatarImage = post.author?.avatar;
  const authorAvatarUrl = authorAvatarImage ? getStrapiImageUrl(authorAvatarImage) : null;
  const authorPosition = post.author?.position;
  const authorBio = post.author?.bio;
  const publishDate = formatPublishDate(post);
  const readTime = post.estimated_read_time || calculateReadTime(post.content_blocks || []);
  const categories = post.categories || [];
  const postTags = post.tags || [];
  const contentBlocks = post.content_blocks || [];

  // Fallback URL construction for social sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';
  const fallbackUrl = `${baseUrl}/blog/${post.slug}`;

  // Set current URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate header height offset
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const headerHeight = isMobile ? 60 : 80; // Match Layout styles
      const additionalOffset =isMobile ? 80 : 65; // Extra spacing for better UX
      
      // Calculate the position to scroll to
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerHeight - additionalOffset;
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };



  const handleCopyLink = async () => {
    const urlToCopy = currentUrl || fallbackUrl;
    if (urlToCopy) {
      try {
        await navigator.clipboard.writeText(urlToCopy);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  // Function to extract h2 headings from markdown content
  const extractH2Headings = (content: string): Array<{ heading: string; id: string }> => {
    if (!content) return [];
    
    // Match h2 headings in markdown format (## heading)
    const h2Regex = /^##\s+(.+)$/gm;
    const matches = [];
    let match;
    
    while ((match = h2Regex.exec(content)) !== null) {
      const heading = match[1].trim();
      // Create a URL-friendly ID from the heading
      const id = heading
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim();
      
      matches.push({ heading, id });
    }
    
    return matches;
  };

  // Generate table of contents from h2 headings
  const generateTableOfContents = () => {
    const tocEntries: Array<{ heading: string; id: string; blockIndex: number }> = [];
    
    contentBlocks.forEach((block, index) => {
      if (block.__component === 'blog.text-module' && block.content) {
        const h2Headings = extractH2Headings(block.content);
        h2Headings.forEach((h2) => {
          tocEntries.push({
            heading: h2.heading,
            id: `${h2.id}-block-${index}`, // Ensure unique IDs across blocks
            blockIndex: index
          });
        });
      }
    });
    
    return tocEntries;
  };

  const tableOfContentsData = generateTableOfContents();



  return (
    <div className={articleContainer}>
      {/* Hero Section */}
      <section className={heroSection}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className={heroImage}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        )}
        <div className={heroOverlay} />
        <div className={heroContent}>
          <h1 className={heroTitle}>
            {title}
          </h1>
          <div className={heroMeta}>
            <span className={heroMetaItem}>
              <Calendar size={20} />
              {publishDate}
            </span>
            <span className={heroMetaItem}>
              <User size={20} />
              {authorName}
            </span>
            <span className={heroMetaItem}>
              <Clock size={20} />
              {readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className={contentWrapper}>
        <div className={contentLayout}>
          {/* Breadcrumb and Audio Button Row - spans full width */}
          <div className={breadcrumbRow}>
            <nav className={breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
              {' '} / <span>{title}</span>
            </nav>

            {/* Audio: use uploaded file if available, otherwise browser TTS */}
            <div className={audioButtonInline}>
              {post.audio_version ? (
                <AudioButton
                  audioFile={post.audio_version}
                  title={title}
                />
              ) : (
                <TTSButton
                  articleRef={articleContentRef}
                  title={title}
                />
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className={mainContent}>
            <article>
              {/* Dynamic Content Blocks */}
              <div className={articleContent} ref={articleContentRef}>
                <DynamicContentRenderer content_blocks={contentBlocks} />
              </div>

              {/* Categories and Tags */}
              {(categories.length > 0 || postTags.length > 0) && (
                <div className={categoriesTagsSection}>
                  {categories.length > 0 && (
                    <div className={sectionWrapper}>
                      <h4 className={sectionLabel}>
                        CATEGORIES
                      </h4>
                      <div className={tags}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/blog?category=${category.slug}`}
                            className={tag}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {postTags.length > 0 && (
                    <div className={sectionWrapper}>
                      <h4 className={sectionLabel}>
                        TAGS
                      </h4>
                      <div className={tags}>
                        {postTags.map((tagItem) => (
                          <Link
                            key={tagItem.id}
                            href={`/blog?tag=${tagItem.slug}`}
                            className={tag}
                          >
                            #{tagItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Author Information */}
              {post?.author?.bio && (
                <section className={authorCard} aria-labelledby="author-heading">
                  <div className={authorInfo}>
                    {/* Author Avatar - Always show with fallback */}
                    <div className={authorAvatar} aria-label={`${authorName} profile picture`}>
                      {authorAvatarUrl && !avatarError ? (
                        <Image
                          src={authorAvatarUrl}
                          alt=""
                          width={80}
                          height={80}
                          style={{ 
                            borderRadius: '50%', 
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                          }}
                          priority
                          onError={() => {
                            console.error('Failed to load author avatar:', authorAvatarUrl);
                            setAvatarError(true);
                          }}
                        />
                      ) : (
                        <div 
                          className={authorAvatarFallback}
                          aria-label={`${authorName} initials`}
                        >
                          {authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={authorContent}>
                      <div className={authorDetails}>
                        <h3 id="author-heading" className={authorName}>{authorName}</h3>
                        {authorPosition && (
                          <p className={authorPosition}><strong>{authorPosition}</strong></p>
                        )}
                        {authorBio && (
                          <p className={authorBio}>{authorBio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Social Share */}
              {post.social_share && (
                <div className={socialShare}>
                  <div className={shareHeader}>
                    <div>
                      <h3 className={socialShareTitle}>
                        <Share2 size={24} />
                        Share this article
                      </h3>
                      <div className={shareStats}>
                        Help others discover this content
                      </div>
                    </div>
                  </div>
                  
                  <div className={socialShareGrid}>
                    <button
                      onClick={handleCopyLink}
                      className={copyLinkButton}
                    >
                      {copySuccess ? (
                        <>
                          <Check size={16} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl || fallbackUrl)}&via=scubed_solutions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twitterButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X (Twitter)
                    </a>

                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl || fallbackUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(post.excerpt || post.meta_description || '')}&source=${encodeURIComponent('S Cubed')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkedinButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl || fallbackUrl)}&quote=${encodeURIComponent(title + ' - ' + (post.excerpt || post.meta_description || ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={facebookButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className={sidebar}>
            {/* Table of Contents - if enabled */}
            {post.table_of_contents && tableOfContentsData.length > 0 && (
              <div className={tableOfContents}>
                <h3 className={tocTitle}>Table of Contents</h3>
                <ul className={tocList}>
                                    {tableOfContentsData.map((tocEntry, index) => (
                    <li key={`${tocEntry.id}-${index}`} className={tocItem}>
                      <button onClick={() => scrollToSection(tocEntry.id)}>
                        {tocEntry.heading}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Form */}
            <BlogContactForm />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle; 