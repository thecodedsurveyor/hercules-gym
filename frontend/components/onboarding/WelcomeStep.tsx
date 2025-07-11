import { motion } from 'framer-motion';
import {
	Dumbbell,
	Target,
	Users,
	Trophy,
	Sparkles,
	Heart,
} from 'lucide-react';

interface WelcomeStepProps {
	userData: any;
}

export default function WelcomeStep({
	userData,
}: WelcomeStepProps) {
	const benefits = [
		{
			icon: <Target className='w-6 h-6 text-brand' />,
			title: 'Personalized Fitness Plans',
			description:
				'AI-powered workouts tailored to your goals, fitness level, and preferences',
		},
		{
			icon: (
				<Dumbbell className='w-6 h-6 text-brand' />
			),
			title: 'Smart Meal Recommendations',
			description:
				'Nutrition plans that complement your workouts and dietary preferences',
		},
		{
			icon: <Users className='w-6 h-6 text-brand' />,
			title: 'Community Engagement',
			description:
				'Connect with like-minded fitness enthusiasts and share your journey',
		},
		{
			icon: <Trophy className='w-6 h-6 text-brand' />,
			title: 'Gamified Rewards',
			description:
				'Earn badges, points, and compete on leaderboards as you achieve your goals',
		},
	];

	return (
		<div className='space-y-8'>
			{/* Welcome Message */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center space-y-4'
			>
				<div className='flex justify-center mb-4'>
					<div className='bg-brand/10 p-4 rounded-full'>
						<Sparkles className='w-12 h-12 text-brand' />
					</div>
				</div>

				<h2 className='text-2xl md:text-3xl font-bold text-white'>
					Welcome to Hercules Gym,{' '}
					{userData?.name?.split(' ')[0] ||
						'Fitness Enthusiast'}
					!
				</h2>

				<p className='text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed'>
					Your{' '}
					<span className='text-brand font-semibold'>
						AI-powered fitness journey
					</span>{' '}
					starts now! We&apos;re here to help you
					achieve your goals with personalized
					plans designed just for you.
				</p>
			</motion.div>

			{/* Benefits Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='grid md:grid-cols-2 gap-6'
			>
				{benefits.map((benefit, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.3 + index * 0.1,
						}}
						className='bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-brand/30 transition-all duration-300'
					>
						<div className='flex items-start space-x-4'>
							<div className='bg-brand/10 p-3 rounded-lg flex-shrink-0'>
								{benefit.icon}
							</div>
							<div>
								<h3 className='text-lg font-semibold text-white mb-2'>
									{benefit.title}
								</h3>
								<p className='text-gray-400 text-sm leading-relaxed'>
									{benefit.description}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Motivational Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className='bg-gradient-to-r from-brand/10 to-brand/5 rounded-xl p-6 border border-brand/20 text-center'
			>
				<Heart className='w-8 h-8 text-brand mx-auto mb-3' />
				<h3 className='text-xl font-semibold text-white mb-2'>
					Ready to Transform Your Life?
				</h3>
				<p className='text-gray-300 mb-4'>
					Let&apos;s gather some information about
					you to create the perfect fitness
					experience. This will only take a few
					minutes, and every detail helps us serve
					you better.
				</p>
				<div className='flex justify-center space-x-8 text-sm text-gray-400'>
					<div className='flex items-center space-x-1'>
						<div className='w-2 h-2 bg-brand rounded-full'></div>
						<span>7 Simple Steps</span>
					</div>
					<div className='flex items-center space-x-1'>
						<div className='w-2 h-2 bg-brand rounded-full'></div>
						<span>5 Minutes Total</span>
					</div>
					<div className='flex items-center space-x-1'>
						<div className='w-2 h-2 bg-brand rounded-full'></div>
						<span>Instant Results</span>
					</div>
				</div>
			</motion.div>

			{/* Get Started CTA */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.8 }}
				className='text-center'
			>
				<p className='text-gray-400 text-sm mb-4'>
					Click{' '}
					<span className='text-brand font-medium'>
						&quot;Continue&quot;
					</span>{' '}
					below to begin your personalized setup
				</p>
				<div className='flex justify-center'>
					<div className='bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/50'>
						<span className='text-xs text-gray-500'>
							All information is secure and
							used only to personalize your
							experience
						</span>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
