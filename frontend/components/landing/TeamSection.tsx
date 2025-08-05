'use client';

import React, { useState } from 'react';
import {
	ChevronRight,
	Star,
	Award,
	Users,
	ChevronsRight,
} from 'lucide-react';
import Image from 'next/image';

interface Coach {
	id: string;
	name: string;
	title: string;
	image: string;
	specialties: string[];
	experience: string;
	rating: number;
	clients: number;
	bio: string;
}

const Coaches = () => {
	const [selectedCoach, setSelectedCoach] = useState<
		string | null
	>(null);

	const coaches: Coach[] = [
		{
			id: 'adebayo',
			name: 'ADEBAYO ADELEKE',
			title: 'Personal Trainer',
			image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
			specialties: [
				'Strength Training',
				'Weight Loss',
				'Muscle Building',
			],
			experience: '8+ Years',
			rating: 4.9,
			clients: 150,
			bio: 'Adebayo specializes in strength training and has helped over 150 clients achieve their fitness goals through personalized workout plans. He brings a unique blend of traditional Nigerian fitness wisdom with modern training techniques.',
		},
		{
			id: 'chioma',
			name: 'CHIOMA OKAFOR',
			title: 'Personal Trainer',
			image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600',
			specialties: [
				'Yoga',
				'Flexibility',
				'Mindfulness',
			],
			experience: '6+ Years',
			rating: 4.8,
			clients: 120,
			bio: 'Chioma brings a holistic approach to fitness, combining physical training with mental wellness through yoga and mindfulness practices. Her sessions incorporate elements of Nigerian wellness traditions.',
		},
		{
			id: 'emeka',
			name: 'EMEKA NWANKWO',
			title: 'Personal Trainer',
			image: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=600',
			specialties: [
				'HIIT',
				'Cardio',
				'Athletic Performance',
			],
			experience: '10+ Years',
			rating: 4.9,
			clients: 200,
			bio: 'Emeka is our HIIT specialist, focusing on high-intensity training that delivers maximum results in minimum time for busy professionals. He has trained numerous Nigerian athletes and fitness enthusiasts.',
		},
	];

	const handleCoachSelect = (coachId: string) => {
		setSelectedCoach(
			selectedCoach === coachId ? null : coachId
		);
	};

	return (
		<section className='py-12 md:py-20 bg-black px-4 sm:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
				</div>
				<div className='flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='w-full md:w-[60%] pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight'>
							TEAM OF{' '}
							<span className='text-brand'>
								EXPERT COACHES
							</span>
						</h2>
					</div>
					<div className='w-full md:w-[40%]'>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed'>
							Our expert trainers are here to
							guide you through your fitness
							journey. Each brings unique
							expertise and a proven track
							record of transforming lives.
						</p>
					</div>
				</div>

				{/* Coaches Grid */}
				<div className='flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8'>
					{coaches.map((coach) => (
						<div
							key={coach.id}
							className={`group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
								selectedCoach === coach.id
									? 'ring-2 ring-brand'
									: ''
							}`}
						>
							{/* Coach Image Container */}
							<div className='relative h-64 sm:h-72 md:h-80 overflow-hidden'>
								<Image
									src={coach.image}
									alt={coach.name}
									width={600}
									height={400}
									className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
								/>

								{/* Gradient Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>

								{/* Basic Info Overlay */}
								<div className='absolute bottom-0 left-0 right-0 p-4 md:p-6'>
									<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 tracking-wide'>
										{coach.name}
									</h3>
									<p className='text-brand text-sm font-medium mb-3'>
										{coach.title}
									</p>

									{/* Stats */}
									<div className='flex items-center gap-4 text-xs sm:text-sm text-gray-300'>
										<div className='flex items-center gap-1'>
											<Star className='w-4 h-4 text-yellow-400 fill-current' />
											<span>
												{
													coach.rating
												}
											</span>
										</div>
										<div className='flex items-center gap-1'>
											<Users className='w-4 h-4 text-brand' />
											<span>
												{
													coach.clients
												}
												+ clients
											</span>
										</div>
										<div className='flex items-center gap-1'>
											<Award className='w-4 h-4 text-blue-400' />
											<span>
												{
													coach.experience
												}
											</span>
										</div>
									</div>
								</div>

								{/* Desktop Overlay - Black background with sliding info */}
								<div
									className={`hidden lg:block absolute inset-0 bg-black/90 transition-all duration-500 ease-in-out ${
										selectedCoach ===
										coach.id
											? 'opacity-100'
											: 'opacity-0 pointer-events-none'
									}`}
								>
									<div
										className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ease-in-out ${
											selectedCoach ===
											coach.id
												? 'translate-y-0'
												: 'translate-y-full'
										}`}
									>
										<p className='text-gray-300 text-base leading-relaxed mb-4'>
											{coach.bio}
										</p>

										<div className='mb-4'>
											<h4 className='text-white font-semibold text-base mb-2'>
												Specialties:
											</h4>
											<div className='flex flex-wrap gap-2'>
												{coach.specialties.map(
													(
														specialty,
														idx
													) => (
														<span
															key={
																idx
															}
															className='bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-medium'
														>
															{
																specialty
															}
														</span>
													)
												)}
											</div>
										</div>

										<button
											className='w-full bg-brand hover:bg-brand/80 text-black py-3 md:py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
											onClick={() =>
												(window.location.href =
													'/get-started')
											}
										>
											Book Session
										</button>
									</div>
								</div>

								{/* Expand Button */}
								<button
									onClick={() =>
										handleCoachSelect(
											coach.id
										)
									}
									className='absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-brand hover:bg-brand/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-brand/25 z-10'
								>
									<ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-black' />
								</button>
							</div>

							{/* Mobile Expanded Details */}
							<div
								className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
									selectedCoach ===
									coach.id
										? 'max-h-96'
										: 'max-h-0'
								}`}
							>
								<div className='p-4 md:p-6 bg-gray-800/60 backdrop-blur-sm border-t border-gray-700/50'>
									<p className='text-gray-300 text-sm sm:text-base leading-relaxed mb-4'>
										{coach.bio}
									</p>

									<div className='mb-4'>
										<h4 className='text-white font-semibold text-sm sm:text-base mb-2'>
											Specialties:
										</h4>
										<div className='flex flex-wrap gap-2'>
											{coach.specialties.map(
												(
													specialty,
													idx
												) => (
													<span
														key={
															idx
														}
														className='bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-medium'
													>
														{
															specialty
														}
													</span>
												)
											)}
										</div>
									</div>

									<button
										className='w-full bg-brand hover:bg-brand/80 text-black py-3 md:py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
										onClick={() =>
											(window.location.href =
												'/get-started')
										}
									>
										Book Session
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className='text-center mt-12 md:mt-16'>
					<div className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto'>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
							Ready to Start Your Fitness
							Journey?
						</h3>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed'>
							Our expert coaches are here to
							guide you every step of the way.
							Book a consultation today and
							discover your potential.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Book Free Consultation
							</button>
							<button
								className='w-full sm:w-auto bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-lg transition-all duration-200 hover:bg-gray-800/50'
								onClick={() =>
									(window.location.href =
										'/coaches')
								}
							>
								View All Coaches
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Coaches;
