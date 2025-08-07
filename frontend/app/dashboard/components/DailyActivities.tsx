'use client';

import { motion, fadeInUp } from '@/lib/motion';
import {
	Play,
	Utensils,
	Sparkles,
	ChevronRight,
	RefreshCw,
} from '@/lib/icons';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Activity {
	id: string;
	type: string;
	title: string;
	description: string;
	duration?: string;
	category?: string;
	priority?: string;
	calories?: number;
	protein?: number;
	quote?: string;
	[key: string]: any;
}

interface DailyActivitiesProps {
	todayActivities: Activity[];
}

export default function DailyActivities({
	todayActivities,
}: DailyActivitiesProps) {
	// Extract different types of activities
	const workoutActivities = todayActivities.filter(
		(activity) => activity.type === 'workout'
	);
	const mealActivities = todayActivities.filter(
		(activity) => activity.type === 'meal'
	);
	const motivationActivities = todayActivities.filter(
		(activity) => activity.type === 'motivation'
	);

	// Get the first workout, or create a fallback
	const todayWorkout = workoutActivities[0] || {
		title: 'No workout scheduled',
		description:
			'Check back later for AI-generated workout recommendations',
		category: 'general',
		priority: 'medium',
		duration: '30',
	};

	// Get meals for today
	const todayMeals = mealActivities.slice(0, 3);

	// Get motivation
	const todayMotivation = motivationActivities[0] || {
		description:
			'Great things never come from comfort zones.',
		category: 'motivation',
	};

	return (
		<motion.div
			variants={fadeInUp}
			initial='initial'
			animate='animate'
			className='mb-8'
		>
			<h2 className='text-2xl font-bold text-white mb-6'>
				🤖 AI-Powered Daily Activities
			</h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Daily Workout Recommendation */}
				<Card className='bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Play className='w-5 h-5 text-orange-500 mr-2' />
							Today&apos;s Workout
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<h3 className='font-bold text-white text-lg mb-2'>
								{todayWorkout.title}
							</h3>
							<p className='text-gray-300 text-sm mb-3'>
								{todayWorkout.description}
							</p>
							<div className='flex items-center justify-between'>
								<span className='text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded'>
									{todayWorkout.category ||
										'general'}
								</span>
								<span
									className={`text-xs px-2 py-1 rounded ${
										todayWorkout.priority ===
										'high'
											? 'text-red-400 bg-red-500/20'
											: 'text-yellow-400 bg-yellow-500/20'
									}`}
								>
									{todayWorkout.priority ||
										'medium'}{' '}
									priority
								</span>
							</div>
							{todayWorkout.duration && (
								<div className='mt-2'>
									<span className='text-xs text-gray-400'>
										Duration:{' '}
										{
											todayWorkout.duration
										}{' '}
										min
									</span>
								</div>
							)}
						</div>
						<Button className='w-full bg-orange-500 hover:bg-orange-600 text-white'>
							<Play className='w-4 h-4 mr-2' />
							Start Workout
						</Button>
					</CardContent>
				</Card>

				{/* Personalized Meal Plan */}
				<Card className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Utensils className='w-5 h-5 text-green-500 mr-2' />
							Today&apos;s Meal Plan
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-3'>
							{todayMeals.length > 0 ? (
								todayMeals.map(
									(meal, index) => (
										<div
											key={meal.id}
											className='flex items-center justify-between py-2 border-t border-white/10 first:border-t-0'
										>
											<span className='text-sm text-gray-400'>
												{index === 0
													? 'Breakfast:'
													: index ===
														  1
														? 'Lunch:'
														: 'Dinner:'}
											</span>
											<div className='text-right'>
												<span className='text-sm text-white font-medium block'>
													{
														meal.title
													}
												</span>
												{meal.calories && (
													<span className='text-xs text-gray-400'>
														{
															meal.calories
														}{' '}
														cal
													</span>
												)}
											</div>
										</div>
									)
								)
							) : (
								<div className='text-center py-4'>
									<p className='text-gray-400 text-sm'>
										No meal plan
										available today
									</p>
									<p className='text-gray-500 text-xs mt-1'>
										Check back later for
										AI-generated meal
										recommendations
									</p>
								</div>
							)}
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1'
							>
								Log Meal
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='flex-1'
							>
								<RefreshCw className='w-4 h-4 mr-1' />
								Swap
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Motivational AI Post */}
				<Card className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Sparkles className='w-5 h-5 text-purple-500 mr-2' />
							Daily Motivation
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='text-center'>
							<div className='mb-4'>
								<span className='text-4xl'>
									💪
								</span>
							</div>
							<blockquote className='text-white font-medium text-lg italic mb-3 leading-relaxed'>
								&ldquo;
								{todayMotivation.quote ||
									todayMotivation.description ||
									'Great things never come from comfort zones.'}
								&rdquo;
							</blockquote>
							<p className='text-xs text-gray-400'>
								{todayMotivation.category ||
									'motivation'}
							</p>
						</div>
						<Button
							variant='outline'
							size='sm'
							className='w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
						>
							Share this motivation
							<ChevronRight className='w-4 h-4 ml-1' />
						</Button>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
