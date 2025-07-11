'use client';

import React, { useState } from 'react';
import {
	ChevronRight,
	ChevronLeft,
	Check,
	ChevronsRight,
	X,
} from 'lucide-react';

interface PricingPlan {
	id: string;
	name: string;
	price: number;
	period: string;
	description: string;
	features: string[];
	buttonText: string;
	tag?: string;
	tagColor?: string;
}

const Pricing = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isCardActive, setIsCardActive] = useState(false);

	const plans: PricingPlan[] = [
		{
			id: 'premium',
			name: 'PREMIUM MEMBERSHIP',
			price: 1500,
			period: 'Month',
			description:
				'Our most comprehensive plan with all premium features',
			features: [
				'3-5 Personal Training Sessions/Week',
				'Custom Nutrition Coaching',
				'Monthly Progress Reviews',
				'24/7 Messaging Support',
				'Recovery & Mobility Sessions',
			],
			buttonText: 'Get A Membership',
			tag: 'MOST POPULAR',
			tagColor: 'bg-lime-500 text-black',
		},
		{
			id: 'advanced',
			name: 'ADVANCED',
			price: 1000,
			period: 'Month',
			description:
				'Unlock our Advanced Plan for unlimited data storage and priority support, ensuring your projects run smoothly without any interruptions or delays!',
			features: [
				'2-3 Personal Training Sessions/Week',
				'Basic Nutrition Guidance',
				'Bi-weekly Progress Reviews',
				'Email Support',
				'Group Classes Access',
			],
			buttonText: 'Choose Advanced',
			tag: 'BEST VALUE',
			tagColor: 'bg-blue-500 text-white',
		},
		{
			id: 'basic',
			name: 'BASIC',
			price: 800,
			period: 'Month',
			description:
				'Check out our Essential Training Package, perfect for budget-friendly fitness! Get solid coaching and resources to hit your goals without overspending!',
			features: [
				'1-2 Personal Training Sessions/Week',
				'Basic Workout Plans',
				'Monthly Check-ins',
				'Community Support',
				'Gym Access',
			],
			buttonText: 'Start Basic',
			tag: 'STARTER',
			tagColor: 'bg-orange-500 text-white',
		},
		{
			id: 'family',
			name: 'FAMILY PACKAGE',
			price: 3500,
			period: 'Month',
			description:
				'Explore our Family Package for comprehensive data and keeping your loved ones fit! Enjoy plenty of storage and teamwork!',
			features: [
				'Up to 4 Family Members',
				'Flexible Training Sessions',
				'Family Nutrition Plans',
				'Kids Fitness Programs',
				'Priority Booking',
			],
			buttonText: 'Get Family Plan',
			tag: 'FAMILY SPECIAL',
			tagColor: 'bg-purple-500 text-white',
		},
	];

	const nextPlan = () => {
		if (!isCardActive) {
			setCurrentIndex(
				(prev) => (prev + 1) % plans.length
			);
		}
	};

	const prevPlan = () => {
		if (!isCardActive) {
			setCurrentIndex(
				(prev) =>
					(prev - 1 + plans.length) % plans.length
			);
		}
	};

	const handlePlanSelect = (planId: string) => {
		console.log('Selected plan:', planId);
		setIsCardActive(true);
	};

	// Get visible cards for carousel effect (desktop only)
	const getVisibleCards = () => {
		const cards = [];
		const totalCards = plans.length;

		// Previous card (partially visible)
		const prevIndex =
			(currentIndex - 1 + totalCards) % totalCards;
		cards.push({
			...plans[prevIndex],
			position: 'prev',
			index: prevIndex,
		});

		// Current card (fully visible)
		cards.push({
			...plans[currentIndex],
			position: 'current',
			index: currentIndex,
		});

		// Next card (partially visible)
		const nextIndex = (currentIndex + 1) % totalCards;
		cards.push({
			...plans[nextIndex],
			position: 'next',
			index: nextIndex,
		});

		return cards;
	};

	const visibleCards = getVisibleCards();

	return (
		<section className='bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-2 pl-0'>
					<ChevronsRight className='w-16 h-16 md:w-24 md:h-24 text-lime-500' />
				</div>
				<div className='flex items-start gap-6 md:gap-8 mb-8 md:mb-12'>
					<div className='pl-0'>
						<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-relaxed pl-0'>
							SIMPLE PRICING.{' '}
							<span className='text-lime-500'>
								POWERFUL RESULTS.
							</span>
						</h2>
					</div>
				</div>

				{/* Mobile View - Simple List */}
				<div className='md:hidden space-y-6'>
					{plans.map((plan) => (
						<div
							key={plan.id}
							className='bg-white text-black rounded-2xl p-6 relative'
						>
							{plan.tag && (
								<div className='absolute -top-3 right-4'>
									<div
										className={`${plan.tagColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
									>
										{plan.tag}
									</div>
								</div>
							)}

							<h3 className='text-lg font-bold mb-2'>
								{plan.name}
							</h3>

							<div className='mb-3'>
								<div className='flex items-baseline'>
									<span className='text-2xl font-bold'>
										₹{plan.price}
									</span>
									<span className='text-sm ml-1 text-gray-600'>
										/{plan.period}
									</span>
								</div>
							</div>

							<p className='text-sm text-gray-600 mb-4'>
								{plan.description}
							</p>

							<div className='space-y-2 mb-6'>
								{plan.features.map(
									(feature, idx) => (
										<div
											key={idx}
											className='flex items-center text-sm'
										>
											<Check className='w-4 h-4 text-lime-500 mr-2 flex-shrink-0' />
											<span>
												{feature}
											</span>
										</div>
									)
								)}
							</div>

							<button className='w-full bg-lime-500 hover:bg-lime-600 text-black py-3 rounded-xl font-bold text-sm transition-all duration-200'>
								{plan.buttonText}
							</button>
						</div>
					))}
				</div>

				{/* Desktop View - Carousel */}
				<div className='hidden md:block relative pt-8 overflow-visible z-10'>
					{/* Navigation Arrows */}
					<div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-30'>
						<button
							onClick={prevPlan}
							className='bg-lime-500 hover:bg-lime-600 text-black p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-lime-500/25 active:scale-95'
						>
							<ChevronLeft className='w-6 h-6' />
						</button>
					</div>
					<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-30'>
						<button
							onClick={nextPlan}
							className='bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg active:scale-95'
						>
							<ChevronRight className='w-6 h-6' />
						</button>
					</div>

					<div className='flex items-center justify-center'>
						<div className='flex items-stretch space-x-6 transition-all duration-700 ease-in-out'>
							{visibleCards.map(
								(card, index) => {
									const isActive =
										card.position ===
										'current';
									const isPrev =
										card.position ===
										'prev';
									const isNext =
										card.position ===
										'next';

									return (
										<div
											key={`${card.id}-${card.index}`}
											className={`relative transition-all duration-700 ease-in-out transform ${
												isActive
													? 'bg-white text-black rounded-3xl shadow-2xl scale-105 z-20 w-96 opacity-100'
													: 'bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-white rounded-2xl scale-85 z-10 opacity-60'
											} ${
												isPrev
													? 'w-80 -mr-16'
													: isNext
														? 'w-80 -ml-16'
														: 'w-96'
											}`}
											style={{
												height: isActive
													? 'auto'
													: '400px',
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
											{/* Tag */}
											{isActive &&
												card.tag && (
													<div className='absolute -top-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-30'>
														<div
															className={`${card.tagColor} px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg`}
														>
															{
																card.tag
															}
														</div>
													</div>
												)}

											<div className='p-6'>
												<h3
													className={`text-lg font-bold mb-4 transition-colors duration-500 ${
														isActive
															? 'text-black'
															: 'text-white'
													}`}
												>
													{
														card.name
													}
												</h3>

												<div className='mb-4'>
													<div className='flex items-baseline'>
														<span
															className={`text-3xl font-bold transition-colors duration-500 ${
																isActive
																	? 'text-black'
																	: 'text-white'
															}`}
														>
															₹
															{
																card.price
															}
														</span>
														<span
															className={`text-base ml-1 transition-colors duration-500 ${
																isActive
																	? 'text-gray-600'
																	: 'text-gray-400'
															}`}
														>
															/
															{
																card.period
															}
														</span>
													</div>
												</div>

												<p
													className={`text-sm mb-6 transition-colors duration-500 ${
														isActive
															? 'text-gray-600'
															: 'text-gray-400'
													}`}
												>
													{
														card.description
													}
												</p>

												<div className='space-y-3 mb-8'>
													{card.features.map(
														(
															feature,
															idx
														) => (
															<div
																key={
																	idx
																}
																className='flex items-center text-sm'
															>
																<Check
																	className={`w-4 h-4 mr-2 flex-shrink-0 ${
																		isActive
																			? 'text-lime-500'
																			: 'text-lime-400'
																	}`}
																/>
																<span
																	className={
																		isActive
																			? 'text-gray-700'
																			: 'text-gray-300'
																	}
																>
																	{
																		feature
																	}
																</span>
															</div>
														)
													)}
												</div>

												<button
													onClick={() =>
														handlePlanSelect(
															card.id
														)
													}
													className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
														isActive
															? 'bg-lime-500 hover:bg-lime-600 text-black'
															: 'bg-gray-700 hover:bg-gray-600 text-white'
													}`}
												>
													{
														card.buttonText
													}
												</button>
											</div>
										</div>
									);
								}
							)}
						</div>
					</div>

					{/* Progress Indicator */}
					<div className='flex justify-center mt-12 space-x-2'>
						{plans.map((_, index) => (
							<div
								key={index}
								className={`h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
									index === currentIndex
										? 'w-8 bg-lime-500 shadow-lg shadow-lime-500/50'
										: 'w-2 bg-gray-600 hover:bg-gray-500'
								}`}
								onClick={() =>
									setCurrentIndex(index)
								}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
