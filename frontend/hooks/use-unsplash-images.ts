import { useState, useEffect } from 'react';
import {
	getUnsplashImages,
	getRandomUnsplashImage,
	UnsplashImageWithCache,
	IMAGE_CATEGORIES,
	getOptimizedImagesForUseCase,
	getCachedImages,
	preloadImagesForOffline,
} from '@/lib/unsplash';
import { ImageFormat } from '@/lib/image-optimization';
import { imageCacheService } from '@/lib/image-cache';

export interface ImageOptions {
	width?: number;
	height?: number;
	format?: ImageFormat;
	quality?: number;
	orientation?: 'landscape' | 'portrait' | 'squarish';
	cacheImages?: boolean;
	category?: string;
}

export function useUnsplashImages(
	query: string,
	count: number = 10,
	options: ImageOptions = {}
) {
	const [images, setImages] = useState<
		UnsplashImageWithCache[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				setLoading(true);
				setError(null);
				const fetchedImages =
					await getUnsplashImages(
						query,
						count,
						options
					);
				setImages(fetchedImages);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to fetch images'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
	}, [query, count, JSON.stringify(options)]);

	return { images, loading, error };
}

export function useRandomUnsplashImage(
	query: string,
	options: ImageOptions = {}
) {
	const [image, setImage] =
		useState<UnsplashImageWithCache | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				setLoading(true);
				setError(null);
				const fetchedImage =
					await getRandomUnsplashImage(
						query,
						options
					);
				setImage(fetchedImage);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to fetch image'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, [query, JSON.stringify(options)]);

	return { image, loading, error };
}

// Convenience hook for predefined categories
export function useCategoryImages(
	category: keyof typeof IMAGE_CATEGORIES,
	count: number = 10,
	options: ImageOptions = {}
) {
	return useUnsplashImages(
		IMAGE_CATEGORIES[category],
		count,
		options
	);
}

export function useRandomCategoryImage(
	category: keyof typeof IMAGE_CATEGORIES,
	options: ImageOptions = {}
) {
	return useRandomUnsplashImage(
		IMAGE_CATEGORIES[category],
		options
	);
}

// New hooks for use case-specific optimized images
export function useOptimizedImagesForUseCase(
	category: keyof typeof IMAGE_CATEGORIES,
	useCase: 'hero' | 'card' | 'thumbnail' | 'gallery',
	count: number = 1,
	options: { cacheImages?: boolean } = {}
) {
	const [images, setImages] = useState<
		UnsplashImageWithCache[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				setLoading(true);
				setError(null);
				const fetchedImages =
					await getOptimizedImagesForUseCase(
						category,
						useCase,
						count,
						options
					);
				setImages(fetchedImages);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to fetch optimized images'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
	}, [category, useCase, count, JSON.stringify(options)]);

	return { images, loading, error };
}

// Hook for hero images with optimal sizing
export function useHeroImage(
	category: keyof typeof IMAGE_CATEGORIES
) {
	return useOptimizedImagesForUseCase(
		category,
		'hero',
		1
	);
}

// Hook for card images with optimal sizing
export function useCardImages(
	category: keyof typeof IMAGE_CATEGORIES,
	count: number = 3
) {
	return useOptimizedImagesForUseCase(
		category,
		'card',
		count
	);
}

// Hook for thumbnail images
export function useThumbnailImages(
	category: keyof typeof IMAGE_CATEGORIES,
	count: number = 6
) {
	return useOptimizedImagesForUseCase(
		category,
		'thumbnail',
		count
	);
}

// Hook for gallery images
export function useGalleryImages(
	category: keyof typeof IMAGE_CATEGORIES,
	count: number = 8
) {
	return useOptimizedImagesForUseCase(
		category,
		'gallery',
		count
	);
}

// Hook for cached images (offline support)
export function useCachedImages(category?: string) {
	const [images, setImages] = useState<
		UnsplashImageWithCache[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCachedImages = async () => {
			try {
				setLoading(true);
				setError(null);
				const cachedImages =
					await getCachedImages(category);
				setImages(cachedImages);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to fetch cached images'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchCachedImages();
	}, [category]);

	return { images, loading, error };
}

// Hook for cache management
export function useImageCache() {
	const [cacheStats, setCacheStats] = useState<{
		totalImages: number;
		totalSize: number;
		categories: string[];
	} | null>(null);
	const [loading, setLoading] = useState(false);

	const getStats = async () => {
		setLoading(true);
		try {
			const stats =
				await imageCacheService.getCacheStats();
			setCacheStats(stats);
		} catch (error) {
			console.error(
				'Failed to get cache stats:',
				error
			);
		} finally {
			setLoading(false);
		}
	};

	const clearCache = async () => {
		setLoading(true);
		try {
			await imageCacheService.clearCache();
			await getStats();
		} catch (error) {
			console.error('Failed to clear cache:', error);
		} finally {
			setLoading(false);
		}
	};

	const preloadImages = async (
		queries: string[],
		count: number = 5,
		category?: string
	) => {
		setLoading(true);
		try {
			const results = await preloadImagesForOffline(
				queries,
				count,
				category
			);
			await getStats();
			return results;
		} catch (error) {
			console.error(
				'Failed to preload images:',
				error
			);
			return [];
		} finally {
			setLoading(false);
		}
	};

	return {
		cacheStats,
		loading,
		getStats,
		clearCache,
		preloadImages,
	};
}

// Hook for checking if an image is cached
export function useImageCacheStatus(imageId: string) {
	const [isCached, setIsCached] = useState<
		boolean | null
	>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkCacheStatus = async () => {
			try {
				setLoading(true);
				const cached =
					await imageCacheService.isImageCached(
						imageId
					);
				setIsCached(cached);
			} catch (error) {
				console.error(
					'Failed to check cache status:',
					error
				);
				setIsCached(false);
			} finally {
				setLoading(false);
			}
		};

		if (imageId) {
			checkCacheStatus();
		}
	}, [imageId]);

	return { isCached, loading };
}
