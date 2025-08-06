import { UnsplashImage } from './unsplash';

// Image format types
export type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png';

// Responsive breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

// Device sizes for responsive images (optimized for common screen sizes)
export const DEVICE_SIZES = [
	640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

// Image sizes for different use cases (optimized for performance)
export const IMAGE_SIZES = [
	16, 32, 48, 64, 96, 128, 256, 384,
];

// Cache for optimized URLs to avoid regeneration
const urlCache = new Map<string, string>();

/**
 * Generate responsive image sizes attribute
 */
export function generateSizes(
	defaultSize: string = '100vw',
	breakpoints: Record<string, string> = {}
): string {
	const sizes = Object.entries(breakpoints)
		.map(
			([breakpoint, size]) =>
				`(min-width: ${BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS]}px) ${size}`
		)
		.join(', ');

	return sizes ? `${sizes}, ${defaultSize}` : defaultSize;
}

/**
 * Generate optimized Unsplash URL with specific parameters
 */
export function generateOptimizedUnsplashUrl(
	imageUrl: string,
	width: number,
	height?: number,
	format: ImageFormat = 'webp',
	quality: number = 80
): string {
	// Create cache key
	const cacheKey = `${imageUrl}-${width}-${height}-${format}-${quality}`;

	// Check cache first
	if (urlCache.has(cacheKey)) {
		return urlCache.get(cacheKey)!;
	}

	const url = new URL(imageUrl);

	// Add optimization parameters
	url.searchParams.set('w', width.toString());
	if (height) {
		url.searchParams.set('h', height.toString());
	}
	url.searchParams.set('fit', 'crop');
	url.searchParams.set('crop', 'entropy');
	url.searchParams.set('fm', format);
	url.searchParams.set('q', quality.toString());
	url.searchParams.set('auto', 'format');

	// Add cache parameters for better CDN performance
	url.searchParams.set('cs', 'tinysrgb');

	const optimizedUrl = url.toString();

	// Cache the result
	urlCache.set(cacheKey, optimizedUrl);

	return optimizedUrl;
}

/**
 * Generate responsive Unsplash URLs for different screen sizes
 */
export function generateResponsiveUnsplashUrls(
	imageUrl: string,
	sizes: number[],
	format: ImageFormat = 'webp',
	quality: number = 80
): string[] {
	return sizes.map((size) =>
		generateOptimizedUnsplashUrl(
			imageUrl,
			size,
			undefined,
			format,
			quality
		)
	);
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalFormat(): ImageFormat {
	// In a real app, you'd detect browser support
	// For now, default to webp as it has good support
	return 'webp';
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
	imageUrl: string,
	sizes: number[],
	format: ImageFormat = 'webp',
	quality: number = 80
): string {
	const urls = generateResponsiveUnsplashUrls(
		imageUrl,
		sizes,
		format,
		quality
	);

	return urls
		.map((url, index) => `${url} ${sizes[index]}w`)
		.join(', ');
}

/**
 * Optimize Unsplash image with responsive URLs and proper sizing
 */
export function optimizeUnsplashImage(
	image: UnsplashImage,
	targetWidth: number,
	targetHeight?: number,
	format: ImageFormat = 'webp'
): {
	src: string;
	srcSet: string;
	sizes: string;
	placeholder: string;
} {
	// Use optimal format
	const optimalFormat = getOptimalFormat();

	// Generate responsive sizes based on target width
	const responsiveSizes = DEVICE_SIZES.filter(
		(size) => size <= targetWidth * 2
	);

	// Generate optimized source URL
	const src = generateOptimizedUnsplashUrl(
		image.urls.raw,
		targetWidth,
		targetHeight,
		optimalFormat,
		85 // Higher quality for main image
	);

	// Generate srcSet for responsive loading
	const srcSet = generateSrcSet(
		image.urls.raw,
		responsiveSizes,
		optimalFormat,
		75 // Lower quality for responsive images to save bandwidth
	);

	// Generate sizes attribute
	const sizes = generateSizes(`${targetWidth}px`);

	// Use blur hash for placeholder if available
	const placeholder = image.blur_hash
		? `data:image/svg+xml;base64,${image.blur_hash}`
		: generateBlurDataURL(
				targetWidth,
				targetHeight || targetWidth
			);

	return {
		src,
		srcSet,
		sizes,
		placeholder,
	};
}

/**
 * Get image sizes for different use cases
 */
export function getImageSizesForUseCase(
	useCase: 'hero' | 'card' | 'thumbnail' | 'gallery'
): {
	width: number;
	height: number;
	sizes: number[];
} {
	switch (useCase) {
		case 'hero':
			return {
				width: 1920,
				height: 1080,
				sizes: [640, 750, 828, 1080, 1200, 1920],
			};
		case 'card':
			return {
				width: 400,
				height: 300,
				sizes: [400, 600, 800],
			};
		case 'thumbnail':
			return {
				width: 150,
				height: 150,
				sizes: [150, 300],
			};
		case 'gallery':
			return {
				width: 600,
				height: 400,
				sizes: [400, 600, 800, 1200],
			};
		default:
			return {
				width: 400,
				height: 300,
				sizes: [400, 600, 800],
			};
	}
}

/**
 * Generate a simple blur data URL for placeholder
 */
export function generateBlurDataURL(
	width: number,
	height: number
): string {
	// Create a simple SVG placeholder
	const svg = `
		<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#f3f4f6"/>
			<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">Loading...</text>
		</svg>
	`;

	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): void {
	if (typeof window !== 'undefined') {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = src;
		document.head.appendChild(link);
	}
}

/**
 * Clear URL cache (useful for memory management)
 */
export function clearUrlCache(): void {
	urlCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
	size: number;
	keys: string[];
} {
	return {
		size: urlCache.size,
		keys: Array.from(urlCache.keys()),
	};
}
