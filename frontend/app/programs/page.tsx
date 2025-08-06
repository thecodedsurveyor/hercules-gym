'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	ChevronsRight,
	Clock,
	Target,
	Users,
	Dumbbell,
} from 'lucide-react';

export default function ProgramsPage() {
	const programs = [
		{
			title: 'STRENGTH MASTERY',
			category: 'Weight Training',
			duration: '12 Weeks',
			level: 'Intermediate to Advanced',
			description:
				'A comprehensive strength training program designed to build muscle mass, increase power, and improve overall strength. Includes progressive overload techniques and periodization.',
			features: [
				'4-5 training sessions per week',
				'Personalized nutrition plan',
				'Progress tracking app access',
				'Weekly form check sessions',
			],
			image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
		},
		{
			title: 'CARDIO CONDITIONING',
			category: 'Endurance',
			duration: '8 Weeks',
			level: 'All Levels',
			description:
				'Enhance your cardiovascular fitness and stamina through a mix of HIIT, steady-state cardio, and metabolic conditioning workouts.',
			features: [
				'3-4 sessions per week',
				'Heart rate zone training',
				'Endurance building protocols',
				'Recovery techniques',
			],
			image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
		},
		{
			title: 'BODY TRANSFORMATION',
			category: 'Hybrid Training',
			duration: '16 Weeks',
			level: 'All Levels',
			description:
				'A complete body recomposition program combining strength training, cardio, and nutrition coaching to help you build muscle while losing fat.',
			features: [
				'5 training sessions per week',
				'Customized meal plans',
				'Body composition analysis',
				'Bi-weekly progress photos',
			],
			image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
		},
		{
			title: 'FUNCTIONAL FITNESS',
			category: 'Movement Training',
			duration: '10 Weeks',
			level: 'All Levels',
			description:
				'Improve everyday movement patterns, flexibility, and core strength through functional training exercises and mobility work.',
			features: [
				'3 sessions per week',
				'Mobility assessments',
				'Movement pattern correction',
				'Injury prevention focus',
			],
			image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
		},
	];

	return (
		<main className='bg-black min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 md:py-32'>
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat'
					style={{
						backgroundImage:
							'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
					}}
				>
					<div className='absolute inset-0 bg-black/70'></div>
				</div>

				<div className='container mx-auto px-4 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-4xl mx-auto text-center'
					>
						<h1 className='text-4xl md:text-6xl font-bold mb-6'>
							EXPERT-LED{' '}
							<span className='text-brand'>
								FITNESS PROGRAMS
							</span>
						</h1>
						<p className='text-gray-300 text-lg md:text-xl leading-relaxed'>
							Transform your body and mind
							with our professionally designed
							training programs. Each program
							is crafted to deliver maximum
							results while ensuring
							sustainable progress.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Programs Section */}
			<section className='py-16 md:py-24'>
				<div className='container mx-auto px-4'>
					<div className='mb-12'>
						<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							CHOOSE YOUR{' '}
							<span className='text-brand'>
								PATH
							</span>
						</h2>
					</div>

					<div className='grid md:grid-cols-2 gap-8'>
						{programs.map((program, index) => (
							<motion.div
								key={index}
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className='bg-gray-900 rounded-3xl overflow-hidden'
							>
								<div className='relative h-64'>
									<Image
										src={program.image}
										alt={program.title}
										fill
										className='object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>
									<div className='absolute bottom-4 left-4'>
										<span className='bg-brand text-black px-3 py-1 rounded-full text-sm font-medium'>
											{
												program.category
											}
										</span>
									</div>
								</div>

								<div className='p-6 md:p-8'>
									<h3 className='text-2xl font-bold mb-4'>
										{program.title}
									</h3>

									<div className='grid grid-cols-2 gap-4 mb-6'>
										<div className='flex items-center gap-2'>
											<Clock className='w-5 h-5 text-brand' />
											<span className='text-gray-300'>
												{
													program.duration
												}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<Target className='w-5 h-5 text-brand' />
											<span className='text-gray-300'>
												{
													program.level
												}
											</span>
										</div>
									</div>

									<p className='text-gray-400 mb-6'>
										{
											program.description
										}
									</p>

									<div className='space-y-3 mb-8'>
										{program.features.map(
											(
												feature,
												idx
											) => (
												<div
													key={
														idx
													}
													className='flex items-center gap-3'
												>
													<Dumbbell className='w-5 h-5 text-brand' />
													<span className='text-gray-300'>
														{
															feature
														}
													</span>
												</div>
											)
										)}
									</div>

									<button className='w-full bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105'>
										Join Program
									</button>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className='py-16 md:py-24 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							WHY CHOOSE OUR{' '}
							<span className='text-brand'>
								PROGRAMS
							</span>
						</h2>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						<div className='text-center p-6'>
							<Users className='w-12 h-12 text-brand mx-auto mb-4' />
							<h3 className='text-xl font-bold mb-3'>
								Expert Coaches
							</h3>
							<p className='text-gray-400'>
								Work with certified
								professionals who understand
								your goals and help you
								achieve them safely and
								effectively.
							</p>
						</div>
						<div className='text-center p-6'>
							<Target className='w-12 h-12 text-brand mx-auto mb-4' />
							<h3 className='text-xl font-bold mb-3'>
								Proven Results
							</h3>
							<p className='text-gray-400'>
								Our programs have helped
								thousands achieve their
								fitness goals through
								structured, progressive
								training.
							</p>
						</div>
						<div className='text-center p-6'>
							<Clock className='w-12 h-12 text-brand mx-auto mb-4' />
							<h3 className='text-xl font-bold mb-3'>
								Flexible Schedule
							</h3>
							<p className='text-gray-400'>
								Programs designed to fit
								your lifestyle with options
								for both in-person and
								virtual training sessions.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-5xl font-bold mb-6'>
						READY TO{' '}
						<span className='text-brand'>
							GET STARTED
						</span>
						?
					</h2>
					<p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
						Book a free consultation with our
						expert trainers to find the perfect
						program for your goals.
					</p>
					<button className='bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105'>
						Schedule Consultation
					</button>
				</div>
			</section>
		</main>
	);
}
