'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Check,
	ChevronsRight,
	HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const plans = [
	{
		name: 'BASIC',
		price: 45000,
		duration: 'month',
		description:
			'Perfect for beginners starting their fitness journey',
		features: [
			{
				text: '1-2 Personal Training Sessions/Week',
				included: true,
			},
			{
				text: 'Basic Workout Plans',
				included: true,
			},
			{ text: 'Monthly Check-ins', included: true },
			{
				text: 'Community Support',
				included: true,
			},
			{ text: 'Gym Access', included: true },
			{
				text: 'Custom Nutrition Coaching',
				included: false,
			},
			{
				text: 'Recovery & Mobility Sessions',
				included: false,
			},
			{
				text: '24/7 Messaging Support',
				included: false,
			},
		],
		popular: false,
	},
	{
		name: 'ADVANCED',
		price: 65000,
		duration: 'month',
		description:
			'Most popular choice for dedicated fitness enthusiasts',
		features: [
			{ text: 'All BASIC features', included: true },
			{
				text: '2-3 Personal Training Sessions/Week',
				included: true,
			},
			{
				text: 'Basic Nutrition Guidance',
				included: true,
			},
			{
				text: 'Bi-weekly Progress Reviews',
				included: true,
			},
			{
				text: 'Email Support',
				included: true,
			},
			{
				text: 'Group Classes Access',
				included: true,
			},
			{
				text: 'Recovery & Mobility Sessions',
				included: false,
			},
			{
				text: '24/7 Messaging Support',
				included: false,
			},
		],
		popular: true,
	},
	{
		name: 'PREMIUM',
		price: 85000,
		duration: 'month',
		description:
			'Ultimate package for maximum results and luxury experience',
		features: [
			{
				text: 'All ADVANCED features',
				included: true,
			},
			{
				text: '3-5 Personal Training Sessions/Week',
				included: true,
			},
			{
				text: 'Custom Nutrition Coaching',
				included: true,
			},
			{
				text: 'Monthly Progress Reviews',
				included: true,
			},
			{
				text: '24/7 Messaging Support',
				included: true,
			},
			{
				text: 'Recovery & Mobility Sessions',
				included: true,
			},
			{ text: 'Priority Booking', included: true },
			{
				text: 'VIP Locker Service',
				included: true,
			},
		],
		popular: false,
	},
	{
		name: 'FAMILY PACKAGE',
		price: 180000,
		duration: 'month',
		description:
			'Comprehensive family fitness package for up to 4 members',
		features: [
			{
				text: 'Up to 4 Family Members',
				included: true,
			},
			{
				text: 'Flexible Training Sessions',
				included: true,
			},
			{
				text: 'Family Nutrition Plans',
				included: true,
			},
			{
				text: 'Kids Fitness Programs',
				included: true,
			},
			{
				text: 'Priority Booking',
				included: true,
			},
			{
				text: 'All PREMIUM features',
				included: true,
			},
			{
				text: 'Family Progress Tracking',
				included: true,
			},
		],
		popular: false,
	},
];

const faqs = [
	{
		question: "What's included in the gym access?",
		answer: 'Gym access includes use of all basic equipment, cardio machines, free weights, and functional training areas during regular operating hours.',
	},
	{
		question: 'Can I freeze my membership?',
		answer: 'Yes, you can freeze your membership for up to 3 months per year with a valid reason (medical, travel, etc.).',
	},
	{
		question: 'Are there any joining fees?',
		answer: 'We charge a one-time joining fee of ₦15,000 which includes your initial fitness assessment and induction.',
	},
	{
		question: "What's your cancellation policy?",
		answer: 'Memberships can be cancelled with 30 days notice. Any unused personal training sessions will be refunded.',
	},
];

export default function PricingPage() {
	const [billingCycle, setBillingCycle] = useState<
		'monthly' | 'yearly'
	>('monthly');

	return (
		<main className='bg-black min-h-screen'>
			{/* Hero Section */}
			<section className='py-20 md:py-32'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-3xl mx-auto'
					>
						<h1 className='text-4xl md:text-6xl font-bold mb-6'>
							SIMPLE PRICING FOR YOUR{' '}
							<span className='text-brand'>
								FITNESS JOURNEY
							</span>
						</h1>
						<p className='text-gray-300 text-lg md:text-xl leading-relaxed mb-8'>
							Choose a plan that fits your
							goals. All plans include access
							to our state-of-the-art
							facilities and expert guidance.
						</p>

						{/* Billing Toggle */}
						<div className='inline-flex items-center bg-gray-900 p-1 rounded-full'>
							<button
								onClick={() =>
									setBillingCycle(
										'monthly'
									)
								}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
									billingCycle ===
									'monthly'
										? 'bg-brand text-black'
										: 'text-gray-400 hover:text-white'
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() =>
									setBillingCycle(
										'yearly'
									)
								}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
									billingCycle ===
									'yearly'
										? 'bg-brand text-black'
										: 'text-gray-400 hover:text-white'
								}`}
							>
								Yearly
								<span className='ml-1 text-xs'>
									(-20%)
								</span>
							</button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{plans.map((plan, index) => (
							<motion.div
								key={plan.name}
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
								className={`relative bg-gray-900 rounded-3xl p-8 ${
									plan.popular
										? 'ring-2 ring-brand'
										: ''
								}`}
							>
								{plan.popular && (
									<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
										<span className='bg-brand text-black px-4 py-1 rounded-full text-sm font-medium'>
											Most Popular
										</span>
									</div>
								)}

								<div className='text-center mb-8'>
									<h3 className='text-xl font-bold mb-4'>
										{plan.name}
									</h3>
									<div className='flex items-baseline justify-center gap-1'>
										<span className='text-4xl font-bold'>
											₦
										</span>
										<span className='text-5xl font-bold'>
											{billingCycle ===
											'yearly'
												? Math.round(
														plan.price *
															0.8
													)
												: plan.price.toLocaleString()}
										</span>
										<span className='text-gray-400'>
											/{plan.duration}
										</span>
									</div>
									<p className='text-gray-400 mt-4'>
										{plan.description}
									</p>
								</div>

								<div className='space-y-4 mb-8'>
									{plan.features.map(
										(feature, idx) => (
											<div
												key={idx}
												className='flex items-center gap-3'
											>
												<div
													className={`flex-shrink-0 rounded-full p-1 ${
														feature.included
															? 'bg-brand/20 text-brand'
															: 'bg-gray-800 text-gray-500'
													}`}
												>
													<Check className='w-4 h-4' />
												</div>
												<span
													className={
														feature.included
															? 'text-gray-300'
															: 'text-gray-500'
													}
												>
													{
														feature.text
													}
												</span>
											</div>
										)
									)}
								</div>

								<Button
									className={`w-full ${
										plan.popular
											? 'bg-brand hover:bg-brand/80 text-black'
											: 'bg-gray-800 hover:bg-gray-700'
									}`}
								>
									Get Started
								</Button>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-12 md:py-24 bg-gray-900'>
				<div className='container mx-auto px-4'>
					<div className='mb-2'>
						<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
					</div>
					<div className='max-w-3xl'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							ALL PLANS{' '}
							<span className='text-brand'>
								INCLUDE
							</span>
						</h2>
						<p className='text-gray-300 text-lg mb-12'>
							Every membership comes with
							these premium features to ensure
							you have everything you need for
							a successful fitness journey.
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								title: 'State-of-the-art Equipment',
								description:
									'Access to premium fitness equipment and machines',
							},
							{
								title: 'Expert Trainers',
								description:
									'Guidance from certified fitness professionals',
							},
							{
								title: 'Flexible Hours',
								description:
									'Open 24/7 for your convenience',
							},
							{
								title: 'Clean Facilities',
								description:
									'Regular sanitization and maintenance',
							},
							{
								title: 'Mobile App Access',
								description:
									'Track workouts and book classes on the go',
							},
							{
								title: 'Locker Rooms',
								description:
									'Secure storage and shower facilities',
							},
							{
								title: 'Free Wifi',
								description:
									'Stay connected during your workout',
							},
							{
								title: 'Parking',
								description:
									'Complimentary parking for members',
							},
						].map((feature, index) => (
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
								className='bg-gray-800 rounded-2xl p-6'
							>
								<h3 className='text-lg font-bold mb-2'>
									{feature.title}
								</h3>
								<p className='text-gray-400'>
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* FAQs Section */}
			<section className='py-12 md:py-24'>
				<div className='container mx-auto px-4'>
					<div className='text-center max-w-3xl mx-auto mb-12'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							FREQUENTLY ASKED{' '}
							<span className='text-brand'>
								QUESTIONS
							</span>
						</h2>
						<p className='text-gray-300'>
							Got questions? We&apos;ve got
							answers. If you can&apos;t find
							what you&apos;re looking for,
							feel free to contact our support
							team.
						</p>
					</div>

					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{faqs.map((faq, index) => (
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
								className='bg-gray-900 rounded-2xl p-6'
							>
								<div className='flex items-start gap-3 mb-3'>
									<HelpCircle className='w-6 h-6 text-brand flex-shrink-0' />
									<h3 className='font-bold'>
										{faq.question}
									</h3>
								</div>
								<p className='text-gray-400 ml-9'>
									{faq.answer}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-12 md:py-24 bg-gray-900'>
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
						enthusiasts and start your journey
						to a healthier, stronger you.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button className='bg-brand hover:bg-brand/80 text-black px-8 py-4 text-lg font-bold'>
							Get Started Now
						</Button>
						<Button
							variant='outline'
							className='border-gray-700 hover:bg-gray-800 px-8 py-4 text-lg bg-gray-800'
						>
							Book a Tour
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
