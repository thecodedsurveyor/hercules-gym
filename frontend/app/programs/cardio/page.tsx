'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRandomCategoryImage } from '@/hooks/use-unsplash-images';
import { UnsplashImageWithHook } from '@/components/ui/unsplash-image';
import {
	ChevronsRight,
	Heart,
	Target,
	TrendingUp,
	Shield,
	Users,
	Clock,
	Award,
	CheckCircle,
	Zap,
} from 'lucide-react';

export default function CardioPage() {
	const { image: heroImage } =
		useRandomCategoryImage('CARDIO');
	const { image: benefitsImage } =
		useRandomCategoryImage('CARDIO');

	const features = [
		{
			icon: Heart,
			title: 'Heart Health Focus',
			description:
				'Improve cardiovascular fitness and heart health with targeted training',
		},
		{
			icon: Zap,
			title: 'High-Energy Workouts',
			description:
				'Dynamic, engaging sessions that keep you motivated and energized',
		},
		{
			icon: TrendingUp,
			title: 'Endurance Building',
			description:
				'Gradually increase stamina and endurance through progressive training',
		},
		{
			icon: Users,
			title: 'Group Motivation',
			description:
				'Train with like-minded individuals in energetic group sessions',
		},
		{
			icon: Clock,
			title: 'Flexible Duration',
			description:
				'Sessions ranging from 30 minutes to full-hour intensive workouts',
		},
		{
			icon: Award,
			title: 'Performance Tracking',
			description:
				'Monitor your progress with heart rate and performance metrics',
		},
	];

	const benefits = [
		'Improved cardiovascular health and endurance',
		'Enhanced fat burning and weight management',
		'Increased energy levels and stamina',
		'Better stress relief and mental clarity',
		'Strengthened immune system',
		'Reduced risk of heart disease and diabetes',
	];

	const trainers = [
		{
			name: 'Emeka Nwankwo',
			title: 'Cardio & HIIT Specialist',
			imageQuery: 'cardio male athlete running',
			specialties: [
				'HIIT Training',
				'Endurance Running',
				'Cycling',
			],
		},
		{
			name: 'Chioma Okafor',
			title: 'Cardio Fitness Coach',
			imageQuery: 'female cardio fitness trainer gym',
			specialties: [
				'Dance Cardio',
				'Aerobic Training',
				'Recovery Sessions',
			],
		},
	];

	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Section */}
			<section className='relative py-12 md:py-20 overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0 z-0'>
					{heroImage ? (
						<Image
							src={heroImage.urls.regular}
							alt={
								heroImage.alt_description ||
								'Cardio Training'
							}
							fill
							className='object-cover opacity-20'
						/>
					) : (
						<div className='w-full h-full bg-gray-800'></div>
					)}
					<div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90'></div>
				</div>

				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Header */}
					<div className='mb-2 pl-0'>
						<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
					</div>

					<div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
						<div className='w-full lg:w-1/2'>
							<h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-6'>
								CARDIO{' '}
								<span className='text-brand'>
									FITNESS
								</span>
							</h1>
							<p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-8'>
								Boost your heart health and
								endurance with our dynamic
								cardio program. From
								high-intensity interval
								training to steady-state
								cardio, we have the perfect
								workout for your fitness
								level.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button className='bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
									Start Your Journey
								</Button>
								<Button
									variant='outline'
									className='bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300'
								>
									View Schedule
								</Button>
							</div>
						</div>

						<div className='w-full lg:w-1/2'>
							<div className='relative'>
								<UnsplashImageWithHook
									query='cardio exercise running'
									alt='Cardio Training'
									width={600}
									height={400}
									className='rounded-2xl shadow-2xl'
									showAttribution={false}
								/>
								<div className='absolute -bottom-4 -right-4 bg-brand text-black px-4 py-2 rounded-full font-bold text-sm'>
									₦55,000/month
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-12 md:py-20 bg-gray-900/50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>
							Why Choose Our{' '}
							<span className='text-brand'>
								Cardio
							</span>{' '}
							Program?
						</h2>
						<p className='text-gray-300 text-lg max-w-3xl mx-auto'>
							Our cardio program combines
							science-based training methods
							with fun, engaging workouts to
							help you achieve optimal
							cardiovascular fitness and
							overall health.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{features.map((feature, index) => (
							<Card
								key={index}
								className='bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:bg-gray-800/80 transition-all duration-300'
							>
								<div className='flex items-start space-x-4'>
									<div className='bg-brand/20 p-3 rounded-xl'>
										<feature.icon className='w-6 h-6 text-brand' />
									</div>
									<div>
										<h3 className='text-white font-bold text-lg mb-2'>
											{feature.title}
										</h3>
										<p className='text-gray-300 text-sm leading-relaxed'>
											{
												feature.description
											}
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-12 md:py-20 bg-black'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col lg:flex-row items-center gap-12'>
						<div className='w-full lg:w-1/2'>
							<UnsplashImageWithHook
								query='cardio fitness workout'
								alt='Cardio Benefits'
								width={600}
								height={400}
								className='rounded-2xl shadow-2xl'
								showAttribution={false}
							/>
						</div>

						<div className='w-full lg:w-1/2'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
								Transform Your{' '}
								<span className='text-brand'>
									Cardiovascular Health
								</span>
							</h2>
							<p className='text-gray-300 text-lg mb-8 leading-relaxed'>
								Cardio training is essential
								for maintaining a healthy
								heart and improving your
								overall fitness. Our program
								is designed to challenge you
								while keeping workouts
								enjoyable and sustainable.
							</p>

							<div className='space-y-4'>
								{benefits.map(
									(benefit, index) => (
										<div
											key={index}
											className='flex items-center space-x-3'
										>
											<CheckCircle className='w-5 h-5 text-brand flex-shrink-0' />
											<span className='text-gray-300'>
												{benefit}
											</span>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trainers Section */}
			<section className='py-12 md:py-20 bg-gray-900/50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>
							Meet Our{' '}
							<span className='text-brand'>
								Cardio Experts
							</span>
						</h2>
						<p className='text-gray-300 text-lg max-w-3xl mx-auto'>
							Our certified cardio specialists
							are passionate about helping you
							achieve your fitness goals
							through effective and enjoyable
							cardiovascular training.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto'>
						{trainers.map((trainer, index) => (
							<Card
								key={index}
								className='group bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:bg-gray-800/80 transition-all duration-300 hover:shadow-2xl hover:shadow-brand/10 hover:scale-105'
							>
								{/* Trainer Image */}
								<div className='relative h-64 overflow-hidden'>
									<UnsplashImageWithHook
										query={
											trainer.imageQuery
										}
										alt={trainer.name}
										width={400}
										height={256}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
										showAttribution={
											false
										}
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>
									<div className='absolute bottom-4 left-4 right-4'>
										<h3 className='text-white font-bold text-xl mb-1'>
											{trainer.name}
										</h3>
										<p className='text-brand font-semibold text-sm'>
											{trainer.title}
										</p>
									</div>
								</div>

								{/* Trainer Info */}
								<div className='p-6'>
									{/* Experience & Certifications */}
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center space-x-2'>
											<Award className='w-4 h-4 text-brand' />
											<span className='text-gray-300 text-sm font-medium'>
												Certified
												Trainer
											</span>
										</div>
										<div className='flex items-center space-x-2'>
											<Users className='w-4 h-4 text-brand' />
											<span className='text-gray-300 text-sm font-medium'>
												5+ Years
											</span>
										</div>
									</div>

									{/* Specialties */}
									<div className='mb-4'>
										<h4 className='text-white font-semibold text-sm mb-3 uppercase tracking-wide'>
											Specialties
										</h4>
										<div className='flex flex-wrap gap-2'>
											{trainer.specialties.map(
												(
													specialty,
													idx
												) => (
													<Badge
														key={
															idx
														}
														variant='secondary'
														className='bg-brand/20 text-brand border-brand/30 text-xs px-2 py-1 hover:bg-transparent hover:text-white hover:border-white/30 transition-all duration-300'
													>
														{
															specialty
														}
													</Badge>
												)
											)}
										</div>
									</div>

									{/* Action Button */}
									<Button className='w-full bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105'>
										Book Session
									</Button>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-12 md:py-20 bg-black'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<Card className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 md:p-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
							Ready to Boost Your{' '}
							<span className='text-brand'>
								Cardiovascular Fitness
							</span>
							?
						</h2>
						<p className='text-gray-300 text-lg mb-8 leading-relaxed'>
							Join our cardio program today
							and start your journey to better
							heart health and endurance. Our
							expert coaches are ready to help
							you achieve your fitness goals.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button className='bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
								Start Cardio Program
							</Button>
							<Button
								variant='outline'
								className='bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300'
							>
								Book Free Consultation
							</Button>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}
