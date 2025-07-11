'use client';

import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';

export default function ProgramsSection() {
	return (
		<section className='py-12 md:py-20 bg-black'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
				</div>
				<div className='flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='w-full md:w-[60%] pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold'>
							PROGRAMS THAT{' '}
							<span className='text-brand'>
								FIT YOU
							</span>
						</h2>
					</div>
					<div className='w-full md:w-[40%]'>
						<p className='text-sm sm:text-base md:text-xl text-gray-300'>
							Whether you&apos;re just
							starting or leveling up, our
							coaching is built around your
							needs, not a one-size-fits-all
							plan.
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
					{/* Weight Lifting */}
					<div className='relative group overflow-hidden rounded-lg'>
						<Image
							src='https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Weight Lifting'
							width={500}
							height={320}
							className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 md:bottom-6 left-4 md:left-6'>
							<h3 className='text-base sm:text-lg md:text-2xl font-bold'>
								WEIGHT LIFTING
							</h3>
						</div>
					</div>

					{/* Cardio */}
					<div className='relative group overflow-hidden rounded-lg'>
						<Image
							src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Cardio'
							width={500}
							height={320}
							className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 md:bottom-6 left-4 md:left-6'>
							<h3 className='text-base sm:text-lg md:text-2xl font-bold'>
								CARDIO
							</h3>
						</div>
					</div>

					{/* Bodybuilding */}
					<div className='relative group overflow-hidden rounded-lg'>
						<Image
							src='https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Bodybuilding'
							width={500}
							height={320}
							className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 md:bottom-6 left-4 md:left-6'>
							<h3 className='text-base sm:text-lg md:text-2xl font-bold'>
								BODYBUILDING
							</h3>
						</div>
					</div>

					{/* Regular Workout */}
					<div className='relative group overflow-hidden rounded-lg'>
						<Image
							src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Regular Workout'
							width={500}
							height={320}
							className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 md:bottom-6 left-4 md:left-6'>
							<h3 className='text-base sm:text-lg md:text-2xl font-bold'>
								REGULAR WORKOUT
							</h3>
						</div>
					</div>

					{/* Screeching Workout */}
					<div className='relative group overflow-hidden rounded-lg'>
						<Image
							src='https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
							alt='Screeching Workout'
							width={500}
							height={320}
							className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform group-hover:scale-110'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
						<div className='absolute bottom-4 md:bottom-6 left-4 md:left-6'>
							<h3 className='text-base sm:text-lg md:text-2xl font-bold'>
								SCREECHING WORKOUT
							</h3>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
