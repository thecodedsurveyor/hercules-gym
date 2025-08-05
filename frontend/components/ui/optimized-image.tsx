'use client';

import React, { useState, memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	priority?: boolean;
	quality?: number;
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
	sizes?: string;
	onLoad?: () => void;
	onError?: () => void;
	fallbackSrc?: string;
}

const OptimizedImage = memo(
	({
		src,
		alt,
		width = 400,
		height = 300,
		className,
		priority = false,
		quality = 75,
		placeholder = 'blur',
		blurDataURL,
		sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
		onLoad,
		onError,
		fallbackSrc = '/placeholder-image.jpg',
	}: OptimizedImageProps) => {
		const [imageSrc, setImageSrc] = useState(src);
		const [isLoading, setIsLoading] = useState(true);
		const [hasError, setHasError] = useState(false);

		const handleLoad = () => {
			setIsLoading(false);
			onLoad?.();
		};

		const handleError = () => {
			if (imageSrc !== fallbackSrc) {
				setImageSrc(fallbackSrc);
				setHasError(true);
			} else {
				setIsLoading(false);
			}
			onError?.();
		};

		return (
			<div
				className={cn(
					'relative overflow-hidden',
					className
				)}
			>
				{isLoading && (
					<div className='absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center'>
						<div className='w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}

				<Image
					src={imageSrc}
					alt={alt}
					width={width}
					height={height}
					className={cn(
						'transition-opacity duration-300',
						isLoading
							? 'opacity-0'
							: 'opacity-100'
					)}
					priority={priority}
					quality={quality}
					placeholder={placeholder}
					blurDataURL={blurDataURL}
					sizes={sizes}
					onLoad={handleLoad}
					onError={handleError}
					style={{
						objectFit: 'cover',
					}}
				/>

				{hasError && (
					<div className='absolute inset-0 bg-gray-800/50 flex items-center justify-center'>
						<div className='text-center text-gray-400'>
							<div className='w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
							</div>
							<p className='text-sm'>
								Image not available
							</p>
						</div>
					</div>
				)}
			</div>
		);
	}
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
