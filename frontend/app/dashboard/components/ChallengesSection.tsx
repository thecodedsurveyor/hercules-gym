'use client';

import { motion } from 'framer-motion';
import {
	Calendar,
	Clock,
	Target,
	CheckCircle2,
	Plus,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ChallengesSectionProps {
	dailyChallenge: {
		id: string;
		title: string;
		description: string;
		points: number;
		type: string;
		isJoined: boolean;
		isCompleted: boolean;
	} | null;
	weeklyChallenge: {
		id: string;
		title: string;
		description: string;
		points: number;
		progress: number;
		targetValue: number;
		progressPercentage: number;
		isJoined: boolean;
		isCompleted: boolean;
	} | null;
	onJoinChallenge: (
		challengeId: string,
		challengeType: 'daily' | 'weekly'
	) => void;
	onCompleteChallenge: (challengeEntryId: string) => void;
}

export default function ChallengesSection({
	dailyChallenge,
	weeklyChallenge,
	onJoinChallenge,
	onCompleteChallenge,
}: ChallengesSectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className='mb-8'
		>
			<h2 className='text-2xl font-bold text-white mb-6'>
				🎯 Daily & Weekly Challenges
			</h2>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Daily Challenge */}
				<Card className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center justify-between text-white'>
							<div className='flex items-center'>
								<Calendar className='w-5 h-5 text-green-500 mr-2' />
								Daily Challenge
							</div>
							<Badge className='bg-green-500/20 text-green-400'>
								Today
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{dailyChallenge ? (
							<>
								<div>
									<h3 className='font-bold text-white text-lg mb-2'>
										{
											dailyChallenge.title
										}
									</h3>
									<p className='text-gray-300 text-sm mb-3'>
										{
											dailyChallenge.description
										}
									</p>
									<div className='flex items-center justify-between'>
										<span className='text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded'>
											{
												dailyChallenge.type
											}
										</span>
										<span className='text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded'>
											+
											{
												dailyChallenge.points
											}{' '}
											points
										</span>
									</div>
								</div>

								{dailyChallenge.isCompleted ? (
									<div className='flex items-center justify-center py-3 bg-green-500/20 rounded-lg'>
										<CheckCircle2 className='w-5 h-5 text-green-500 mr-2' />
										<span className='text-green-400 font-medium'>
											Completed!
										</span>
									</div>
								) : dailyChallenge.isJoined ? (
									<Button
										className='w-full bg-green-500 hover:bg-green-600 text-white'
										onClick={() =>
											onCompleteChallenge(
												dailyChallenge.id
											)
										}
									>
										<Target className='w-4 h-4 mr-2' />
										Complete Challenge
									</Button>
								) : (
									<Button
										className='w-full bg-green-500 hover:bg-green-600 text-white'
										onClick={() =>
											onJoinChallenge(
												dailyChallenge.id,
												'daily'
											)
										}
									>
										<Plus className='w-4 h-4 mr-2' />
										Join Challenge
									</Button>
								)}
							</>
						) : (
							<div className='text-center py-8'>
								<Calendar className='w-12 h-12 text-gray-600 mx-auto mb-3' />
								<p className='text-gray-400'>
									No daily challenge
									available today
								</p>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Weekly Challenge */}
				<Card className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20'>
					<CardHeader>
						<CardTitle className='flex items-center justify-between text-white'>
							<div className='flex items-center'>
								<Clock className='w-5 h-5 text-blue-500 mr-2' />
								Weekly Challenge
							</div>
							<Badge className='bg-blue-500/20 text-blue-400'>
								This Week
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{weeklyChallenge ? (
							<>
								<div>
									<h3 className='font-bold text-white text-lg mb-2'>
										{
											weeklyChallenge.title
										}
									</h3>
									<p className='text-gray-300 text-sm mb-3'>
										{
											weeklyChallenge.description
										}
									</p>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded'>
											Weekly Goal
										</span>
										<span className='text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded'>
											+
											{
												weeklyChallenge.points
											}{' '}
											points
										</span>
									</div>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-gray-400'>
											Progress
										</span>
										<span className='text-white font-medium'>
											{
												weeklyChallenge.progress
											}
											/
											{
												weeklyChallenge.targetValue
											}
										</span>
									</div>
									<Progress
										value={
											weeklyChallenge.progressPercentage
										}
										className='h-2 bg-black/20'
									/>
									<p className='text-xs text-gray-400'>
										{Math.round(
											weeklyChallenge.progressPercentage
										)}
										% complete
									</p>
								</div>

								{weeklyChallenge.isCompleted ? (
									<div className='flex items-center justify-center py-3 bg-blue-500/20 rounded-lg'>
										<CheckCircle2 className='w-5 h-5 text-blue-500 mr-2' />
										<span className='text-blue-400 font-medium'>
											Challenge
											Complete!
										</span>
									</div>
								) : !weeklyChallenge.isJoined ? (
									<Button
										className='w-full bg-blue-500 hover:bg-blue-600 text-white'
										onClick={() =>
											onJoinChallenge(
												weeklyChallenge.id,
												'weekly'
											)
										}
									>
										<Plus className='w-4 h-4 mr-2' />
										Join Weekly
										Challenge
									</Button>
								) : (
									<div className='text-center py-2'>
										<p className='text-gray-400 text-sm'>
											Keep going!
											You&apos;re
											doing great 💪
										</p>
									</div>
								)}
							</>
						) : (
							<div className='text-center py-8'>
								<Clock className='w-12 h-12 text-gray-600 mx-auto mb-3' />
								<p className='text-gray-400'>
									No weekly challenge
									available
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
