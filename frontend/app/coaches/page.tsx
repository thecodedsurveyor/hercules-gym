'use client';

import React, { useState } from 'react';
import {
	ChevronRight,
	Star,
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
	achievements?: string[];
	availability?: string;
}

const coaches: Coach[] = [
	{
		id: '1',
		name: 'Marcus Johnson',
		title: 'Head Strength Coach',
		image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Strength Training',
			'Powerlifting',
			'Muscle Building',
			'Athletic Performance',
		],
		experience: '8+ years',
		rating: 5,
		clients: 150,
		bio: 'Marcus is a certified strength and conditioning specialist with a passion for helping athletes and fitness enthusiasts reach their peak performance. His systematic approach to training has helped hundreds of clients achieve their strength goals.',
		achievements: [
			'Certified Strength Coach',
			'Former Powerlifting Champion',
			'Sports Nutrition Specialist',
		],
		availability: 'Mon-Fri: 6AM-8PM, Sat: 8AM-4PM',
	},
	{
		id: '2',
		name: 'Sarah Chen',
		title: 'Cardio & HIIT Specialist',
		image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Cardio Training',
			'HIIT Workouts',
			'Weight Loss',
			'Endurance Building',
		],
		experience: '6+ years',
		rating: 5,
		clients: 120,
		bio: 'Sarah specializes in high-intensity interval training and cardiovascular conditioning. Her dynamic approach to fitness helps clients burn fat, build endurance, and develop sustainable healthy habits.',
		achievements: [
			'ACE Certified Personal Trainer',
			'HIIT Specialist',
			'Nutrition Coach',
		],
		availability: 'Mon-Sat: 7AM-7PM',
	},
	{
		id: '3',
		name: 'David Rodriguez',
		title: 'Bodybuilding Expert',
		image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Bodybuilding',
			'Muscle Hypertrophy',
			'Competition Prep',
			'Nutrition Planning',
		],
		experience: '10+ years',
		rating: 5,
		clients: 200,
		bio: 'David is a former competitive bodybuilder who now dedicates his expertise to helping others achieve their physique goals. His comprehensive approach covers training, nutrition, and mindset.',
		achievements: [
			'Former IFBB Pro',
			'Certified Nutritionist',
			'Bodybuilding Coach',
		],
		availability: 'Mon-Sun: 5AM-10PM',
	},
	{
		id: '4',
		name: 'Emily Thompson',
		title: 'Functional Fitness Coach',
		image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Functional Training',
			'Mobility Work',
			'Injury Prevention',
			'Rehabilitation',
		],
		experience: '7+ years',
		rating: 5,
		clients: 180,
		bio: 'Emily focuses on functional movement patterns and injury prevention. Her background in physical therapy helps clients move better, feel better, and achieve their fitness goals safely.',
		achievements: [
			'Physical Therapy Assistant',
			'Functional Movement Specialist',
			'Rehabilitation Expert',
		],
		availability: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
	},
	{
		id: '5',
		name: 'Alex Kim',
		title: 'CrossFit & Olympic Lifting Coach',
		image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'CrossFit',
			'Olympic Lifting',
			'Gymnastics',
			'Competition Training',
		],
		experience: '9+ years',
		rating: 5,
		clients: 160,
		bio: 'Alex is a CrossFit Level 2 trainer and Olympic lifting specialist. His coaching helps athletes develop strength, power, and technical proficiency in complex movements.',
		achievements: [
			'CrossFit Level 2 Trainer',
			'USA Weightlifting Coach',
			'Former Competitive Athlete',
		],
		availability: 'Mon-Sat: 6AM-8PM',
	},
	{
		id: '6',
		name: 'Lisa Wang',
		title: 'Yoga & Wellness Coach',
		image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Yoga',
			'Mindfulness',
			'Stress Management',
			'Recovery',
		],
		experience: '5+ years',
		rating: 5,
		clients: 90,
		bio: 'Lisa combines traditional yoga practices with modern fitness principles to create holistic wellness programs. Her approach emphasizes mental and physical balance.',
		achievements: [
			'RYT-500 Yoga Teacher',
			'Meditation Instructor',
			'Wellness Coach',
		],
		availability: 'Mon-Sun: 7AM-9PM',
	},
	{
		id: '7',
		name: 'Mike Wilson',
		title: 'Senior Fitness Specialist',
		image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Senior Fitness',
			'Balance Training',
			'Joint Health',
			'Low-Impact Exercise',
		],
		experience: '12+ years',
		rating: 5,
		clients: 110,
		bio: 'Mike specializes in helping older adults maintain strength, mobility, and independence through age-appropriate exercise programs. His gentle approach makes fitness accessible to everyone.',
		achievements: [
			'Senior Fitness Specialist',
			'Balance & Fall Prevention Expert',
			'Geriatric Exercise Specialist',
		],
		availability: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM',
	},
	{
		id: '8',
		name: 'Jessica Martinez',
		title: 'Prenatal & Postnatal Coach',
		image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
		specialties: [
			'Prenatal Fitness',
			'Postnatal Recovery',
			'Core Rehabilitation',
			'Pelvic Health',
		],
		experience: '6+ years',
		rating: 5,
		clients: 85,
		bio: 'Jessica is certified in prenatal and postnatal fitness, helping mothers stay strong and healthy throughout pregnancy and recover safely after childbirth.',
		achievements: [
			'Prenatal Fitness Specialist',
			'Postnatal Recovery Expert',
			'Pelvic Floor Specialist',
		],
		availability: 'Mon-Fri: 8AM-6PM, Sat: 9AM-1PM',
	},
];

export default function CoachesPage() {
	const [selectedCoach, setSelectedCoach] = useState<
		string | null
	>(null);
	const [filterSpecialty, setFilterSpecialty] =
		useState<string>('all');

	const specialties = [
		'all',
		...Array.from(
			new Set(
				coaches.flatMap(
					(coach) => coach.specialties
				)
			)
		),
	];

	const filteredCoaches = coaches.filter(
		(coach) =>
			filterSpecialty === 'all' ||
			coach.specialties.includes(filterSpecialty)
	);

	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Section */}
			<section className='py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
				<div className='container mx-auto px-4 md:px-6 text-center'>
					<div className='mb-4'>
						<ChevronsRight className='w-16 h-16 md:w-24 md:h-24 text-brand mx-auto' />
					</div>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6'>
						MEET OUR{' '}
						<span className='text-brand'>
							EXPERT COACHES
						</span>
					</h1>
					<p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
						Our certified personal trainers are
						here to guide you on your fitness
						journey. Each coach brings unique
						expertise and a passion for helping
						you achieve your goals.
					</p>
				</div>
			</section>

			{/* Filter Section */}
			<section className='py-8 bg-black border-b border-gray-800'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='flex flex-wrap gap-3 justify-center'>
						{specialties.map((specialty) => (
							<button
								key={specialty}
								onClick={() =>
									setFilterSpecialty(
										specialty
									)
								}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
									filterSpecialty ===
									specialty
										? 'bg-brand text-black'
										: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
								}`}
							>
								{specialty === 'all'
									? 'All Specialties'
									: specialty}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Coaches Grid */}
			<section className='py-16 md:py-24 bg-black'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
						{filteredCoaches.map((coach) => (
							<div
								key={coach.id}
								className='bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 transform hover:scale-105'
							>
								{/* Coach Image */}
								<div className='relative h-64 overflow-hidden'>
									<Image
										src={coach.image}
										alt={coach.name}
										width={400}
										height={256}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>

									{/* Rating */}
									<div className='absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1'>
										<div className='flex items-center space-x-1'>
											<Star className='w-4 h-4 text-yellow-400 fill-current' />
											<span className='text-white text-sm font-bold'>
												{
													coach.rating
												}
											</span>
										</div>
									</div>

									{/* Expand Button */}
									<button
										onClick={() =>
											setSelectedCoach(
												selectedCoach ===
													coach.id
													? null
													: coach.id
											)
										}
										className='absolute top-4 left-4 w-10 h-10 bg-brand hover:bg-brand/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-brand/25'
									>
										<ChevronRight
											className={`w-5 h-5 text-black transition-transform duration-300 ${selectedCoach === coach.id ? 'rotate-90' : ''}`}
										/>
									</button>
								</div>

								{/* Coach Info */}
								<div className='p-6'>
									<h3 className='text-xl font-bold text-white mb-2'>
										{coach.name}
									</h3>
									<p className='text-brand font-semibold text-sm mb-3'>
										{coach.title}
									</p>

									<div className='flex items-center justify-between text-sm text-gray-400 mb-4'>
										<span>
											{
												coach.experience
											}{' '}
											experience
										</span>
										<span>
											{coach.clients}+
											clients
										</span>
									</div>

									{/* Specialties */}
									<div className='flex flex-wrap gap-2 mb-4'>
										{coach.specialties
											.slice(0, 2)
											.map(
												(
													specialty,
													idx
												) => (
													<span
														key={
															idx
														}
														className='bg-brand/20 text-brand px-2 py-1 rounded-full text-xs font-medium'
													>
														{
															specialty
														}
													</span>
												)
											)}
										{coach.specialties
											.length > 2 && (
											<span className='bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs'>
												+
												{coach
													.specialties
													.length -
													2}{' '}
												more
											</span>
										)}
									</div>

									{/* Bio Preview */}
									<p className='text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3'>
										{coach.bio}
									</p>

									{/* Expanded Details */}
									{selectedCoach ===
										coach.id && (
										<div className='space-y-4 pt-4 border-t border-gray-700'>
											{/* Achievements */}
											{coach.achievements && (
												<div>
													<h4 className='text-white font-semibold text-sm mb-2'>
														Achievements:
													</h4>
													<div className='space-y-1'>
														{coach.achievements.map(
															(
																achievement,
																idx
															) => (
																<div
																	key={
																		idx
																	}
																	className='flex items-center text-sm text-gray-300'
																>
																	<div className='w-2 h-2 bg-brand rounded-full mr-2'></div>
																	{
																		achievement
																	}
																</div>
															)
														)}
													</div>
												</div>
											)}

											{/* Availability */}
											{coach.availability && (
												<div>
													<h4 className='text-white font-semibold text-sm mb-2'>
														Availability:
													</h4>
													<p className='text-sm text-gray-300'>
														{
															coach.availability
														}
													</p>
												</div>
											)}

											{/* All Specialties */}
											<div>
												<h4 className='text-white font-semibold text-sm mb-2'>
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
																className='bg-brand/20 text-brand px-2 py-1 rounded-full text-xs font-medium'
															>
																{
																	specialty
																}
															</span>
														)
													)}
												</div>
											</div>
										</div>
									)}

									{/* Book Session Button */}
									<button
										className='w-full bg-brand hover:bg-brand/80 text-black py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25 mt-4'
										onClick={() =>
											(window.location.href =
												'/get-started')
										}
									>
										Book Session
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
				<div className='container mx-auto px-4 md:px-6 text-center'>
					<div className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
							Ready to Start Training with Our
							Coaches?
						</h2>
						<p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
							Book a free consultation to meet
							your perfect coach and start
							your fitness transformation
							today.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Book Free Consultation
							</button>
							<button
								className='w-full sm:w-auto bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-lg md:text-xl transition-all duration-200 hover:bg-gray-800/50'
								onClick={() =>
									(window.location.href =
										'/programs')
								}
							>
								Explore Programs
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
