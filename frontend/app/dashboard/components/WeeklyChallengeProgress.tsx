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
} from '@/lib/icons';

interface WeeklyChallengeProgressProps {
	progress: WeeklyChallengeData | null | undefined;
	isLoading: boolean;
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
	weeklyChallenge: {
		id: string | number;
		name?: string;
		title?: string;
		description: string;
		points: number;
		difficulty?: string;
		type: string;
		progress?: number;
		completed?: boolean;
		reward?: string;
		status?: string;
		target?: number;
	};
	progress: {
		percentage: number;
		completedDays: number;
		totalDays: number;
		weeklyBreakdown: Array<{
			date: Date;
			dayName: string;
			value: number;
			activities: Array<{
				id: string;
				name: string;
				value: number;
				time: string;
			}>;
			isToday: boolean;
			isCompleted: boolean;
		}>;
	};
}

export default function WeeklyChallengeProgress({
	progress,
	isLoading,
}: WeeklyChallengeProgressProps) {
	// Use the passed props instead of internal state
	const challengeData = progress;
	const loading = isLoading;
	const error = null; // Error handling should be done at the parent level

	// Data fetching is now handled by the parent component

	// Challenge actions should be handled by the parent component

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
						onClick={() =>
							window.location.reload()
						}
						className='mt-4'
					>
						Try Again
					</Button>
				</CardContent>
			</Card>
		);
	}

	if (!challengeData?.weeklyChallenge) {
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

	const { weeklyChallenge, progress: challengeProgress } =
		challengeData;

	if (!weeklyChallenge || !challengeProgress) {
		return null;
	}

	const getProgressColor = () => {
		if (challengeProgress.percentage >= 100)
			return 'bg-green-500';
		if (challengeProgress.percentage >= 75)
			return 'bg-blue-500';
		if (challengeProgress.percentage >= 50)
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
						{weeklyChallenge.title ||
							weeklyChallenge.name ||
							'Weekly Challenge'}
					</div>
					<div className='flex items-center gap-2'>
						{challengeProgress.percentage >=
							100 && (
							<Badge
								variant='default'
								className='bg-green-500'
							>
								<Trophy className='h-3 w-3 mr-1' />
								Completed
							</Badge>
						)}
						<Badge variant='outline'>
							{weeklyChallenge.points} pts
						</Badge>
					</div>
				</CardTitle>
				<CardDescription>
					{weeklyChallenge.description}
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-6'>
				{/* Progress Overview */}
				<div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<span className='text-sm font-medium'>
							Progress:{' '}
							{
								challengeProgress.completedDays
							}{' '}
							/ {challengeProgress.totalDays}{' '}
							{formatChallengeType(
								weeklyChallenge.type
							)}
						</span>
						<span className='text-sm text-muted-foreground'>
							{challengeProgress.percentage}%
						</span>
					</div>

					<Progress
						value={challengeProgress.percentage}
						className='h-3'
					/>

					<div className='flex justify-between items-center text-sm text-muted-foreground'>
						<span className='flex items-center gap-1'>
							<Clock className='h-3 w-3' />
							{challengeProgress.totalDays -
								challengeProgress.completedDays}{' '}
							days remaining
						</span>
					</div>
				</div>

				{/* Daily Breakdown */}
				{challengeProgress.weeklyBreakdown &&
					Array.isArray(
						challengeProgress.weeklyBreakdown
					) && (
						<div className='space-y-3'>
							<h4 className='font-medium flex items-center gap-2'>
								<Calendar className='h-4 w-4' />
								Daily Progress
							</h4>

							<div className='grid grid-cols-7 gap-2'>
								{challengeProgress.weeklyBreakdown.map(
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
												{weeklyChallenge.type ===
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
							{challengeProgress.weeklyBreakdown &&
								Array.isArray(
									challengeProgress.weeklyBreakdown
								) &&
								challengeProgress.weeklyBreakdown.some(
									(day) =>
										day &&
										day.isToday &&
										day.activities &&
										Array.isArray(
											day.activities
										) &&
										day.activities
											.length > 0
								) && (
									<div className='mt-4 p-4 bg-muted/50 rounded-lg'>
										<h5 className='font-medium mb-2'>
											Today's
											Activities
										</h5>
										<div className='space-y-1'>
											{challengeProgress.weeklyBreakdown
												.find(
													(day) =>
														day.isToday
												)
												?.activities?.map(
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
																{weeklyChallenge.type ===
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
				{challengeProgress.percentage >= 100 && (
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<Trophy className='h-8 w-8 text-green-500 mx-auto mb-2' />
						<p className='font-medium text-green-700 dark:text-green-300'>
							Challenge Completed!
						</p>
						<p className='text-sm text-green-600 dark:text-green-400'>
							You earned{' '}
							{weeklyChallenge.points} points!
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
