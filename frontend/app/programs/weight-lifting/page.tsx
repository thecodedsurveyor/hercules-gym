'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHeroImage, useCardImages } from '@/hooks/use-unsplash-images';
import { OptimizedUnsplashImage } from '@/components/ui/unsplash-image';
import {
	ChevronsRight,
	Dumbbell,
	Target,
	TrendingUp,
	Shield,
	Users,
	Clock,
	Award,
	CheckCircle,
} from 'lucide-react';

export default function WeightLiftingPage() {
	const { images: heroImages } = useHeroImage('WEIGHT_LIFTING');
	const { images: benefitsImages } = useCardImages('WEIGHT_LIFTING', 1);

	const features = [
		{
			icon: Target,
			title: 'Personalized Programs',
			description:
				'Customized training plans based on your fitness level and goals',
		},
		{
			icon: Shield,
			title: 'Safe Techniques',
			description:
				'Learn proper form and lifting techniques to prevent injuries',
		},
		{
			icon: TrendingUp,
			title: 'Progressive Overload',
			description:
				'Systematic increase in weight and intensity for continuous gains',
		},
		{
			icon: Users,
			title: 'Expert Coaching',
			description:
				'One-on-one guidance from certified strength training specialists',
		},
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description:
				'Morning, afternoon, and evening sessions available',
		},
		{
			icon: Award,
			title: 'Progress Tracking',
			description:
				'Regular assessments and milestone celebrations',
		},
	];

	const benefits = [
		'Increased muscle mass and strength',
		'Improved bone density and joint health',
		'Enhanced metabolism and fat burning',
		'Better posture and body composition',
		'Increased confidence and mental resilience',
		'Reduced risk of chronic diseases',
	];

	const trainers = [
		{
			name: 'Adebayo Adeleke',
			title: 'Strength Training Specialist',
			imageQuery: 'professional male strength trainer',
			specialties: [
				'Powerlifting',
				'Olympic Lifting',
				'Functional Strength',
			],
		},
		{
			name: 'Emeka Nwankwo',
			title: 'Performance Coach',
			imageQuery: 'professional male fitness coach',
			specialties: [
				'Athletic Performance',
				'Strength Conditioning',
				'Injury Prevention',
			],
		},
	];

	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Section */}
			<section className='relative py-12 md:py-20 overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0 z-0'>
					{heroImages && heroImages.length > 0 ? (
						<OptimizedUnsplashImage
							category='WEIGHT_LIFTING'
							useCase='hero'
							alt='Weight Lifting'
							priority={true}
							className='object-cover opacity-20'
						/>
					) : (
						<div className='w-full h-full bg-gray-800 opacity-20'></div>
					)}
				</div>

				{/* Content */}
				<div className='relative z-10 container mx-auto px-4 py-16 md:py-24'>
					<div className='flex flex-col lg:flex-row items-center gap-12'>
						<div className='w-full lg:w-1/2'>
							<div className='relative'>
								{benefitsImages && benefitsImages.length > 0 ? (
									<OptimizedUnsplashImage
										category='WEIGHT_LIFTING'
										useCase='card'
										alt='Weight Lifting Training'
										className='rounded-2xl shadow-2xl'
										showAttribution={false}
									/>
								) : (
									<div className='w-full h-full bg-gray-800 rounded-2xl shadow-2xl'></div>
								)}
								<div className='absolute -bottom-4 -right-4 bg-brand text-black px-4 py-2 rounded-full font-bold text-sm'>
									₦65,000/month
								</div>
							</div>
						</div>

						<div className='w-full lg:w-1/2 space-y-6'>
							<div className='mb-2'>
								<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
							</div>
							<h1 className='text-4xl md:text-6xl font-bold mb-6'>
								WEIGHT LIFTING
							</h1>
							<p className='text-lg md:text-xl text-gray-300 mb-8'>
								Build strength, power, and muscle mass through our
								comprehensive weight lifting programs designed for all
								fitness levels.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button size='lg' className='bg-brand text-black hover:bg-brand/90'>
									Start Training
								</Button>
								<Button size='lg' variant='outline'>
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 md:py-24 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							WHY CHOOSE OUR WEIGHT LIFTING PROGRAM?
						</h2>
						<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
							Our comprehensive approach combines expert coaching, personalized
							programs, and state-of-the-art equipment to maximize your results.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{features.map((feature, index) => (
							<Card
								key={index}
								className='p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300'
							>
								<feature.icon className='w-12 h-12 text-brand mb-4' />
								<h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
								<p className='text-gray-300'>{feature.description}</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-16 md:py-24 bg-black'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col lg:flex-row items-center gap-12'>
						<div className='w-full lg:w-1/2'>
							{benefitsImages && benefitsImages.length > 0 ? (
								<OptimizedUnsplashImage
									category='WEIGHT_LIFTING'
									useCase='card'
									alt='Weight Lifting Benefits'
									className='rounded-2xl shadow-2xl'
									showAttribution={false}
								/>
							) : (
								<div className='w-full h-full bg-gray-800 rounded-2xl shadow-2xl'></div>
							)}
						</div>

						<div className='w-full lg:w-1/2 space-y-6'>
							<div className='mb-2'>
								<Dumbbell className='w-12 h-12 md:w-24 md:h-24 text-brand' />
							</div>
							<h2 className='text-3xl md:text-5xl font-bold mb-6'>
								BENEFITS OF WEIGHT LIFTING
							</h2>
							<div className='space-y-4'>
								{benefits.map((benefit, index) => (
									<div key={index} className='flex items-center gap-3'>
										<CheckCircle className='w-6 h-6 text-brand flex-shrink-0' />
										<span className='text-gray-300'>{benefit}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trainers Section */}
			<section className='py-16 md:py-24 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							MEET OUR WEIGHT LIFTING EXPERTS
						</h2>
						<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
							Our certified weight lifting specialists are passionate about
							helping you achieve your strength and muscle building goals
							through effective and safe training methods.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto'>
						{trainers.map((trainer, index) => (
							<Card
								key={index}
								className='group overflow-hidden hover:shadow-2xl hover:shadow-brand/10 hover:scale-105 transition-all duration-500 w-full max-w-sm'
							>
								{/* Trainer Image */}
								<div className='relative h-64 overflow-hidden'>
									<OptimizedUnsplashImage
										category='PERSONAL_TRAINING'
										useCase='card'
										alt={trainer.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
										showAttribution={false}
									/>
									{/* Gradient Overlay */}
									<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>
									{/* Trainer Name and Title */}
									<div className='absolute bottom-4 left-4 right-4'>
										<h3 className='text-xl mb-1 font-semibold text-white'>
											{trainer.name}
										</h3>
										<p className='font-semibold text-sm text-gray-200'>
											{trainer.title}
										</p>
									</div>
								</div>

								{/* Trainer Info */}
								<div className='p-6'>
									{/* Experience & Certifications */}
									<div className='flex items-center gap-4 mb-4 text-sm text-gray-300'>
										<div className='flex items-center gap-2'>
											<Award className='w-4 h-4 text-brand' />
											<span>Certified Trainer</span>
										</div>
										<div className='flex items-center gap-2'>
											<Users className='w-4 h-4 text-brand' />
											<span>8+ Years</span>
										</div>
									</div>

									{/* Specialties */}
									<div className='mb-6'>
										<h4 className='font-semibold text-sm text-gray-400 mb-3 uppercase tracking-wide'>
											Specialties
										</h4>
										<div className='flex flex-wrap gap-2'>
											{trainer.specialties.map((specialty, idx) => (
												<Badge
													key={idx}
													variant='secondary'
													className='text-xs px-2 py-1 bg-gray-700 text-gray-200'
												>
													{specialty}
												</Badge>
											))}
										</div>
									</div>

									{/* Book Session Button */}
									<Button className='w-full bg-brand text-black hover:bg-brand/90'>
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
							Ready to Build{' '}
							<span className='text-brand'>
								Real Strength
							</span>
							?
						</h2>
						<p className='text-gray-300 text-lg mb-8 leading-relaxed'>
							Join our weight lifting program
							today and start your journey to
							a stronger, healthier you. Our
							expert coaches are ready to help
							you achieve your fitness goals.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button className='bg-brand hover:bg-brand/80 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
								Start Weight Lifting Program
							</Button>
							<Button
								variant='outline'
								className='border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-xl font-bold text-lg'
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
