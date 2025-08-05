import { ImageFormat } from './image-optimization';
import {
	imageCacheService,
	type CachedImage,
} from './image-cache';

const UNSPLASH_ACCESS_KEY =
	process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
	id: string;
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
	};
	alt_description: string;
	user: {
		name: string;
		links: {
			html: string;
		};
	};
}

export interface UnsplashSearchParams {
	query: string;
	count?: number;
	width?: number;
	height?: number;
	format?: ImageFormat;
	quality?: number;
	orientation?: 'landscape' | 'portrait' | 'squarish';
}

export interface UnsplashImageWithCache
	extends UnsplashImage {
	cachedUrl?: string;
	isCached?: boolean;
}

export async function getUnsplashImages(
	query: string,
	count: number = 10,
	options: {
		width?: number;
		height?: number;
		format?: ImageFormat;
		quality?: number;
		orientation?: 'landscape' | 'portrait' | 'squarish';
		cacheImages?: boolean;
		category?: string;
	} = {}
): Promise<UnsplashImageWithCache[]> {
	if (!UNSPLASH_ACCESS_KEY) {
		console.warn(
			'Unsplash access key not found. Using fallback images.'
		);
		return getFallbackImages(count, options);
	}

	try {
		const {
			width,
			height,
			format,
			quality,
			orientation,
			cacheImages = true,
			category,
		} = options;
		const params = new URLSearchParams({
			query: encodeURIComponent(query),
			per_page: count.toString(),
		});

		if (orientation) {
			params.append('orientation', orientation);
		}

		const response = await fetch(
			`https://api.unsplash.com/search/photos?${params.toString()}`,
			{
				headers: {
					Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				'Failed to fetch images from Unsplash'
			);
		}

		const data = await response.json();
		const images = data.results || [];

		// Apply optimization parameters to image URLs
		const optimizedImages = images.map((image) =>
			optimizeImageUrls(image, options)
		);

		// Cache images if requested
		if (cacheImages) {
			await cacheImagesForOffline(
				optimizedImages,
				category
			);
		}

		// Add cache information to images
		const imagesWithCache = await Promise.all(
			optimizedImages.map(async (image) => {
				const isCached =
					await imageCacheService.isImageCached(
						image.id
					);
				const cachedUrl = isCached
					? await imageCacheService.getCachedImageUrl(
							image.id
						)
					: undefined;

				return {
					...image,
					isCached,
					cachedUrl,
				};
			})
		);

		return imagesWithCache;
	} catch (error) {
		console.error(
			'Error fetching Unsplash images:',
			error
		);
		return getFallbackImages(count, options);
	}
}

export async function getRandomUnsplashImage(
	query: string,
	options: {
		width?: number;
		height?: number;
		format?: ImageFormat;
		quality?: number;
		orientation?: 'landscape' | 'portrait' | 'squarish';
		cacheImages?: boolean;
		category?: string;
	} = {}
): Promise<UnsplashImageWithCache | null> {
	const images = await getUnsplashImages(
		query,
		1,
		options
	);
	return images[0] || null;
}

/**
 * Cache images for offline use
 */
async function cacheImagesForOffline(
	images: UnsplashImage[],
	category?: string
): Promise<void> {
	try {
		const cachePromises = images.map(async (image) => {
			// Cache the regular size image (most commonly used)
			await imageCacheService.cacheImage(
				image.urls.regular,
				image.id,
				{ category }
			);
		});

		await Promise.allSettled(cachePromises);
	} catch (error) {
		console.error(
			'Failed to cache images for offline use:',
			error
		);
	}
}

/**
 * Get cached images for offline use
 */
export async function getCachedImages(
	category?: string
): Promise<UnsplashImageWithCache[]> {
	try {
		const cachedImages =
			await imageCacheService.getCachedImages(
				category
			);

		return cachedImages.map((cached) => ({
			id: cached.id,
			urls: {
				raw: cached.url,
				full: cached.url,
				regular: cached.url,
				small: cached.url,
				thumb: cached.url,
			},
			alt_description: `Cached image ${cached.id}`,
			user: {
				name: 'Cached Image',
				links: {
					html: '#',
				},
			},
			isCached: true,
			cachedUrl: cached.url,
		}));
	} catch (error) {
		console.error(
			'Failed to get cached images:',
			error
		);
		return [];
	}
}

/**
 * Preload images for offline use
 */
export async function preloadImagesForOffline(
	queries: string[],
	count: number = 5,
	category?: string
): Promise<CachedImage[]> {
	try {
		const allImages: Array<{
			id: string;
			url: string;
			category?: string;
		}> = [];

		for (const query of queries) {
			const images = await getUnsplashImages(
				query,
				count,
				{
					cacheImages: false, // Don't cache during preload to avoid double caching
					category,
				}
			);

			images.forEach((image) => {
				allImages.push({
					id: image.id,
					url: image.urls.regular,
					category,
				});
			});
		}

		return await imageCacheService.preloadImages(
			allImages,
			{ category }
		);
	} catch (error) {
		console.error('Failed to preload images:', error);
		return [];
	}
}

/**
 * Optimize image URLs with size and format parameters
 */
function optimizeImageUrls(
	image: UnsplashImage,
	options: {
		width?: number;
		height?: number;
		format?: ImageFormat;
		quality?: number;
	}
): UnsplashImage {
	const {
		width,
		height,
		format = 'webp',
		quality = 80,
	} = options;

	if (!width && !height) {
		return image;
	}

	const optimizedUrls = { ...image.urls };

	// Apply optimization to all URL sizes
	Object.keys(optimizedUrls).forEach((key) => {
		const url = new URL(
			optimizedUrls[key as keyof typeof optimizedUrls]
		);

		if (width)
			url.searchParams.set('w', width.toString());
		if (height)
			url.searchParams.set('h', height.toString());
		url.searchParams.set('fit', 'crop');
		url.searchParams.set('crop', 'entropy');
		url.searchParams.set('fm', format);
		url.searchParams.set('q', quality.toString());
		url.searchParams.set('auto', 'format');

		optimizedUrls[key as keyof typeof optimizedUrls] =
			url.toString();
	});

	return {
		...image,
		urls: optimizedUrls,
	};
}

// Fallback images using Picsum Photos (no API key required)
function getFallbackImages(
	count: number,
	options: {
		width?: number;
		height?: number;
		format?: ImageFormat;
		quality?: number;
		cacheImages?: boolean;
		category?: string;
	} = {}
): UnsplashImageWithCache[] {
	const {
		width = 800,
		height = 600,
		format = 'webp',
		quality = 80,
		cacheImages = true,
		category,
	} = options;

	const fallbackImages = Array.from(
		{ length: count },
		(_, i) => {
			const baseUrl = `https://picsum.photos/${width}/${height}?random=${i}`;
			const optimizedUrl = `${baseUrl}&format=${format}&quality=${quality}`;

			return {
				id: `fallback-${i}`,
				urls: {
					raw: optimizedUrl,
					full: optimizedUrl,
					regular: optimizedUrl,
					small: optimizedUrl,
					thumb: optimizedUrl,
				},
				alt_description: `Fallback image ${i + 1}`,
				user: {
					name: 'Picsum Photos',
					links: {
						html: 'https://picsum.photos/',
					},
				},
			};
		}
	);

	// Cache fallback images if requested
	if (cacheImages) {
		cacheImagesForOffline(fallbackImages, category);
	}

	return fallbackImages;
}

// Predefined image categories for common use cases
export const IMAGE_CATEGORIES = {
	GYM: 'gym fitness workout',
	WEIGHT_LIFTING: 'weight lifting strength training',
	CARDIO: 'cardio exercise running',
	BODYBUILDING: 'bodybuilding muscle fitness',
	YOGA: 'yoga meditation wellness',
	PERSONAL_TRAINING: 'personal trainer fitness',
	EQUIPMENT: 'gym equipment weights',
	NUTRITION: 'healthy food nutrition',
} as const;

/**
 * Get optimized images for specific use cases
 */
export async function getOptimizedImagesForUseCase(
	category: keyof typeof IMAGE_CATEGORIES,
	useCase: 'hero' | 'card' | 'thumbnail' | 'gallery',
	count: number = 1,
	options: {
		cacheImages?: boolean;
	} = {}
): Promise<UnsplashImageWithCache[]> {
	const query = IMAGE_CATEGORIES[category];

	let imageOptions = {};

	switch (useCase) {
		case 'hero':
			imageOptions = {
				width: 1920,
				height: 1080,
				orientation: 'landscape',
			};
			break;
		case 'card':
			imageOptions = {
				width: 400,
				height: 300,
				orientation: 'landscape',
			};
			break;
		case 'thumbnail':
			imageOptions = {
				width: 150,
				height: 150,
				orientation: 'squarish',
			};
			break;
		case 'gallery':
			imageOptions = {
				width: 600,
				height: 400,
				orientation: 'landscape',
			};
			break;
	}

	return getUnsplashImages(query, count, {
		...imageOptions,
		...options,
		category: category.toLowerCase(),
	});
}
