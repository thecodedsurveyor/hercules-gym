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
	Dumbbell,
	Target,
	TrendingUp,
	Shield,
	Users,
	Clock,
	Award,
	CheckCircle,
	Zap,
} from 'lucide-react';

export default function BodybuildingPage() {
	const { image: heroImage } =
		useRandomCategoryImage('BODYBUILDING');
	const { image: benefitsImage } =
		useRandomCategoryImage('BODYBUILDING');

	const features = [
		{
			icon: Target,
			title: 'Muscle Building Focus',
			description:
				'Specialized programs designed for maximum muscle growth and definition',
		},
		{
			icon: Dumbbell,
			title: 'Advanced Equipment',
			description:
				'Access to premium bodybuilding equipment and specialized machines',
		},
		{
			icon: TrendingUp,
			title: 'Progressive Training',
			description:
				'Systematic approach to building muscle mass and strength',
		},
		{
			icon: Users,
			title: 'Expert Guidance',
			description:
				'One-on-one coaching from certified bodybuilding specialists',
		},
		{
			icon: Clock,
			title: 'Flexible Training',
			description:
				'Customized workout schedules to fit your lifestyle',
		},
		{
			icon: Award,
			title: 'Competition Prep',
			description:
				'Specialized training for bodybuilding competitions and shows',
		},
	];

	const benefits = [
		'Significant muscle mass and strength gains',
		'Improved body composition and definition',
		'Enhanced metabolic rate and fat burning',
		'Increased confidence and self-esteem',
		'Better posture and functional strength',
		'Competition-ready physique development',
	];

	const trainers = [
		{
			name: 'Adebayo Adeleke',
			title: 'Bodybuilding Specialist',
			imageQuery: 'professional male bodybuilding trainer',
			specialties: [
				'Muscle Building',
				'Competition Prep',
				'Nutrition Planning',
			],
		},
		{
			name: 'Emeka Nwankwo',
			title: 'Strength & Conditioning Coach',
			imageQuery: 'professional male strength coach',
			specialties: [
				'Powerlifting',
				'Bodybuilding',
				'Recovery Optimization',
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
								'Bodybuilding Training'
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
								BODYBUILDING{' '}
								<span className='text-brand'>
									PROGRAM
								</span>
							</h1>
							<p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-8'>
								Transform your physique with
								our comprehensive
								bodybuilding program. Build
								muscle, increase strength,
								and achieve the body you've
								always wanted with expert
								guidance.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button className='bg-brand hover:bg-brand/80 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
									Start Your Journey
								</Button>
								<Button
									variant='outline'
									className='border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-xl font-bold text-lg'
								>
									View Schedule
								</Button>
							</div>
						</div>

						<div className='w-full lg:w-1/2'>
							<div className='relative'>
								<UnsplashImageWithHook
									query='bodybuilding muscle fitness'
									alt='Bodybuilding Training'
									width={600}
									height={400}
									className='rounded-2xl shadow-2xl'
									showAttribution={false}
								/>
								<div className='absolute -bottom-4 -right-4 bg-brand text-black px-4 py-2 rounded-full font-bold text-sm'>
									₦75,000/month
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
								Bodybuilding
							</span>{' '}
							Program?
						</h2>
						<p className='text-gray-300 text-lg max-w-3xl mx-auto'>
							Our bodybuilding program
							combines advanced training
							techniques with personalized
							nutrition guidance to help you
							achieve maximum muscle growth
							and definition.
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
								query='bodybuilding muscle definition'
								alt='Bodybuilding Benefits'
								width={600}
								height={400}
								className='rounded-2xl shadow-2xl'
								showAttribution={false}
							/>
						</div>

						<div className='w-full lg:w-1/2'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
								Build Your{' '}
								<span className='text-brand'>
									Dream Physique
								</span>
							</h2>
							<p className='text-gray-300 text-lg mb-8 leading-relaxed'>
								Bodybuilding is more than
								just lifting weights. It's a
								lifestyle that transforms
								your body, mind, and
								confidence. Our program is
								designed to help you achieve
								your ultimate physique
								goals.
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
								Bodybuilding Experts
							</span>
						</h2>
						<p className='text-gray-300 text-lg max-w-3xl mx-auto'>
							Our certified bodybuilding
							specialists have years of
							experience in muscle building
							and competition preparation.
							They're here to guide you every
							step of the way.
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
										query={trainer.imageQuery}
										alt={trainer.name}
										width={400}
										height={256}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
										showAttribution={false}
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
												Certified Trainer
											</span>
										</div>
										<div className='flex items-center space-x-2'>
											<Users className='w-4 h-4 text-brand' />
											<span className='text-gray-300 text-sm font-medium'>
												8+ Years
											</span>
										</div>
									</div>

									{/* Specialties */}
									<div className='mb-4'>
										<h4 className='text-white font-semibold text-sm mb-3 uppercase tracking-wide'>
											Specialties
										</h4>
										<div className='flex flex-wrap gap-2'>
											{trainer.specialties.map((specialty, idx) => (
												<Badge
													key={idx}
													variant='secondary'
													className='bg-brand/20 text-brand border-brand/30 text-xs px-2 py-1'
												>
													{specialty}
												</Badge>
											))}
										</div>
									</div>

									{/* Action Button */}
									<Button 
										className='w-full bg-brand hover:bg-brand/80 text-black font-semibold py-2 rounded-lg transition-all duration-200 transform hover:scale-105'
									>
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
							Ready to Build Your{' '}
							<span className='text-brand'>
								Dream Body
							</span>
							?
						</h2>
						<p className='text-gray-300 text-lg mb-8 leading-relaxed'>
							Join our bodybuilding program
							today and start your journey to
							the physique you've always
							wanted. Our expert coaches are
							ready to help you achieve your
							muscle building goals.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button className='bg-brand hover:bg-brand/80 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'>
								Start Bodybuilding Program
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
