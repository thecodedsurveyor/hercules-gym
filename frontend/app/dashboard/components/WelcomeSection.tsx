'use client';

import { motion, fadeInUp } from '@/lib/motion';
import { Trophy, Zap, Target } from '@/lib/icons';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeSectionProps {
	userName: string;
	todayStats: {
		workouts: number;
		mealsLogged: number;
		pointsEarned: number;
	};
	totalStats: {
		totalWorkouts: number;
		totalCaloriesBurned: number;
		currentStreak: number;
	};
}

export default function WelcomeSection({
	userName,
	todayStats,
	totalStats,
}: WelcomeSectionProps) {
	return (
		<motion.div
			variants={fadeInUp}
			initial='initial'
			animate='animate'
			className='mb-8'
		>
			<Card className='bg-gradient-to-r from-brand/10 to-brand/5 border-brand/20'>
				<CardContent className='p-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold text-white mb-2'>
								Welcome back, {userName}! 🔥
							</h1>
							<p className='text-gray-300 text-lg mb-4'>
								Let&apos;s crush
								today&apos;s fitness goals!
							</p>
							<div className='flex flex-wrap gap-4 text-sm text-gray-400'>
								<span>
									✅ {todayStats.workouts}{' '}
									workouts completed
								</span>
								<span>
									🍽️{' '}
									{todayStats.mealsLogged}{' '}
									meals logged
								</span>
								<span>
									⭐{' '}
									{
										todayStats.pointsEarned
									}{' '}
									points earned today
								</span>
							</div>
						</div>
						<div className='hidden md:flex items-center space-x-6'>
							<div className='text-center'>
								<div className='flex items-center justify-center w-12 h-12 bg-brand/20 rounded-full mb-2'>
									<Trophy className='w-6 h-6 text-brand' />
								</div>
								<p className='text-xs text-gray-400'>
									Total Workouts
								</p>
								<p className='text-lg font-bold text-white'>
									{
										totalStats.totalWorkouts
									}
								</p>
							</div>
							<div className='text-center'>
								<div className='flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full mb-2'>
									<Zap className='w-6 h-6 text-orange-500' />
								</div>
								<p className='text-xs text-gray-400'>
									Calories Burned
								</p>
								<p className='text-lg font-bold text-white'>
									{Math.round(
										totalStats.totalCaloriesBurned
									)}
								</p>
							</div>
							<div className='text-center'>
								<div className='flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-2'>
									<Target className='w-6 h-6 text-green-500' />
								</div>
								<p className='text-xs text-gray-400'>
									Current Streak
								</p>
								<p className='text-lg font-bold text-white'>
									{
										totalStats.currentStreak
									}{' '}
									days
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
