import React from 'react';
import Image from 'next/image';
import { UnsplashImage } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import {
	useRandomUnsplashImage,
	useOptimizedImagesForUseCase,
} from '@/hooks/use-unsplash-images';
import {
	optimizeUnsplashImage,
	getImageSizesForUseCase,
	generateSizes,
} from '@/lib/image-optimization';

interface UnsplashImageProps {
	image: UnsplashImage;
	alt?: string;
	className?: string;
	width?: number;
	height?: number;
	priority?: boolean;
	showAttribution?: boolean;
	attributionClassName?: string;
	useCase?: 'hero' | 'card' | 'thumbnail' | 'gallery';
	sizes?: string;
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
}

export function UnsplashImageComponent({
	image,
	alt,
	className,
	width,
	height,
	priority = false,
	showAttribution = true,
	attributionClassName,
	useCase,
	sizes,
	placeholder = 'empty',
	blurDataURL,
}: UnsplashImageProps) {
	const imageAlt =
		alt || image.alt_description || 'Unsplash image';

	// Use useCase to determine optimal sizing if not provided
	const imageSizes = useCase
		? getImageSizesForUseCase(useCase)
		: null;
	const finalWidth = width || imageSizes?.width || 400;
	const finalHeight = height || imageSizes?.height || 300;

	// Optimize the image with responsive URLs
	const optimizedImage = optimizeUnsplashImage(
		image,
		finalWidth,
		finalHeight
	);

	// Generate sizes attribute if not provided
	const finalSizes = sizes || optimizedImage.sizes;

	return (
		<div className='relative group'>
			<Image
				src={optimizedImage.src}
				alt={imageAlt}
				width={finalWidth}
				height={finalHeight}
				className={cn(
					'object-cover rounded-lg transition-transform duration-300 group-hover:scale-105',
					className
				)}
				priority={priority}
				sizes={finalSizes}
				placeholder={placeholder}
				blurDataURL={
					blurDataURL ||
					optimizedImage.placeholder
				}
				quality={85}
			/>

			{showAttribution && (
				<div
					className={cn(
						'absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300',
						attributionClassName
					)}
				>
					Photo by{' '}
					<a
						href={`${image.user.links.html}?utm_source=hercules_gym&utm_medium=referral`}
						target='_blank'
						rel='noopener noreferrer'
						className='underline hover:text-brand transition-colors'
					>
						{image.user.name}
					</a>{' '}
					on{' '}
					<a
						href='https://unsplash.com/?utm_source=hercules_gym&utm_medium=referral'
						target='_blank'
						rel='noopener noreferrer'
						className='underline hover:text-brand transition-colors'
					>
						Unsplash
					</a>
				</div>
			)}
		</div>
	);
}

interface UnsplashImageGridProps {
	images: UnsplashImage[];
	columns?: number;
	gap?: number;
	className?: string;
	showAttribution?: boolean;
	useCase?: 'hero' | 'card' | 'thumbnail' | 'gallery';
}

export function UnsplashImageGrid({
	images,
	columns = 3,
	gap = 4,
	className,
	showAttribution = true,
	useCase = 'card',
}: UnsplashImageGridProps) {
	return (
		<div
			className={cn('grid gap-4', className)}
			style={{
				gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				gap: `${gap * 0.25}rem`,
			}}
		>
			{images.map((image, index) => (
				<UnsplashImageComponent
					key={image.id}
					image={image}
					showAttribution={showAttribution}
					useCase={useCase}
					priority={index < 2} // Prioritize first 2 images
				/>
			))}
		</div>
	);
}

interface UnsplashImageWithHookProps {
	query: string;
	alt?: string;
	className?: string;
	width?: number;
	height?: number;
	priority?: boolean;
	showAttribution?: boolean;
	fallbackSrc?: string;
	useCase?: 'hero' | 'card' | 'thumbnail' | 'gallery';
	options?: {
		format?: 'webp' | 'avif' | 'jpeg' | 'png';
		quality?: number;
		orientation?: 'landscape' | 'portrait' | 'squarish';
	};
}

export function UnsplashImageWithHook({
	query,
	alt,
	className,
	width,
	height,
	priority = false,
	showAttribution = true,
	fallbackSrc,
	useCase = 'card',
	options = {},
}: UnsplashImageWithHookProps) {
	const { image, loading, error } =
		useRandomUnsplashImage(query, options);

	if (loading) {
		return (
			<div
				className={cn(
					'bg-gray-800 animate-pulse rounded-lg',
					className
				)}
				style={{ width, height }}
			/>
		);
	}

	if (error || !image) {
		if (fallbackSrc) {
			return (
				<Image
					src={fallbackSrc}
					alt={alt || 'Fallback image'}
					width={width || 400}
					height={height || 300}
					className={cn(
						'object-cover rounded-lg',
						className
					)}
					priority={priority}
				/>
			);
		}
		return (
			<div
				className={cn(
					'bg-gray-800 rounded-lg flex items-center justify-center text-gray-400',
					className
				)}
				style={{ width, height }}
			>
				<span className='text-sm'>
					Image not available
				</span>
			</div>
		);
	}

	return (
		<UnsplashImageComponent
			image={image}
			alt={alt}
			className={className}
			width={width}
			height={height}
			priority={priority}
			showAttribution={showAttribution}
			useCase={useCase}
		/>
	);
}

// New optimized component for specific use cases
interface OptimizedUnsplashImageProps {
	category: keyof typeof import('@/lib/unsplash').IMAGE_CATEGORIES;
	useCase: 'hero' | 'card' | 'thumbnail' | 'gallery';
	alt?: string;
	className?: string;
	priority?: boolean;
	showAttribution?: boolean;
	count?: number;
}

export function OptimizedUnsplashImage({
	category,
	useCase,
	alt,
	className,
	priority = false,
	showAttribution = true,
	count = 1,
}: OptimizedUnsplashImageProps) {
	const { images, loading, error } =
		useOptimizedImagesForUseCase(
			category,
			useCase,
			count
		);

	if (loading) {
		const sizes = getImageSizesForUseCase(useCase);
		return (
			<div
				className={cn(
					'bg-gray-800 animate-pulse rounded-lg',
					className
				)}
				style={{
					width: sizes.width,
					height: sizes.height,
				}}
			/>
		);
	}

	if (error || !images.length) {
		return (
			<div
				className={cn(
					'bg-gray-800 rounded-lg flex items-center justify-center text-gray-400',
					className
				)}
			>
				<span className='text-sm'>
					Image not available
				</span>
			</div>
		);
	}

	if (count === 1) {
		return (
			<UnsplashImageComponent
				image={images[0]}
				alt={alt}
				className={className}
				priority={priority}
				showAttribution={showAttribution}
				useCase={useCase}
			/>
		);
	}

	return (
		<UnsplashImageGrid
			images={images}
			showAttribution={showAttribution}
			useCase={useCase}
			className={className}
		/>
	);
}
