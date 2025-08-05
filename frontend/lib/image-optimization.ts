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

// Device sizes for responsive images
export const DEVICE_SIZES = [
	640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

// Image sizes for different use cases
export const IMAGE_SIZES = [
	16, 32, 48, 64, 96, 128, 256, 384,
];

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

	return url.toString();
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
	return sizes
		.map((size) => {
			const optimizedUrl =
				generateOptimizedUnsplashUrl(
					imageUrl,
					size,
					undefined,
					format,
					quality
				);
			return `${optimizedUrl} ${size}w`;
		})
		.join(', ');
}

/**
 * Optimize UnsplashImage object with responsive URLs
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
	const optimizedSrc = generateOptimizedUnsplashUrl(
		image.urls.raw,
		targetWidth,
		targetHeight,
		format
	);

	const srcSet = generateSrcSet(
		image.urls.raw,
		[targetWidth, targetWidth * 1.5, targetWidth * 2],
		format
	);

	const sizes = generateSizes(`${targetWidth}px`, {
		sm: `${Math.min(targetWidth, 640)}px`,
		md: `${Math.min(targetWidth, 768)}px`,
		lg: `${Math.min(targetWidth, 1024)}px`,
		xl: `${Math.min(targetWidth, 1280)}px`,
	});

	return {
		src: optimizedSrc,
		srcSet,
		sizes,
		placeholder: image.urls.thumb || image.urls.small,
	};
}

/**
 * Get appropriate image sizes for different use cases
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
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(
	width: number,
	height: number
): string {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');

	if (ctx) {
		ctx.fillStyle = '#f3f4f6';
		ctx.fillRect(0, 0, width, height);
	}

	return canvas.toDataURL();
}
