'use client';

import { ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function BlogSection() {
	return (
		<section className='bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
				</div>
				<div className='flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='w-full md:w-[60%] pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-relaxed pl-0'>
							THE KNOWLEDGE HUB FOR{' '}
							<span className='text-brand'>
								YOUR
							</span>
							<br className='hidden sm:block' />
							<span className='text-brand'>
								FITNESS
							</span>{' '}
							JOURNEY
						</h2>
					</div>
					<div className='w-full md:w-[40%]'>
						<p className='text-sm sm:text-base md:text-xl text-gray-300 mb-6'>
							Stay informed, stay motivated.
							Explore expert tips, workout
							guides, and nutrition advice to
							help you crush your goals—on and
							off the gym floor.
						</p>
						<Button
							variant='outline'
							className='w-full sm:w-auto border-brand text-black hover:bg-brand hover:text-black bg-brand text-sm md:text-base py-3 md:py-4 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
							onClick={() =>
								(window.location.href =
									'/blog')
							}
						>
							View All
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
					{/* Blog Post 1 */}
					<Card className='bg-gray-900 border-gray-700 overflow-hidden text-white'>
						<Image
							src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Blog Post'
							width={500}
							height={192}
							className='w-full h-40 sm:h-48 object-cover'
						/>
						<CardContent className='p-4 md:p-6 text-white'>
							<div className='text-[10px] sm:text-xs md:text-sm text-gray-400 mb-2'>
								10 June, 2025
							</div>
							<h3 className='text-sm sm:text-base md:text-xl font-bold mb-4'>
								TOP 10 BEGINNER MISTAKES IN
								THE GYM AND HOW TO AVOID
								THEM
							</h3>
							<Button
								className='w-full sm:w-auto bg-brand text-black hover:bg-brand/80 text-sm md:text-base py-3 md:py-4 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/blog')
								}
							>
								Read More
							</Button>
						</CardContent>
					</Card>

					{/* Blog Post 2 */}
					<Card className='bg-gray-900 border-gray-700 overflow-hidden text-white'>
						<Image
							src='https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Blog Post'
							width={500}
							height={192}
							className='w-full h-40 sm:h-48 object-cover'
						/>
						<CardContent className='p-4 md:p-6 text-white'>
							<div className='text-[10px] sm:text-xs md:text-sm text-gray-400 mb-2'>
								02 June, 2025
							</div>
							<h3 className='text-sm sm:text-base md:text-xl font-bold mb-4'>
								WEIGHT LOSS VS. FAT LOSS:
								WHAT&apos;S THE REAL
								DIFFERENCE?
							</h3>
							<Button
								className='w-full sm:w-auto bg-brand text-black hover:bg-brand/80 text-sm md:text-base py-3 md:py-4 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/blog')
								}
							>
								Read More
							</Button>
						</CardContent>
					</Card>

					{/* Blog Post 3 */}
					<Card className='bg-gray-900 border-gray-700 overflow-hidden text-white'>
						<Image
							src='https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Blog Post'
							width={500}
							height={192}
							className='w-full h-40 sm:h-48 object-cover'
						/>
						<CardContent className='p-4 md:p-6 text-white'>
							<div className='text-[10px] sm:text-xs md:text-sm text-gray-400 mb-2'>
								28 May, 2025
							</div>
							<h3 className='text-sm sm:text-base md:text-xl font-bold mb-4'>
								MEAL PREP FOR MUSCLE GAIN: A
								SIMPLE GUIDE FOR BUSY PEOPLE
							</h3>
							<Button
								className='w-full sm:w-auto bg-brand text-black hover:bg-brand/80 text-sm md:text-base py-3 md:py-4 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/blog')
								}
							>
								Read More
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
