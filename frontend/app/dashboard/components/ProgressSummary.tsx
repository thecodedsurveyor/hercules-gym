'use client';

import { motion, fadeInUp } from '@/lib/motion';
import {
	TrendingUp,
	Target,
	Calendar,
	Award,
} from '@/lib/icons';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressSummaryProps {
	weeklyProgress: {
		workoutsCompleted: number;
		workoutGoal: number;
		progressPercentage: number;
	};
	fitnessGoals: {
		primaryGoal: string;
		progressPercentage: number;
	};
	motivationalStats: {
		consistentDays: number;
		workoutsToWeeklyGoal: number;
	};
}

export default function ProgressSummary({
	weeklyProgress,
	fitnessGoals,
	motivationalStats,
}: ProgressSummaryProps) {
	const progressCards = [
		{
			title: 'Weekly Workout Goal',
			icon: <Target className='w-5 h-5' />,
			progress: weeklyProgress.progressPercentage,
			current: weeklyProgress.workoutsCompleted,
			total: weeklyProgress.workoutGoal,
			color: 'from-blue-500/20 to-cyan-500/20',
			border: 'border-blue-500/30',
			description: `${weeklyProgress.workoutsCompleted} of ${weeklyProgress.workoutGoal} workouts`,
		},
		{
			title: 'Fitness Goal Progress',
			icon: <TrendingUp className='w-5 h-5' />,
			progress: fitnessGoals.progressPercentage,
			current: fitnessGoals.progressPercentage,
			total: 100,
			color: 'from-green-500/20 to-emerald-500/20',
			border: 'border-green-500/30',
			description: fitnessGoals.primaryGoal,
		},
	];

	return (
		<motion.div
			variants={fadeInUp}
			initial='initial'
			animate='animate'
			className='mb-8'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{progressCards.map((card, index) => (
					<Card
						key={index}
						className={`bg-gradient-to-br ${card.color} border ${card.border}`}
					>
						<CardHeader className='pb-3'>
							<CardTitle className='flex items-center text-white text-sm font-medium'>
								{card.icon}
								<span className='ml-2'>
									{card.title}
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='text-2xl font-bold text-white'>
										{Math.round(
											card.current
										)}
										{card.title.includes(
											'Goal Progress'
										)
											? '%'
											: ''}
									</span>
									<span className='text-xs text-gray-300'>
										/{card.total}
										{card.title.includes(
											'Goal Progress'
										)
											? '%'
											: ''}
									</span>
								</div>
								<Progress
									value={card.progress}
									className='h-2 bg-black/20'
								/>
								<p className='text-xs text-gray-300'>
									{card.description}
								</p>
							</div>
						</CardContent>
					</Card>
				))}

				{/* Motivational Stats Card */}
				<Card className='bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30'>
					<CardHeader className='pb-3'>
						<CardTitle className='flex items-center text-white text-sm font-medium'>
							<Award className='w-5 h-5' />
							<span className='ml-2'>
								Achievements
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							<div className='text-center'>
								<p className='text-2xl font-bold text-white mb-1'>
									{
										motivationalStats.consistentDays
									}
								</p>
								<p className='text-xs text-gray-300'>
									days of consistency! 🎉
								</p>
							</div>
							{motivationalStats.workoutsToWeeklyGoal >
								0 && (
								<div className='text-center pt-2 border-t border-white/10'>
									<p className='text-sm text-gray-300'>
										Only{' '}
										<span className='font-bold text-white'>
											{
												motivationalStats.workoutsToWeeklyGoal
											}
										</span>{' '}
										more workouts to
										reach your weekly
										goal!
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
