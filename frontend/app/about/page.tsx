'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	ChevronsRight,
	Users,
	Award,
	Clock,
	Target,
} from 'lucide-react';

export default function AboutPage() {
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
							TRANSFORMING LIVES THROUGH{' '}
							<span className='text-brand'>
								FITNESS EXCELLENCE
							</span>
						</h1>
						<p className='text-gray-300 text-lg md:text-xl leading-relaxed'>
							Since 2015, Hercules Gym has
							been more than just a fitness
							center. We're a community
							dedicated to helping individuals
							achieve their ultimate potential
							through expert guidance,
							state-of-the-art facilities, and
							unwavering support.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className='py-16 md:py-24 bg-gradient-to-b from-black to-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div>
							<div className='mb-2'>
								<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
							</div>
							<h2 className='text-3xl md:text-5xl font-bold mb-6'>
								OUR STORY
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									Founded by former
									professional athlete
									John Hercules, our
									journey began with a
									simple vision: to create
									a fitness environment
									that combines
									professional expertise
									with a welcoming
									community atmosphere.
								</p>
								<p>
									What started as a small
									personal training studio
									has grown into Mumbai's
									premier fitness
									destination, serving
									over 5,000 members and
									employing 50+ certified
									fitness professionals.
								</p>
								<p>
									Our success is built on
									our commitment to
									understanding each
									member's unique journey
									and providing
									personalized support to
									help them achieve their
									goals.
								</p>
							</div>
						</div>
						<div className='relative'>
							<Image
								src='https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
								alt='Gym interior'
								width={1000}
								height={667}
								className='rounded-3xl shadow-2xl'
							/>
							<div className='absolute -bottom-6 -right-6 bg-brand text-black p-6 rounded-2xl'>
								<div className='text-4xl font-bold'>
									8+
								</div>
								<div className='text-sm'>
									Years of Excellence
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16 md:py-24 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='text-center'>
							<Users className='w-12 h-12 text-brand mx-auto mb-4' />
							<div className='text-4xl font-bold mb-2'>
								5000+
							</div>
							<div className='text-gray-400'>
								Active Members
							</div>
						</div>
						<div className='text-center'>
							<Award className='w-12 h-12 text-brand mx-auto mb-4' />
							<div className='text-4xl font-bold mb-2'>
								50+
							</div>
							<div className='text-gray-400'>
								Expert Trainers
							</div>
						</div>
						<div className='text-center'>
							<Clock className='w-12 h-12 text-brand mx-auto mb-4' />
							<div className='text-4xl font-bold mb-2'>
								24/7
							</div>
							<div className='text-gray-400'>
								Access
							</div>
						</div>
						<div className='text-center'>
							<Target className='w-12 h-12 text-brand mx-auto mb-4' />
							<div className='text-4xl font-bold mb-2'>
								98%
							</div>
							<div className='text-gray-400'>
								Goal Achievement
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Facilities Section */}
			<section className='py-16 md:py-24 bg-black'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<div className='mb-2'>
							<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand mx-auto' />
						</div>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							WORLD-CLASS FACILITIES
						</h2>
						<p className='text-gray-300 text-lg max-w-3xl mx-auto'>
							Our 20,000 sq. ft. facility is
							equipped with the latest fitness
							technology and amenities to
							provide you with an unmatched
							workout experience.
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[
							{
								image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Strength Zone',
								description:
									'Premium free weights and machines from Hammer Strength and Life Fitness',
							},
							{
								image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Cardio Arena',
								description:
									'State-of-the-art cardio equipment with personal entertainment systems',
							},
							{
								image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Functional Training',
								description:
									'Dedicated space for CrossFit, HIIT, and functional workouts',
							},
							{
								image: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Recovery Zone',
								description:
									'Sauna, steam room, and dedicated stretching area',
							},
							{
								image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Spin Studio',
								description:
									'Premium spin bikes with virtual riding experiences',
							},
							{
								image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
								title: 'Yoga Studio',
								description:
									'Peaceful space for yoga and mindfulness practices',
							},
						].map((facility, index) => (
							<div
								key={index}
								className='group relative overflow-hidden rounded-3xl'
							>
								<Image
									src={facility.image}
									alt={facility.title}
									width={600}
									height={400}
									className='w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>
								<div className='absolute bottom-0 left-0 right-0 p-6'>
									<h3 className='text-xl font-bold mb-2'>
										{facility.title}
									</h3>
									<p className='text-gray-300 text-sm'>
										{
											facility.description
										}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-5xl font-bold mb-6'>
						READY TO START YOUR{' '}
						<span className='text-brand'>
							TRANSFORMATION
						</span>
						?
					</h2>
					<p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
						Join our community of fitness
						enthusiasts and experience the
						Hercules difference. Your journey to
						a stronger, healthier you starts
						here.
					</p>
					<button className='bg-brand hover:bg-brand/80 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105'>
						Start Free Trial
					</button>
				</div>
			</section>
		</main>
	);
}
