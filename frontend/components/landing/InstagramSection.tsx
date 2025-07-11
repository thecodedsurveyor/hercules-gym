'use client';

import { Instagram, ChevronsRight } from 'lucide-react';

interface InstagramPost {
	id: string;
	caption: string;
	likes: number;
	comments: number;
}

export default function InstagramSection() {
	const posts: InstagramPost[] = [
		{
			id: '1',
			caption:
				'Transform your body, transform your life 💪 #FitnessGoals #GymLife',
			likes: 324,
			comments: 18,
		},
		{
			id: '2',
			caption:
				'Morning workout motivation! Ready to crush it 🔥 #MorningWorkout',
			likes: 456,
			comments: 32,
		},
		{
			id: '3',
			caption:
				'New equipment just arrived! Come check it out 🎉 #GymEquipment',
			likes: 289,
			comments: 24,
		},
		{
			id: '4',
			caption:
				'Weekend warrior mode activated 💯 #WeekendWorkout #FitFam',
			likes: 567,
			comments: 45,
		},
	];

	return (
		<section className='py-12 md:py-20 bg-black'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-lime-500' />
				</div>
				<div className='flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='w-full md:w-[60%] pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight'>
							FOLLOW US ON{' '}
							<span className='text-lime-500'>
								INSTAGRAM
							</span>
						</h2>
					</div>
					<div className='w-full md:w-[40%]'>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed'>
							Join our thriving fitness
							community for daily inspiration,
							workout tips, healthy recipes,
							and exclusive behind-the-scenes
							content.
						</p>
					</div>
				</div>

				{/* Instagram Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
					{posts.map((post) => (
						<div
							key={post.id}
							className='group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden p-6'
						>
							<div className='flex flex-col h-full'>
								{/* Caption */}
								<p className='text-white text-sm md:text-base mb-4 flex-grow'>
									{post.caption}
								</p>

								{/* Stats */}
								<div className='flex items-center gap-4 text-white/90'>
									<span className='flex items-center gap-1'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
										</svg>
										{post.likes}
									</span>
									<span className='flex items-center gap-1'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M21 15a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10zm-4-5V5H9v2h6a2 2 0 0 1 2 2v1zm2 0h-2v2h2V9z' />
										</svg>
										{post.comments}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className='text-center mt-12 md:mt-16'>
					<div className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto'>
						<div className='flex items-center justify-center mb-6'>
							<Instagram className='w-8 h-8 md:w-10 md:h-10 text-lime-500' />
						</div>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
							Join Our Instagram Community
						</h3>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed'>
							Follow us for daily motivation,
							workout tips, and exclusive
							content. Be part of our growing
							fitness family!
						</p>
						<a
							href='https://instagram.com/herculesgym'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg'
						>
							<Instagram className='w-5 h-5' />
							Follow @herculesgym
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
