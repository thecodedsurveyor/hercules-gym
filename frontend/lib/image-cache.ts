export interface CachedImage {
  id: string;
  url: string;
  cachedUrl?: string;
  timestamp: number;
  size?: number;
  category?: string;
}

export interface CacheOptions {
  maxSize?: number; // in MB
  maxAge?: number; // in days
  category?: string;
}

class ImageCacheService {
  private readonly CACHE_NAME = 'hercules-gym-unsplash-images-v1';
  private readonly STORAGE_KEY = 'hercules-gym-cached-images';
  private readonly DEFAULT_MAX_SIZE = 100; // 100MB
  private readonly DEFAULT_MAX_AGE = 30; // 30 days

  /**
   * Cache an image for offline use
   */
  async cacheImage(
    imageUrl: string,
    imageId: string,
    options: CacheOptions = {}
  ): Promise<CachedImage | null> {
    try {
      // Check if already cached
      const existing = await this.getCachedImage(imageId);
      if (existing) {
        return existing;
      }

      // Fetch and cache the image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const cache = await caches.open(this.CACHE_NAME);
      
      // Create a unique cache key
      const cacheKey = new Request(imageUrl);
      await cache.put(cacheKey, new Response(blob));

      // Store metadata
      const cachedImage: CachedImage = {
        id: imageId,
        url: imageUrl,
        timestamp: Date.now(),
        size: blob.size,
        category: options.category,
      };

      await this.saveCachedImageMetadata(cachedImage);
      await this.cleanupCache(options);

      return cachedImage;
    } catch (error) {
      console.error('Failed to cache image:', error);
      return null;
    }
  }

  /**
   * Get a cached image
   */
  async getCachedImage(imageId: string): Promise<CachedImage | null> {
    try {
      const cachedImages = await this.getCachedImagesMetadata();
      return cachedImages.find(img => img.id === imageId) || null;
    } catch (error) {
      console.error('Failed to get cached image:', error);
      return null;
    }
  }

  /**
   * Get all cached images
   */
  async getCachedImages(category?: string): Promise<CachedImage[]> {
    try {
      const cachedImages = await this.getCachedImagesMetadata();
      if (category) {
        return cachedImages.filter(img => img.category === category);
      }
      return cachedImages;
    } catch (error) {
      console.error('Failed to get cached images:', error);
      return [];
    }
  }

  /**
   * Check if an image is cached
   */
  async isImageCached(imageId: string): Promise<boolean> {
    const cachedImage = await this.getCachedImage(imageId);
    if (!cachedImage) return false;

    // Check if the cached image still exists in the cache
    const cache = await caches.open(this.CACHE_NAME);
    const response = await cache.match(cachedImage.url);
    return !!response;
  }

  /**
   * Get cached image URL (for use in img src)
   */
  async getCachedImageUrl(imageId: string): Promise<string | null> {
    try {
      const cachedImage = await this.getCachedImage(imageId);
      if (!cachedImage) return null;

      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(cachedImage.url);
      
      if (response) {
        // Create a blob URL for the cached image
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }

      return null;
    } catch (error) {
      console.error('Failed to get cached image URL:', error);
      return null;
    }
  }

  /**
   * Remove a cached image
   */
  async removeCachedImage(imageId: string): Promise<boolean> {
    try {
      const cachedImage = await this.getCachedImage(imageId);
      if (!cachedImage) return false;

      // Remove from cache
      const cache = await caches.open(this.CACHE_NAME);
      await cache.delete(cachedImage.url);

      // Remove metadata
      const cachedImages = await this.getCachedImagesMetadata();
      const updatedImages = cachedImages.filter(img => img.id !== imageId);
      await this.saveCachedImagesMetadata(updatedImages);

      return true;
    } catch (error) {
      console.error('Failed to remove cached image:', error);
      return false;
    }
  }

  /**
   * Clear all cached images
   */
  async clearCache(): Promise<void> {
    try {
      // Clear cache storage
      const cache = await caches.open(this.CACHE_NAME);
      const keys = await cache.keys();
      await Promise.all(keys.map(key => cache.delete(key)));

      // Clear metadata
      await this.saveCachedImagesMetadata([]);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
    totalImages: number;
    totalSize: number;
    categories: string[];
  }> {
    try {
      const cachedImages = await this.getCachedImagesMetadata();
      const totalSize = cachedImages.reduce((sum, img) => sum + (img.size || 0), 0);
      const categories = [...new Set(cachedImages.map(img => img.category).filter(Boolean))];

      return {
        totalImages: cachedImages.length,
        totalSize,
        categories,
      };
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return { totalImages: 0, totalSize: 0, categories: [] };
    }
  }

  /**
   * Preload images for offline use
   */
  async preloadImages(
    images: Array<{ id: string; url: string; category?: string }>,
    options: CacheOptions = {}
  ): Promise<CachedImage[]> {
    const results: CachedImage[] = [];

    for (const image of images) {
      const cached = await this.cacheImage(image.url, image.id, {
        ...options,
        category: image.category,
      });
      if (cached) {
        results.push(cached);
      }
    }

    return results;
  }

  private async getCachedImagesMetadata(): Promise<CachedImage[]> {
    try {
      if (typeof window === 'undefined') return [];
      
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to get cached images metadata:', error);
      return [];
    }
  }

  private async saveCachedImageMetadata(cachedImage: CachedImage): Promise<void> {
    try {
      const cachedImages = await this.getCachedImagesMetadata();
      const existingIndex = cachedImages.findIndex(img => img.id === cachedImage.id);
      
      if (existingIndex >= 0) {
        cachedImages[existingIndex] = cachedImage;
      } else {
        cachedImages.push(cachedImage);
      }

      await this.saveCachedImagesMetadata(cachedImages);
    } catch (error) {
      console.error('Failed to save cached image metadata:', error);
    }
  }

  private async saveCachedImagesMetadata(cachedImages: CachedImage[]): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cachedImages));
    } catch (error) {
      console.error('Failed to save cached images metadata:', error);
    }
  }

  private async cleanupCache(options: CacheOptions = {}): Promise<void> {
    try {
      const maxSize = options.maxSize || this.DEFAULT_MAX_SIZE;
      const maxAge = options.maxAge || this.DEFAULT_MAX_AGE;
      const maxAgeMs = maxAge * 24 * 60 * 60 * 1000; // Convert to milliseconds

      const cachedImages = await this.getCachedImagesMetadata();
      const now = Date.now();

      // Remove expired images
      const validImages = cachedImages.filter(img => {
        return (now - img.timestamp) < maxAgeMs;
      });

      // Remove images if total size exceeds limit
      let totalSize = 0;
      const imagesToKeep: CachedImage[] = [];

      for (const img of validImages.sort((a, b) => b.timestamp - a.timestamp)) {
        const imgSize = img.size || 0;
        if (totalSize + imgSize <= maxSize * 1024 * 1024) { // Convert MB to bytes
          imagesToKeep.push(img);
          totalSize += imgSize;
        } else {
          // Remove this image from cache
          await this.removeCachedImage(img.id);
        }
      }

      // Update metadata
      await this.saveCachedImagesMetadata(imagesToKeep);
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    }
  }
}

// Export singleton instance
export const imageCacheService = new ImageCacheService(); 