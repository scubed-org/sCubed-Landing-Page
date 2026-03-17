'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import * as styles from './styles.css';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  unoptimized?: boolean;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  sizes?: string;
  isNative?: boolean;
  onLoad?: () => void;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  fill,
  width,
  height,
  priority,
  unoptimized,
  className,
  wrapperClassName,
  style: imgStyle,
  wrapperStyle,
  sizes,
  isNative = false,
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const imageClassName = [
    className,
    isLoading ? styles.imageLoading : styles.imageLoaded,
  ]
    .filter(Boolean)
    .join(' ');

  const overlayClassName = [
    styles.shimmerOverlay,
    !isLoading && styles.shimmerHidden,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
      style={wrapperStyle}
    >
      <div className={overlayClassName} />

      {isNative ? (
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          style={imgStyle}
          onLoad={handleLoad}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          unoptimized={unoptimized}
          className={imageClassName}
          style={imgStyle}
          sizes={sizes}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
