'use client';

import { motion } from 'framer-motion';
import {
	Play,
	Utensils,
	Sparkles,
	ChevronRight,
	RefreshCw,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DailyActivitiesProps {
	aiContent: {
		workoutRecommendation: {
			title: string;
			description: string;
			category: string;
			priority: string;
		};
		mealPlan: {
			breakfast: string;
			lunch: string;
			dinner: string;
		};
		dailyMotivation: {
			quote: string;
			category: string;
		} | null;
	};
}

export default function DailyActivities({
	aiContent,
}: DailyActivitiesProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
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
							Today's Workout
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<h3 className='font-bold text-white text-lg mb-2'>
								{
									aiContent
										.workoutRecommendation
										.title
								}
							</h3>
							<p className='text-gray-300 text-sm mb-3'>
								{
									aiContent
										.workoutRecommendation
										.description
								}
							</p>
							<div className='flex items-center justify-between'>
								<span className='text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded'>
									{
										aiContent
											.workoutRecommendation
											.category
									}
								</span>
								<span
									className={`text-xs px-2 py-1 rounded ${
										aiContent
											.workoutRecommendation
											.priority ===
										'high'
											? 'text-red-400 bg-red-500/20'
											: 'text-yellow-400 bg-yellow-500/20'
									}`}
								>
									{
										aiContent
											.workoutRecommendation
											.priority
									}{' '}
									priority
								</span>
							</div>
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
							Today's Meal Plan
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-3'>
							<div className='flex items-center justify-between py-2'>
								<span className='text-sm text-gray-400'>
									Breakfast:
								</span>
								<span className='text-sm text-white font-medium'>
									{
										aiContent.mealPlan
											.breakfast
									}
								</span>
							</div>
							<div className='flex items-center justify-between py-2 border-t border-white/10'>
								<span className='text-sm text-gray-400'>
									Lunch:
								</span>
								<span className='text-sm text-white font-medium'>
									{
										aiContent.mealPlan
											.lunch
									}
								</span>
							</div>
							<div className='flex items-center justify-between py-2 border-t border-white/10'>
								<span className='text-sm text-gray-400'>
									Dinner:
								</span>
								<span className='text-sm text-white font-medium'>
									{
										aiContent.mealPlan
											.dinner
									}
								</span>
							</div>
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
								"
								{aiContent.dailyMotivation
									?.quote ||
									'Great things never come from comfort zones.'}
								"
							</blockquote>
							<p className='text-xs text-gray-400'>
								{aiContent.dailyMotivation
									?.category ||
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
