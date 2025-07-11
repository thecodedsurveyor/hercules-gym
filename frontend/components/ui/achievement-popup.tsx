'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Trophy,
	Flame,
	Calendar,
	Star,
} from 'lucide-react';
import { Button } from './button';

interface Achievement {
	name: string;
	description: string;
	icon: 'trophy' | 'flame' | 'calendar' | 'star';
	points: number;
}

interface AchievementPopupProps {
	achievement: Achievement | null;
	isVisible: boolean;
	onClose: () => void;
}

const iconMap = {
	trophy: Trophy,
	flame: Flame,
	calendar: Calendar,
	star: Star,
};

export function AchievementPopup({
	achievement,
	isVisible,
	onClose,
}: AchievementPopupProps) {
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		if (isVisible && achievement) {
			setShowConfetti(true);
			// Auto close after 5 seconds
			const timer = setTimeout(() => {
				onClose();
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isVisible, achievement, onClose]);

	if (!achievement) return null;

	const IconComponent = iconMap[achievement.icon];

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
						onClick={onClose}
					/>

					{/* Achievement Card */}
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.8,
							y: 50,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							y: 50,
						}}
						transition={{
							type: 'spring',
							damping: 25,
							stiffness: 300,
						}}
						className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'
					>
						<div className='bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 p-1 rounded-2xl shadow-2xl'>
							<div className='bg-gray-900 rounded-xl p-8 text-center max-w-md'>
								{/* Confetti Effect */}
								{showConfetti && (
									<div className='absolute inset-0 pointer-events-none'>
										{[...Array(20)].map(
											(_, i) => (
												<motion.div
													key={i}
													initial={{
														opacity: 1,
														y: -20,
														x: 0,
													}}
													animate={{
														opacity: 0,
														y: 100,
														x:
															Math.random() *
																200 -
															100,
														rotate: 360,
													}}
													transition={{
														duration: 2,
														delay:
															Math.random() *
															0.5,
														ease: 'easeOut',
													}}
													className='absolute top-4 left-1/2 w-2 h-2 bg-yellow-400 rounded-full'
												/>
											)
										)}
									</div>
								)}

								{/* Achievement Icon */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: 0.2,
										type: 'spring',
									}}
									className='mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'
								>
									<IconComponent className='w-10 h-10 text-gray-900' />
								</motion.div>

								{/* Achievement Title */}
								<motion.h2
									initial={{
										opacity: 0,
										y: 20,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										delay: 0.3,
									}}
									className='text-2xl font-bold text-yellow-400 mb-2'
								>
									Achievement Unlocked!
								</motion.h2>

								{/* Achievement Name */}
								<motion.h3
									initial={{
										opacity: 0,
										y: 20,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										delay: 0.4,
									}}
									className='text-xl font-semibold text-white mb-2'
								>
									{achievement.name}
								</motion.h3>

								{/* Achievement Description */}
								<motion.p
									initial={{
										opacity: 0,
										y: 20,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										delay: 0.5,
									}}
									className='text-gray-300 mb-4'
								>
									{
										achievement.description
									}
								</motion.p>

								{/* Points Earned */}
								<motion.div
									initial={{
										opacity: 0,
										scale: 0,
									}}
									animate={{
										opacity: 1,
										scale: 1,
									}}
									transition={{
										delay: 0.6,
										type: 'spring',
									}}
									className='bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-6'
								>
									<div className='flex items-center justify-center gap-2'>
										<Star className='w-5 h-5 text-yellow-400' />
										<span className='text-yellow-400 font-semibold'>
											+
											{
												achievement.points
											}{' '}
											Points
										</span>
									</div>
								</motion.div>

								{/* Close Button */}
								<motion.div
									initial={{
										opacity: 0,
										y: 20,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										delay: 0.7,
									}}
								>
									<Button
										onClick={onClose}
										className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 font-semibold px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-105'
									>
										Awesome!
									</Button>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

// Streak Achievement Component
interface StreakPopupProps {
	streak: number;
	isVisible: boolean;
	onClose: () => void;
}

export function StreakPopup({
	streak,
	isVisible,
	onClose,
}: StreakPopupProps) {
	const getAchievement = (
		streakCount: number
	): Achievement | null => {
		if (streakCount === 7) {
			return {
				name: 'Week Warrior',
				description:
					"You've logged in for 7 consecutive days!",
				icon: 'flame',
				points: 100,
			};
		} else if (streakCount === 14) {
			return {
				name: 'Two Week Champion',
				description:
					'Two weeks of consistent dedication!',
				icon: 'trophy',
				points: 250,
			};
		} else if (streakCount === 30) {
			return {
				name: 'Monthly Master',
				description:
					'A full month of commitment to your fitness!',
				icon: 'calendar',
				points: 500,
			};
		} else if (streakCount === 100) {
			return {
				name: 'Century Streak',
				description:
					'Incredible! 100 days of dedication!',
				icon: 'star',
				points: 1000,
			};
		}
		return null;
	};

	const achievement = getAchievement(streak);

	return (
		<AchievementPopup
			achievement={achievement}
			isVisible={isVisible && achievement !== null}
			onClose={onClose}
		/>
	);
}
