import React from 'react';

import { getStrapiImageUrl, StrapiImage } from '../../../lib/strapi';
import ImageWithSkeleton from '../../common/ImageWithSkeleton';

interface ModuleImageData {
  image?: StrapiImage;
  caption?: string;
  alt_text?: string;
  image_size?: 'thumbnail' | 'medium' | 'large' | 'full-width';
  image_alignment?: 'left' | 'center' | 'right';
  border_style?: 'none' | 'rounded' | 'circle' | 'shadow';
  clickable?: boolean;
  link_url?: string;
  [key: string]: any; // Allow additional properties from Strapi
}

interface ModuleImageProps {
  data: ModuleImageData;
}

const ModuleImage: React.FC<ModuleImageProps> = ({ data }) => {
  const {
    image,
    caption,
    alt_text = 'Image',
    image_size = 'large',
    image_alignment = 'center',
    border_style = 'rounded',
    clickable = false,
    link_url
  } = data;

  const imageUrl = image ? getStrapiImageUrl(image) : '';
  
  if (!imageUrl) {
    return (
      <div className="module-image py-4">
        <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
          Image not available
          {data.image && <div className="text-xs mt-2">Image data present but URL not accessible</div>}
        </div>
      </div>
    );
  }

  // Size classes
  const sizeClasses = {
    thumbnail: 'w-32 h-32',
    medium: 'w-full max-w-md',
    large: 'w-full max-w-2xl',
    'full-width': 'w-full'
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  // Border style classes
  const borderClasses = {
    none: '',
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    shadow: 'rounded-lg shadow-lg'
  };

  const imageClasses = [
    'object-cover',
    borderClasses[border_style]
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'module-image py-6 flex flex-col',
    alignmentClasses[image_alignment],
    sizeClasses[image_size]
  ].filter(Boolean).join(' ');

  const ImageComponent = () => (
    <ImageWithSkeleton
      src={imageUrl}
      alt={alt_text}
      width={image?.width || 800}
      height={image?.height || 600}
      className={imageClasses}
      style={{
        width: '100%',
        height: image_size === 'thumbnail' ? '8rem' : 'auto',
      }}
    />
  );

  return (
    <div className={containerClasses}>
      {clickable && link_url ? (
        <a
          href={link_url}
          className="block transition-transform duration-200 hover:scale-105"
        >
          <ImageComponent />
        </a>
      ) : (
        <ImageComponent />
      )}
      
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 italic text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export default ModuleImage; 