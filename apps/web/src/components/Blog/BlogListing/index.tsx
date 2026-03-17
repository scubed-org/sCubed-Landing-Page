import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

// Import blog placeholder image
import BlogPlaceholder from '../../../images/blog-placeholder.png';
// Import hero background image
import HeroBackground from '../../../images/S Cubed Insights & Updates.jpg';
// Import Strapi utilities and types
import {
  BlogPost,
  getStrapiImageUrl,
  formatPublishDate,
  calculateReadTime
} from '../../../lib/strapi';
import ImageWithSkeleton from '../../common/ImageWithSkeleton';

// Import pagination client component
import BlogPagination from './BlogPagination';
import {
  listingContainer,
  postsWrapper,
  postsContainer,
  postsGrid,
  postCard,
  postImage,
  postContent,
  featuredBadge,
  postTitle,
  postExcerpt,
  postMeta,
  metaItem,
} from './styles.css';
import './global.css';

interface BlogListingProps {
  initialPosts: BlogPost[];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  currentPage: number;
  searchQuery?: string;
  categoryFilter?: string;
  tagFilter?: string;
  error?: string;
}

const BlogListing: React.FC<BlogListingProps> = ({
  initialPosts,
  pagination,
  currentPage,
  searchQuery,
  categoryFilter,
  tagFilter,
  error,
}) => {
  // Helper function to get read time
  const getReadTime = (post: BlogPost): string => {
    const readTime = post.estimated_read_time || 
                     calculateReadTime(post.content_blocks || []);
    return `${readTime} min read`;
  };

  // Error state
  if (error && initialPosts.length === 0) {
    return (
      <div className={listingContainer}>
        <div className={postsWrapper}>
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load Blog Posts
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Link
                href="/blog"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-block"
              >
                Refresh Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={listingContainer}>
      {/* Hero Section */}
      <div className="hero-section" style={{
        position: 'relative',
        padding: '4rem 0 3rem',
        borderRadius: '0 0 24px 24px',
        color: 'white',
        textAlign: 'center' as const,
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          borderRadius: '0 0 24px 24px',
          overflow: 'hidden'
        }}>
          <Image
            src={HeroBackground}
            alt="S Cubed Insights & Updates"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 className="hero-title">
            S Cubed Insights & Updates
          </h1>
          <p className="hero-subtitle">
            Stay updated with the latest developments in therapy practice management, 
            industry insights, and expert guidance from our team.
          </p>
          {pagination && pagination.total > 0 && (
            <p className="hero-count">
              {pagination.total} article{pagination.total !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className={postsWrapper}>
        <div className={postsContainer}>
          {initialPosts.length === 0 && !error ? (
            // No posts state
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Blog Posts Yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for our latest insights and updates!
                </p>
              </div>
            </div>
          ) : (
            // Posts grid
            <div className={postsGrid}>
              {initialPosts.map((post) => {
              const featuredImageUrl = post.featured_image 
                ? getStrapiImageUrl(post.featured_image) 
                : '';
              const authorName = post.author?.name || 'S Cubed Team';
              const publishDate = formatPublishDate(post);
              // const readTime = getReadTime(post);

              return (
                <article key={post.id} className={postCard}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className={postImage}>
                      {featuredImageUrl ? (
                        <ImageWithSkeleton
                          src={featuredImageUrl}
                          alt={post.title}
                          width={400}
                          height={280}
                          wrapperStyle={{ width: '100%', height: '100%' }}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <Image
                          src={BlogPlaceholder}
                          alt="S Cubed Blog Placeholder"
                          width={400}
                          height={280}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      )}
                      {post.featured && (
                        <span className={featuredBadge}>FEATURED</span>
                      )}
                    </div>
                    
                    <div className={postContent}>
                      <div>
                        <h2 
                          className={postTitle}
                          title={post.title}
                          style={{ cursor: 'pointer' }}
                        >
                          {post.title}
                        </h2>
                        <p className={postExcerpt}>{post.excerpt}</p>
                      </div>
                      
                      <div className={postMeta}>
                        <span className={metaItem}>
                          <User size={16} />
                          {authorName}
                        </span>
                        <span className={metaItem}>
                          <Calendar size={16} />
                          {publishDate}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
              })}
            </div>
          )}

          {/* Pagination Component */}
          {pagination && pagination.pageCount > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={pagination.pageCount}
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              tagFilter={tagFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListing; 