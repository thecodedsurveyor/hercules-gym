'use client';

import { motion, fadeInUp } from '@/lib/motion';
import {
	Trophy,
	Medal,
	Star,
	Crown,
	Users,
} from '@/lib/icons';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GamificationSectionProps {
	userData: {
		id: string;
		name: string;
		totalPoints?: number;
		currentRank?: number;
		achievements?: any[];
	} | null;
}

export default function GamificationSection({
	userData,
}: GamificationSectionProps) {
	// Add null checks and fallbacks
	const safeUserData = userData || {
		id: '',
		name: '',
		totalPoints: 0,
		currentRank: 0,
		achievements: [],
	};

	return (
		<motion.div
			variants={fadeInUp}
			initial='initial'
			animate='animate'
			className='mb-8'
		>
			<h2 className='text-2xl font-bold text-white mb-6'>
				🏆 Achievements & Rankings
			</h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Points & Rank */}
				<Card className='bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Star className='w-5 h-5 text-yellow-500 mr-2' />
							Your Progress
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='text-center'>
							<div className='flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-3 mx-auto'>
								<Crown className='w-8 h-8 text-yellow-500' />
							</div>
							<p className='text-3xl font-bold text-white mb-1'>
								{safeUserData.totalPoints ||
									0}
							</p>
							<p className='text-yellow-400 text-sm'>
								Total Points
							</p>
						</div>
						<div className='text-center pt-3 border-t border-white/10'>
							<p className='text-white font-medium'>
								Rank #
								{safeUserData.currentRank ||
									0}
							</p>
							<p className='text-gray-400 text-xs'>
								You&apos;re in the top
								performers!
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Recent Achievements */}
				<Card className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Medal className='w-5 h-5 text-purple-500 mr-2' />
							Recent Achievements
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{(
								safeUserData.achievements ||
								[]
							)
								.slice(0, 3)
								.map(
									(
										achievement,
										index
									) => (
										<div
											key={index}
											className='flex items-center space-x-3 p-2 rounded bg-white/5'
										>
											<div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center'>
												<span className='text-sm'>
													{achievement?.badgeIcon ||
														'🏆'}
												</span>
											</div>
											<div className='flex-1'>
												<p className='text-white text-sm font-medium'>
													{achievement?.name ||
														'Recent Achievement'}
												</p>
												<p className='text-gray-400 text-xs'>
													+
													{achievement?.points ||
														0}{' '}
													points
												</p>
											</div>
											<Badge className='bg-purple-500/20 text-purple-400 text-xs'>
												New!
											</Badge>
										</div>
									)
								)}
							{(
								safeUserData.achievements ||
								[]
							).length === 0 && (
								<div className='text-center py-4'>
									<p className='text-gray-400 text-sm'>
										Complete your first
										workout to earn
										achievements!
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Leaderboard */}
				<Card className='bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center text-white'>
							<Users className='w-5 h-5 text-blue-500 mr-2' />
							Leaderboard
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{/* Placeholder leaderboard data */}
							{Array.from({ length: 5 }).map(
								(_, index) => (
									<div
										key={index}
										className='flex items-center space-x-3'
									>
										<div
											className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
												index === 0
													? 'bg-yellow-500 text-black'
													: index ===
														  1
														? 'bg-gray-400 text-white'
														: index ===
															  2
															? 'bg-orange-600 text-white'
															: 'bg-gray-600 text-white'
											}`}
										>
											{index + 1}
										</div>
										<div className='flex-1'>
											<p className='text-white text-sm font-medium truncate'>
												{index === 0
													? 'You'
													: `User ${index + 1}`}
											</p>
											<p className='text-gray-400 text-xs'>
												{Math.floor(
													Math.random() *
														1000
												)}{' '}
												pts •{' '}
												{Math.floor(
													Math.random() *
														30
												)}{' '}
												day streak
											</p>
										</div>
										{index < 3 && (
											<Trophy
												className={`w-4 h-4 ${
													index ===
													0
														? 'text-yellow-500'
														: index ===
															  1
															? 'text-gray-400'
															: 'text-orange-600'
												}`}
											/>
										)}
									</div>
								)
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
