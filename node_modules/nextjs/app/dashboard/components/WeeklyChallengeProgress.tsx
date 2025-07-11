'use client';

import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Calendar,
	CheckCircle,
	Circle,
	Trophy,
	Target,
	Clock,
} from 'lucide-react';

interface WeeklyChallengeProgressProps {
	userId: string;
}

interface DailyBreakdown {
	date: Date;
	dayName: string;
	value: number;
	activities: Array<{
		id: string;
		name: string;
		value: number;
		time: Date;
	}>;
	isToday: boolean;
	isCompleted: boolean;
}

interface WeeklyChallengeData {
	hasActiveChallenge: boolean;
	challenge: {
		id: string;
		title: string;
		description: string;
		type: string;
		targetValue: number;
		points: number;
		startDate: Date;
		endDate: Date;
	} | null;
	progress: {
		current: number;
		target: number;
		percentage: number;
		isCompleted: boolean;
		daysRemaining: number;
		isJoined: boolean;
		joinedAt?: Date;
		completedAt?: Date;
		dailyBreakdown: DailyBreakdown[];
	} | null;
}

export default function WeeklyChallengeProgress({
	userId,
}: WeeklyChallengeProgressProps) {
	const [challengeData, setChallengeData] =
		useState<WeeklyChallengeData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchChallengeProgress = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`http://localhost:3002/dashboard/weekly-challenge-progress/${userId}`
			);

			if (!response.ok) {
				throw new Error(
					'Failed to fetch challenge progress'
				);
			}

			const data = await response.json();
			setChallengeData(data);
			setError(null);
		} catch (err) {
			console.error(
				'Error fetching challenge progress:',
				err
			);
			setError('Failed to load challenge progress');
		} finally {
			setLoading(false);
		}
	};

	const joinChallenge = async () => {
		if (!challengeData?.challenge) return;

		try {
			const response = await fetch(
				'http://localhost:3002/dashboard/join-challenge',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId,
						challengeId:
							challengeData.challenge.id,
						challengeType: 'weekly',
					}),
				}
			);

			if (response.ok) {
				await fetchChallengeProgress(); // Refresh data
			}
		} catch (err) {
			console.error('Error joining challenge:', err);
		}
	};

	useEffect(() => {
		fetchChallengeProgress();
	}, [userId]);

	if (loading) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Target className='h-5 w-5' />
						Weekly Challenge Progress
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='animate-pulse space-y-4'>
						<div className='h-4 bg-muted rounded w-3/4'></div>
						<div className='h-8 bg-muted rounded'></div>
						<div className='flex gap-2'>
							{Array.from({ length: 7 }).map(
								(_, i) => (
									<div
										key={i}
										className='h-16 w-16 bg-muted rounded'
									></div>
								)
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-red-600'>
						<Target className='h-5 w-5' />
						Weekly Challenge Progress
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-red-600'>{error}</p>
					<Button
						onClick={fetchChallengeProgress}
						className='mt-4'
					>
						Try Again
					</Button>
				</CardContent>
			</Card>
		);
	}

	if (!challengeData?.hasActiveChallenge) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Target className='h-5 w-5' />
						Weekly Challenge Progress
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-muted-foreground'>
						No active weekly challenge at the
						moment.
					</p>
					<p className='text-sm text-muted-foreground mt-2'>
						Check back later for new challenges!
					</p>
				</CardContent>
			</Card>
		);
	}

	const { challenge, progress } = challengeData;

	if (!challenge || !progress) {
		return null;
	}

	const getProgressColor = () => {
		if (progress.isCompleted) return 'bg-green-500';
		if (progress.percentage >= 75) return 'bg-blue-500';
		if (progress.percentage >= 50)
			return 'bg-yellow-500';
		return 'bg-gray-400';
	};

	const formatChallengeType = (type: string) => {
		switch (type) {
			case 'workout':
				return 'workouts';
			case 'calories':
				return 'calories';
			default:
				return type;
		}
	};

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Target className='h-5 w-5' />
						{challenge.title}
					</div>
					<div className='flex items-center gap-2'>
						{progress.isCompleted && (
							<Badge
								variant='default'
								className='bg-green-500'
							>
								<Trophy className='h-3 w-3 mr-1' />
								Completed
							</Badge>
						)}
						<Badge variant='outline'>
							{challenge.points} pts
						</Badge>
					</div>
				</CardTitle>
				<CardDescription>
					{challenge.description}
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-6'>
				{/* Progress Overview */}
				<div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<span className='text-sm font-medium'>
							Progress: {progress.current} /{' '}
							{progress.target}{' '}
							{formatChallengeType(
								challenge.type
							)}
						</span>
						<span className='text-sm text-muted-foreground'>
							{progress.percentage}%
						</span>
					</div>

					<Progress
						value={progress.percentage}
						className='h-3'
					/>

					<div className='flex justify-between items-center text-sm text-muted-foreground'>
						<span className='flex items-center gap-1'>
							<Clock className='h-3 w-3' />
							{progress.daysRemaining} days
							remaining
						</span>
						{progress.joinedAt && (
							<span>
								Joined{' '}
								{new Date(
									progress.joinedAt
								).toLocaleDateString()}
							</span>
						)}
					</div>
				</div>

				{/* Join Button (if not joined) */}
				{!progress.isJoined && (
					<div className='text-center'>
						<Button
							onClick={joinChallenge}
							className='w-full'
						>
							Join Challenge
						</Button>
					</div>
				)}

				{/* Daily Breakdown */}
				{progress.isJoined &&
					progress.dailyBreakdown && (
						<div className='space-y-3'>
							<h4 className='font-medium flex items-center gap-2'>
								<Calendar className='h-4 w-4' />
								Daily Progress
							</h4>

							<div className='grid grid-cols-7 gap-2'>
								{progress.dailyBreakdown.map(
									(day, index) => (
										<div
											key={index}
											className={`
                    flex flex-col items-center p-3 rounded-lg border text-center
                    ${day.isToday ? 'border-primary bg-primary/5' : 'border-border'}
                    ${day.isCompleted ? 'bg-green-50 dark:bg-green-900/20' : ''}
                  `}
										>
											<div className='text-xs font-medium text-muted-foreground mb-1'>
												{
													day.dayName
												}
											</div>

											<div className='flex items-center justify-center mb-1'>
												{day.isCompleted ? (
													<CheckCircle className='h-6 w-6 text-green-500' />
												) : (
													<Circle
														className={`h-6 w-6 ${day.isToday ? 'text-primary' : 'text-muted-foreground'}`}
													/>
												)}
											</div>

											<div className='text-xs font-bold'>
												{challenge.type ===
												'workout'
													? day.value >
														0
														? `${day.value}`
														: '0'
													: day.value >
														  0
														? `${day.value}`
														: '0'}
											</div>

											{day.isToday && (
												<div className='text-xs text-primary font-medium mt-1'>
													Today
												</div>
											)}
										</div>
									)
								)}
							</div>

							{/* Daily Activities */}
							{progress.dailyBreakdown.some(
								(day) =>
									day.isToday &&
									day.activities.length >
										0
							) && (
								<div className='mt-4 p-4 bg-muted/50 rounded-lg'>
									<h5 className='font-medium mb-2'>
										Today's Activities
									</h5>
									<div className='space-y-1'>
										{progress.dailyBreakdown
											.find(
												(day) =>
													day.isToday
											)
											?.activities.map(
												(
													activity,
													index
												) => (
													<div
														key={
															index
														}
														className='flex justify-between text-sm'
													>
														<span>
															{
																activity.name
															}
														</span>
														<span className='text-muted-foreground'>
															{challenge.type ===
															'workout'
																? '1 workout'
																: `${activity.value} cal`}
														</span>
													</div>
												)
											)}
									</div>
								</div>
							)}
						</div>
					)}

				{/* Completion Message */}
				{progress.isCompleted &&
					progress.completedAt && (
						<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
							<Trophy className='h-8 w-8 text-green-500 mx-auto mb-2' />
							<p className='font-medium text-green-700 dark:text-green-300'>
								Challenge Completed!
							</p>
							<p className='text-sm text-green-600 dark:text-green-400'>
								You earned{' '}
								{challenge.points} points on{' '}
								{new Date(
									progress.completedAt
								).toLocaleDateString()}
							</p>
						</div>
					)}
			</CardContent>
		</Card>
	);
}
