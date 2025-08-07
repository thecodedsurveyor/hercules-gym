'use client';

import { motion, fadeInUp } from '@/lib/motion';
import {
	MessageCircle,
	Heart,
	Share2,
	Camera,
	Users2,
} from '@/lib/icons';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface CommunitySectionProps {
	leaderboardData?: any[];
	isLoading?: boolean;
}

export default function CommunitySection({
	leaderboardData,
	isLoading,
}: CommunitySectionProps) {
	// Add null checks and fallbacks
	const safeLeaderboardData = leaderboardData || [];

	// Mock community posts for now
	const communityPosts = [
		{
			id: '1',
			user: { name: 'John Doe' },
			content:
				'Just completed my deadlift personal record! Feeling stronger every day 💪',
			imageUrls: [],
			postType: 'achievement',
			likes: 12,
			createdAt: new Date().toISOString(),
			comments: [],
		},
		{
			id: '2',
			user: { name: 'Jane Smith' },
			content:
				'Hit a new personal record on deadlifts today! 🏋️‍♀️',
			imageUrls: [],
			postType: 'progress',
			likes: 8,
			createdAt: new Date().toISOString(),
			comments: [],
		},
	];

	const userAchievements = [
		{
			achievement: {
				name: 'First Workout',
				badgeIcon: '🏆',
				points: 50,
			},
		},
	];

	return (
		<motion.div
			variants={fadeInUp}
			initial='initial'
			animate='animate'
			className='mb-8'
		>
			<h2 className='text-2xl font-bold text-white mb-6'>
				👥 Community & Social
			</h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Community Feed */}
				<div className='lg:col-span-2'>
					<Card className='bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between text-white'>
								<div className='flex items-center'>
									<Users2 className='w-5 h-5 text-indigo-500 mr-2' />
									Community Feed
								</div>
								<Button
									size='sm'
									className='bg-indigo-500 hover:bg-indigo-600 text-white'
								>
									<Camera className='w-4 h-4 mr-1' />
									Share Progress
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{communityPosts
									.slice(0, 3)
									.map((post, index) => (
										<div
											key={post.id}
											className='p-4 bg-white/5 rounded-lg'
										>
											<div className='flex items-start space-x-3'>
												<Avatar className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500'>
													<span className='text-white text-sm font-bold'>
														{post.user.name.charAt(
															0
														)}
													</span>
												</Avatar>
												<div className='flex-1'>
													<div className='flex items-center space-x-2 mb-2'>
														<span className='text-white font-medium text-sm'>
															{
																post
																	.user
																	.name
															}
														</span>
														<span className='text-xs text-gray-400'>
															{new Date(
																post.createdAt
															).toLocaleDateString()}
														</span>
														<span
															className={`text-xs px-2 py-1 rounded ${
																post.postType ===
																'achievement'
																	? 'bg-yellow-500/20 text-yellow-400'
																	: post.postType ===
																		  'progress'
																		? 'bg-green-500/20 text-green-400'
																		: 'bg-blue-500/20 text-blue-400'
															}`}
														>
															{
																post.postType
															}
														</span>
													</div>
													<p className='text-gray-300 text-sm mb-3'>
														{
															post.content
														}
													</p>
													{post
														.imageUrls
														.length >
														0 && (
														<div className='mb-3'>
															<div className='w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center'>
																<Camera className='w-8 h-8 text-gray-600' />
																<span className='text-gray-400 text-sm ml-2'>
																	Progress
																	Photo
																</span>
															</div>
														</div>
													)}
													<div className='flex items-center space-x-4'>
														<button className='flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors'>
															<Heart className='w-4 h-4' />
															<span className='text-xs'>
																{
																	post.likes
																}
															</span>
														</button>
														<button className='flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors'>
															<MessageCircle className='w-4 h-4' />
															<span className='text-xs'>
																{
																	post
																		.comments
																		.length
																}
															</span>
														</button>
														<button className='flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors'>
															<Share2 className='w-4 h-4' />
															<span className='text-xs'>
																Share
															</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									))}

								{communityPosts.length ===
									0 && (
									<div className='text-center py-8'>
										<Users2 className='w-12 h-12 text-gray-600 mx-auto mb-3' />
										<p className='text-gray-400 mb-2'>
											No community
											posts yet
										</p>
										<p className='text-gray-500 text-sm'>
											Be the first to
											share your
											fitness journey!
										</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className='space-y-6'>
					{/* Share Achievement */}
					<Card className='bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20'>
						<CardHeader>
							<CardTitle className='flex items-center text-white text-sm'>
								<Share2 className='w-4 h-4 text-yellow-500 mr-2' />
								Share Your Success
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							{userAchievements
								.slice(0, 2)
								.map(
									(
										achievement,
										index
									) => (
										<div
											key={index}
											className='p-3 bg-white/5 rounded-lg'
										>
											<p className='text-white text-sm font-medium mb-1'>
												{achievement
													.achievement
													?.name ||
													'Recent Achievement'}
											</p>
											<Button
												size='sm'
												className='w-full bg-yellow-500 hover:bg-yellow-600 text-black'
											>
												Share on
												Social Media
											</Button>
										</div>
									)
								)}
							{userAchievements.length ===
								0 && (
								<div className='text-center py-4'>
									<p className='text-gray-400 text-sm'>
										Complete workouts to
										earn shareable
										achievements!
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Trainer Interaction */}
					<Card className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'>
						<CardHeader>
							<CardTitle className='flex items-center text-white text-sm'>
								<MessageCircle className='w-4 h-4 text-green-500 mr-2' />
								Trainer Support
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							<div className='text-center'>
								<div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2'>
									<span className='text-green-500 text-lg'>
										💪
									</span>
								</div>
								<p className='text-white text-sm font-medium mb-1'>
									Trainer Tip of the Day
								</p>
								<p className='text-gray-300 text-xs mb-3'>
									&ldquo;Focus on form
									over speed. Quality reps
									build lasting
									strength!&rdquo;
								</p>
							</div>
							<Button
								size='sm'
								className='w-full bg-green-500 hover:bg-green-600 text-white'
							>
								Chat with Trainer
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</motion.div>
	);
}
