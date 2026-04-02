const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://cms.scubed.io';

// Base fetch function with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      // Try to get more detailed error information
      let errorMessage = `Strapi API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error.message || JSON.stringify(errorData.error)}`;
        }
      } catch (parseError) {
        // If we can't parse the error response, use the original message
      }
      console.error('API URL:', url);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi API fetch error:', error);
    throw error;
  }
}

// Types for blog content
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  email?: string;
  bio?: string;
  avatar?: StrapiImage;
  position?: string;
  social_links?: any;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface ContentBlock {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content_blocks?: ContentBlock[];
  featured_image?: StrapiImage;
  hero_image?: StrapiImage;
  audio_version?: StrapiImage;
  featured: boolean;
  estimated_read_time?: number;
  meta_title?: string;
  meta_description?: string;
  publishedAt: string;
  firstPublishedAt?: string; // Original publish date (optional, may not exist for older posts)
  publish_date: string; // Custom publication date (YYYY-MM-DD format) that overrides publishedAt for display
  createdAt: string;
  updatedAt: string;
  author?: Author | null;
  categories: Category[];
  tags: Tag[];
  table_of_contents: boolean;
  enable_comments: boolean;
  social_share: boolean;
  faq_schema?: FAQItem[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API functions
export async function getBlogPosts(
  params: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    category?: string;
    tag?: string;
    search?: string;
  } = {},
): Promise<StrapiResponse<BlogPost[]>> {
  const { page = 1, pageSize = 10, featured, category, tag, search } = params;

  const queryParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate[0]': 'author',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    'populate[3]': 'featured_image',
    'populate[4]': 'hero_image',
    'populate[5]': 'audio_version',
    // Sort by publish_date (descending) - now required field so no fallback needed
    sort: 'publish_date:desc',
  });

  // Add publishedAt filter to only get published content
  queryParams.set('filters[publishedAt][$notNull]', 'true');
  
  // Filter out future-dated posts (scheduled publishing)
  // Only show posts where publish_date is null OR publish_date <= today
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  queryParams.set('filters[$or][0][publish_date][$null]', 'true');
  queryParams.set('filters[$or][1][publish_date][$lte]', today);

  // Add featured filter if specified
  if (featured !== undefined) {
    queryParams.set('filters[featured][$eq]', featured.toString());
  }

  // Add category filter if specified
  if (category) {
    queryParams.set('filters[categories][slug][$eq]', category);
  }

  // Add tag filter if specified
  if (tag) {
    queryParams.set('filters[tags][slug][$eq]', tag);
  }

  // Add search filter if specified
  if (search) {
    queryParams.set('filters[$or][0][title][$containsi]', search);
    queryParams.set('filters[$or][1][excerpt][$containsi]', search);
  }

  return fetchAPI(`/blog-posts?${queryParams}`);
}

export async function getBlogPost(
  slug: string,
): Promise<StrapiResponse<BlogPost[]>> {
  try {
    // Use the structured approach from Strapi v5 docs for component population
    const queryParams = new URLSearchParams();

    // Filters
    queryParams.set('filters[slug][$eq]', slug);
    queryParams.set('filters[publishedAt][$notNull]', 'true');
    
    // Filter out future-dated posts (scheduled publishing)
    // Only show posts where publish_date is null OR publish_date <= today
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    queryParams.set('filters[$or][0][publish_date][$null]', 'true');
    queryParams.set('filters[$or][1][publish_date][$lte]', today);

    // Basic population with explicit author avatar
    queryParams.set('populate[author][populate][avatar]', 'true');
    queryParams.set('populate[categories]', 'true');
    queryParams.set('populate[tags]', 'true');
    queryParams.set('populate[featured_image]', 'true');
    queryParams.set('populate[hero_image]', 'true');
    queryParams.set('populate[audio_version]', 'true');

    // Populate content_blocks with all nested fields (required for polymorphic structures)
    // The error message indicates we must use '*' for polymorphic structures
    queryParams.set('populate[content_blocks][populate]', '*');

    return await fetchAPI(`/blog-posts?${queryParams}`);
  } catch (error) {
    console.warn(
      'Advanced population failed, falling back to basic population:',
      error,
    );

    // Fallback to basic population if the advanced syntax fails
    const fallbackParams = new URLSearchParams();
    fallbackParams.set('filters[slug][$eq]', slug);
    fallbackParams.set('filters[publishedAt][$notNull]', 'true');
    fallbackParams.set('populate', '*');

    return await fetchAPI(`/blog-posts?${fallbackParams}`);
  }
}

// Admin function to get all blog posts including future-dated ones (for preview/management)
export async function getAllBlogPostsAdmin(
  params: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    category?: string;
    tag?: string;
    search?: string;
  } = {},
): Promise<StrapiResponse<BlogPost[]>> {
  const { page = 1, pageSize = 10, featured, category, tag, search } = params;

  const queryParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate[0]': 'author',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    'populate[3]': 'featured_image',
    'populate[4]': 'hero_image',
    'populate[5]': 'audio_version',
    // Sort by publish_date (descending) - now required field so no fallback needed
    sort: 'publish_date:desc',
  });

  // Add publishedAt filter to only get published content (but include future dates)
  queryParams.set('filters[publishedAt][$notNull]', 'true');

  // Add featured filter if specified
  if (featured !== undefined) {
    queryParams.set('filters[featured][$eq]', featured.toString());
  }

  // Add category filter if specified
  if (category) {
    queryParams.set('filters[categories][slug][$eq]', category);
  }

  // Add tag filter if specified
  if (tag) {
    queryParams.set('filters[tags][slug][$eq]', tag);
  }

  // Add search filter if specified
  if (search) {
    queryParams.set('filters[$or][0][title][$containsi]', search);
    queryParams.set('filters[$or][1][excerpt][$containsi]', search);
  }

  return fetchAPI(`/blog-posts?${queryParams}`);
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  const queryParams = new URLSearchParams({
    sort: 'name:asc',
  });

  return fetchAPI(`/categories?${queryParams}`);
}

export async function getTags(): Promise<StrapiResponse<Tag[]>> {
  const queryParams = new URLSearchParams({
    sort: 'name:asc',
  });

  return fetchAPI(`/tags?${queryParams}`);
}

export async function getAuthors(): Promise<StrapiResponse<Author[]>> {
  const queryParams = new URLSearchParams({
    populate: 'avatar',
    sort: 'name:asc',
  });

  return fetchAPI(`/authors?${queryParams}`);
}

// Helper function to get full image URL
export function getStrapiImageUrl(
  image: StrapiImage | undefined | null,
): string {
  if (!image?.url) return '';

  const url = image.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Helper function to get the display publish date (publish_date is required but we keep fallbacks for robustness)
export function getPublishDate(post: BlogPost): string {
  return post.publish_date || post.firstPublishedAt || post.publishedAt;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const utcDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(utcDate);
  }

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Helper function to format the publish date for a blog post
export function formatPublishDate(post: BlogPost): string {
  return formatDate(getPublishDate(post));
}

// Helper function to calculate read time if not provided
export function calculateReadTime(contentBlocks: ContentBlock[]): number {
  let wordCount = 0;

  contentBlocks.forEach((block) => {
    if (block.__component === 'blog.text-module' && block.content) {
      // Strip HTML and count words
      const textContent = block.content.replace(/<[^>]*>/g, '');
      wordCount += textContent.split(/\s+/).length;
    }
  });

  // Average reading speed is 200-250 words per minute
  return Math.ceil(wordCount / 225);
}
