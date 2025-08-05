import React, { useState } from 'react';
import {
	ChevronRight,
	ChevronLeft,
	Star,
	ChevronsRight,
} from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
	id: string;
	name: string;
	memberSince: string;
	avatar: string;
	title: string;
	content: string;
	rating: number;
}

const Testimonials = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const testimonials: Testimonial[] = [
		{
			id: 'adebayo',
			name: 'ADEBAYO ADELEKE',
			memberSince: 'Member since 2022',
			avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
			title: 'LIFE-CHANGING EXPERIENCE!',
			content:
				"Before working with Adebayo, I struggled to stay consistent. Now, I actually look forward to my workouts. I've lost 8 kg, built muscle, and feel more confident than ever.",
			rating: 5,
		},
		{
			id: 'chioma',
			name: 'CHIOMA OKAFOR',
			memberSince: 'Member since 2024',
			avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150',
			title: 'PROFESSIONAL, KNOWLEDGEABLE',
			content:
				'As someone new to weight lifting, the trainers made it so approachable. They customize every step of the way, ensuring proper form and gradual progression.',
			rating: 5,
		},
		{
			id: 'emeka',
			name: 'EMEKA NWANKWO',
			memberSince: 'Member since 2023',
			avatar: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=150',
			title: 'INCREDIBLE TRANSFORMATION',
			content:
				"The nutrition guidance combined with personalized training has completely transformed my physique. I've gained 12 kg of lean muscle and feel stronger than ever.",
			rating: 5,
		},
		{
			id: 'fatima',
			name: 'FATIMA AHMED',
			memberSince: 'Member since 2023',
			avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
			title: 'AMAZING SUPPORT SYSTEM',
			content:
				'The community here is incredible. The trainers are always available for questions, and the group classes have become the highlight of my week.',
			rating: 5,
		},
		{
			id: 'kemi',
			name: 'KEMI ADEBAYO',
			memberSince: 'Member since 2022',
			avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
			title: 'EXCEEDED EXPECTATIONS',
			content:
				'I came here to lose weight but gained so much more. The holistic approach to fitness has improved my energy, sleep, and overall quality of life.',
			rating: 5,
		},
	];

	const nextTestimonial = () => {
		setCurrentIndex(
			(prev) => (prev + 1) % testimonials.length
		);
	};

	const prevTestimonial = () => {
		setCurrentIndex(
			(prev) =>
				(prev - 1 + testimonials.length) %
				testimonials.length
		);
	};

	// Get visible testimonials for carousel effect
	const getVisibleTestimonials = () => {
		const cards = [];
		const totalCards = testimonials.length;

		// Previous card (partially visible)
		const prevIndex =
			(currentIndex - 1 + totalCards) % totalCards;
		cards.push({
			...testimonials[prevIndex],
			position: 'prev',
			index: prevIndex,
		});

		// Current card (fully visible)
		cards.push({
			...testimonials[currentIndex],
			position: 'current',
			index: currentIndex,
		});

		// Next card (partially visible)
		const nextIndex = (currentIndex + 1) % totalCards;
		cards.push({
			...testimonials[nextIndex],
			position: 'next',
			index: nextIndex,
		});

		return cards;
	};

	const visibleTestimonials = getVisibleTestimonials();

	return (
		<section className='bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
				</div>
				<div className='flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='w-full md:w-[60%] pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight'>
							WHAT OUR CUSTOMERS SAY:{' '}
							<span className='text-brand'>
								REAL RESULTS, REAL VALUE!
							</span>
						</h2>
					</div>
					<div className='w-full md:w-[40%]'>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6'>
							Starting your day with a strong
							routine can transform your life.
							Engaging in a focused and
							dynamic practice not only
							enhances your mastery of poses
							but also paves the way for
							tackling more advanced
							techniques.
						</p>

						{/* Navigation Arrows - Only show on desktop */}
						<div className='hidden md:flex space-x-4'>
							<button
								onClick={prevTestimonial}
								className='bg-brand hover:bg-brand/80 text-black p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-brand/25 active:scale-95'
							>
								<ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
							</button>
							<button
								onClick={nextTestimonial}
								className='bg-gray-700 hover:bg-gray-600 text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg active:scale-95'
							>
								<ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
							</button>
						</div>
					</div>
				</div>

				{/* Testimonials - Desktop Carousel */}
				<div className='relative overflow-hidden hidden md:block'>
					<div className='flex items-stretch justify-center space-x-4 md:space-x-6 transition-all duration-700 ease-in-out'>
						{visibleTestimonials.map(
							(testimonial, index) => {
								const isActive =
									testimonial.position ===
									'current';
								const isPrev =
									testimonial.position ===
									'prev';
								const isNext =
									testimonial.position ===
									'next';

								return (
									<div
										key={`${testimonial.id}-${testimonial.index}`}
										className={`relative transition-all duration-700 ease-in-out transform ${
											isActive
												? 'bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl scale-100 z-20 w-[280px] sm:w-[600px] md:w-[800px] opacity-100'
												: 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl scale-75 z-10 opacity-40'
										} ${
											isPrev
												? 'w-[200px] sm:w-[400px] md:w-[600px] -mr-20 md:-mr-40'
												: isNext
													? 'w-[200px] sm:w-[400px] md:w-[600px] -ml-20 md:-ml-40'
													: 'w-[280px] sm:w-[600px] md:w-[800px]'
										}`}
										style={{
											height: isActive
												? 'auto'
												: '300px',
											overflow:
												isActive
													? 'visible'
													: 'hidden',
											marginTop:
												isActive
													? '0'
													: '2rem',
										}}
									>
										{/* Overlay for non-active cards */}
										{!isActive && (
											<div className='absolute inset-0 bg-black/60 rounded-2xl z-30'></div>
										)}

										<div className='p-4 md:p-8'>
											{/* Title */}
											<h3 className='text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-wide'>
												{
													testimonial.title
												}
											</h3>

											{/* Content */}
											<p
												className={`text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8 ${
													!isActive
														? 'line-clamp-3'
														: ''
												}`}
											>
												{
													testimonial.content
												}
											</p>

											{/* Rating - Only show for active card */}
											{isActive && (
												<div className='flex items-center space-x-1 mb-4 md:mb-6'>
													{[
														...Array(
															testimonial.rating
														),
													].map(
														(
															_,
															i
														) => (
															<Star
																key={
																	i
																}
																className='w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current'
															/>
														)
													)}
												</div>
											)}

											{/* Author Info */}
											<div className='flex items-center space-x-3 md:space-x-4'>
												<div className='relative'>
													<Image
														src={
															testimonial.avatar
														}
														alt={
															testimonial.name
														}
														width={
															48
														}
														height={
															48
														}
														className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-brand/30'
													/>
													<div className='absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-brand rounded-full border-2 border-gray-800'></div>
												</div>
												<div>
													<h4 className='text-white font-bold text-xs md:text-sm tracking-wide'>
														{
															testimonial.name
														}
													</h4>
													<p className='text-gray-400 text-[10px] md:text-xs'>
														{
															testimonial.memberSince
														}
													</p>
												</div>
											</div>
										</div>
									</div>
								);
							}
						)}
					</div>
				</div>

				{/* Testimonials - Mobile List View */}
				<div className='md:hidden space-y-6'>
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className='bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 w-full'
						>
							{/* Title */}
							<h3 className='text-lg font-bold text-white mb-3 tracking-wide'>
								{testimonial.title}
							</h3>

							{/* Content */}
							<p className='text-sm text-gray-300 leading-relaxed mb-4'>
								{testimonial.content}
							</p>

							{/* Rating */}
							<div className='flex items-center space-x-1 mb-4'>
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
							<div className='flex items-center space-x-3'>
								<div className='relative'>
									<Image
										src={
											testimonial.avatar
										}
										alt={
											testimonial.name
										}
										width={40}
										height={40}
										className='w-10 h-10 rounded-full object-cover border-2 border-brand/30'
									/>
									<div className='absolute -bottom-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-gray-800'></div>
								</div>
								<div>
									<h4 className='text-sm font-bold text-white tracking-wide'>
										{testimonial.name}
									</h4>
									<p className='text-xs text-gray-400'>
										{
											testimonial.memberSince
										}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Progress Indicator - Only show on desktop */}
				<div className='hidden md:flex justify-center mt-8 md:mt-12 space-x-2'>
					{testimonials.map((_, index) => (
						<div
							key={index}
							className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
								index === currentIndex
									? 'w-6 md:w-8 bg-brand shadow-lg shadow-brand/50'
									: 'w-1.5 md:w-2 bg-gray-600 hover:bg-gray-500'
							}`}
							onClick={() =>
								setCurrentIndex(index)
							}
						/>
					))}
				</div>

				{/* Call to Action */}
				<div className='text-center mt-12 md:mt-16'>
					<div className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto'>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
							Ready to Join Our Success
							Stories?
						</h3>
						<p className='text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed'>
							Experience the transformation
							that hundreds of our members
							have achieved. Start your
							fitness journey today and become
							our next success story.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Start Your Journey
							</button>
							<button
								className='w-full sm:w-auto bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-lg transition-all duration-200 hover:bg-gray-800/50'
								onClick={() =>
									(window.location.href =
										'/testimonials')
								}
							>
								Read More Stories
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
