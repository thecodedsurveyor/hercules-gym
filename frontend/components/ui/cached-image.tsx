'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { imageCacheService } from '@/lib/image-cache';

interface CachedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  cacheId?: string;
}

export function CachedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fallbackSrc = '/placeholder-image.jpg',
  onLoad,
  onError,
  cacheId,
}: CachedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCached, setIsCached] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCacheAndLoad = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // If we have a cacheId, check if the image is cached
        if (cacheId) {
          const cached = await imageCacheService.isImageCached(cacheId);
          setIsCached(cached);

          if (cached) {
            const cachedUrl = await imageCacheService.getCachedImageUrl(cacheId);
            if (cachedUrl) {
              setImageSrc(cachedUrl);
              setIsLoading(false);
              return;
            }
          }
        }

        // If not cached or no cacheId, use the original src
        setImageSrc(src);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking cache:', error);
        setImageSrc(src);
        setIsLoading(false);
      }
    };

    checkCacheAndLoad();
  }, [src, cacheId]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  return (
    <div className={cn('relative', className)}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {isCached && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Cached
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Image not available</div>
        </div>
      )}
    </div>
  );
} 