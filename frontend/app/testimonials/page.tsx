'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
	id: string;
	name: string;
	memberSince: string;
	avatar: string;
	title: string;
	content: string;
	rating: number;
	achievement?: string;
}

const testimonials: Testimonial[] = [
	{
		id: '1',
		name: 'Sarah Johnson',
		memberSince: 'Member since 2023',
		avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Lost 30 pounds in 6 months',
		content:
			'Hercules Gym completely transformed my life. The personalized training and nutrition guidance helped me achieve my weight loss goals faster than I ever thought possible. The trainers are incredibly supportive and knowledgeable.',
		rating: 5,
		achievement:
			'Lost 30 lbs • Gained confidence • Improved energy',
	},
	{
		id: '2',
		name: 'Michael Chen',
		memberSince: 'Member since 2022',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Built muscle and strength',
		content:
			'I came in as a complete beginner and now I can deadlift 300 pounds! The progressive training approach and expert guidance made all the difference. I feel stronger and more confident than ever.',
		rating: 5,
		achievement:
			'Gained 20 lbs muscle • Deadlift 300 lbs • Improved posture',
	},
	{
		id: '3',
		name: 'Emily Rodriguez',
		memberSince: 'Member since 2024',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Overcame fitness plateau',
		content:
			'I was stuck in a rut with my fitness routine. Hercules Gym helped me break through my plateau with innovative training methods and constant motivation. The results speak for themselves!',
		rating: 5,
		achievement:
			'Broke plateau • New PRs • Renewed motivation',
	},
	{
		id: '4',
		name: 'David Thompson',
		memberSince: 'Member since 2021',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Rehabilitated after injury',
		content:
			'After a serious back injury, I thought my fitness journey was over. The trainers at Hercules Gym created a safe, progressive program that helped me recover and come back stronger than before.',
		rating: 5,
		achievement:
			'Full recovery • Pain-free • Stronger than ever',
	},
	{
		id: '5',
		name: 'Lisa Wang',
		memberSince: 'Member since 2023',
		avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Achieved marathon goal',
		content:
			'Training for my first marathon seemed impossible until I joined Hercules Gym. The cardio programs and endurance training prepared me perfectly. I finished my marathon with energy to spare!',
		rating: 5,
		achievement:
			'Completed marathon • Improved endurance • Mental strength',
	},
	{
		id: '6',
		name: 'James Wilson',
		memberSince: 'Member since 2022',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		title: 'Transformed lifestyle',
		content:
			"Hercules Gym didn't just change my body, it changed my entire lifestyle. I now have more energy, better sleep, and a positive outlook on life. The community here is amazing.",
		rating: 5,
		achievement:
			'Lifestyle change • Better sleep • Increased energy',
	},
];

export default function TestimonialsPage() {
	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Section */}
			<section className='py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
				<div className='container mx-auto px-4 md:px-6 text-center'>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6'>
						SUCCESS{' '}
						<span className='text-brand'>
							STORIES
						</span>
					</h1>
					<p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
						Real transformations from real
						people. Discover how our members
						have achieved their fitness goals
						and transformed their lives with
						Hercules Gym.
					</p>
				</div>
			</section>

			{/* Testimonials Grid */}
			<section className='py-16 md:py-24 bg-black'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.id}
								className='bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-brand/50 transition-all duration-300 transform hover:scale-105'
							>
								{/* Achievement Badge */}
								{testimonial.achievement && (
									<div className='mb-4'>
										<span className='inline-block bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-medium'>
											{
												testimonial.achievement
											}
										</span>
									</div>
								)}

								{/* Title */}
								<h3 className='text-lg md:text-xl font-bold text-white mb-4'>
									{testimonial.title}
								</h3>

								{/* Content */}
								<p className='text-gray-300 leading-relaxed mb-6'>
									"{testimonial.content}"
								</p>

								{/* Rating */}
								<div className='flex items-center space-x-1 mb-6'>
									{[
										...Array(
											testimonial.rating
										),
									].map((_, i) => (
										<Star
											key={i}
											className='w-4 h-4 text-yellow-400 fill-current'
										/>
									))}
								</div>

								{/* Author Info */}
								<div className='flex items-center space-x-4'>
									<div className='relative'>
										<Image
											src={
												testimonial.avatar
											}
											alt={
												testimonial.name
											}
											width={50}
											height={50}
											className='w-12 h-12 rounded-full object-cover border-2 border-brand/30'
										/>
										<div className='absolute -bottom-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-gray-800'></div>
									</div>
									<div>
										<h4 className='font-bold text-white'>
											{
												testimonial.name
											}
										</h4>
										<p className='text-sm text-gray-400'>
											{
												testimonial.memberSince
											}
										</p>
									</div>
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
							Ready to Write Your Success
							Story?
						</h2>
						<p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
							Join hundreds of members who
							have transformed their lives
							with Hercules Gym. Start your
							fitness journey today and become
							our next success story.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Start Your Journey
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
