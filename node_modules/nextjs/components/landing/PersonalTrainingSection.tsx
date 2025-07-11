import React from 'react';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';

const PersonalTraining = () => {
	return (
		<section className='bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
					{/* Left Content */}
					<div className='space-y-6 md:space-y-8'>
						{/* Header with Icon */}
						<div>
							<div className='mb-2 pl-0'>
								<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
							</div>
							<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight'>
								PERSONAL{' '}
								<span className='text-brand'>
									TRAINING
								</span>
							</h2>
						</div>

						{/* Try Us For Free Card */}
						<div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 w-full md:max-w-md'>
							<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
								TRY US FOR FREE
							</h3>
							<p className='text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed'>
								Experience a full personal
								training session, free of
								charge.
							</p>
							<button className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
								Sign Up
							</button>
						</div>
					</div>

					{/* Right Content */}
					<div className='space-y-6 md:space-y-8'>
						{/* Main Training Image */}
						<div className='relative'>
							<div className='bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl p-4 md:p-8 backdrop-blur-sm border border-gray-700/30'>
								<Image
									src='https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600'
									alt='Personal training session'
									width={600}
									height={320}
									className='w-full h-60 md:h-80 object-cover rounded-2xl'
								/>
							</div>
						</div>

						{/* Trainer Stats and Secondary Image */}
						<div className='flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:justify-between'>
							<div className='flex-1 space-y-4'>
								<p className='text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed'>
									Whether you&apos;re
									looking to build muscle,
									lose fat, or improve
									mobility, every session
									is customized to fit
									your needs and fitness
									level.
								</p>
								<button className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
									Explore More
								</button>
							</div>

							<div className='w-full sm:w-auto sm:ml-8'>
								<div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-gray-700/50'>
									<Image
										src='https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400'
										alt='Trainer with client'
										width={400}
										height={267}
										className='w-full sm:w-48 h-32 object-cover rounded-xl mb-4'
									/>
									<div className='absolute -top-2 -right-2 bg-brand text-black px-3 py-2 rounded-lg font-bold'>
										<div className='text-lg md:text-xl font-black'>
											10+
										</div>
										<div className='text-[10px] sm:text-xs'>
											Personal
											Trainers
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PersonalTraining;
