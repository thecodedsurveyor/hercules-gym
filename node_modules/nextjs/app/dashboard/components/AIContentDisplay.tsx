'use client';

import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Utensils,
	Dumbbell,
	Clock,
	Target,
	Flame,
	Quote,
	Sparkles,
	Play,
	ChefHat,
} from 'lucide-react';
import { useAIContent } from '../../../hooks/use-dashboard-data';

interface AIContentDisplayProps {
	userId: string;
}

const AIContentDisplay: React.FC<AIContentDisplayProps> = ({
	userId,
}) => {
	const {
		data: aiContent,
		isLoading,
		error,
	} = useAIContent(userId);

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<Card className='border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20'>
					<CardHeader>
						<Skeleton className='h-6 w-48' />
					</CardHeader>
					<CardContent className='space-y-4'>
						<Skeleton className='h-24 w-full' />
						<Skeleton className='h-24 w-full' />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<Card className='border-red-500/20 bg-gradient-to-br from-red-900/20 to-orange-900/20'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-red-400'>
						<Sparkles className='h-5 w-5' />
						AI Content Unavailable
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-red-300'>
						Unable to load AI-generated content.
						Using fallback recommendations.
					</p>
				</CardContent>
			</Card>
		);
	}

	if (!aiContent) {
		return null;
	}

	return (
		<div className='space-y-6'>
			{/* AI-Generated Motivational Quote */}
			<Card className='border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-purple-300'>
						<Quote className='h-5 w-5' />
						AI Daily Motivation
					</CardTitle>
				</CardHeader>
				<CardContent>
					<blockquote className='text-lg font-medium italic text-white leading-relaxed'>
						&ldquo;{aiContent.motivationalQuote}
						&rdquo;
					</blockquote>
					<p className='text-purple-300 mt-2 text-sm'>
						— AI Fitness Coach
					</p>
				</CardContent>
			</Card>

			{/* AI-Generated Workouts */}
			<Card className='border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-green-300'>
						<Dumbbell className='h-5 w-5' />
						AI-Personalized Workouts
						<Badge
							variant='secondary'
							className='bg-green-500/20 text-green-300'
						>
							{aiContent.workouts?.length ||
								0}{' '}
							workouts
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					{aiContent.workouts?.map(
						(workout, index) => (
							<div
								key={workout.id || index}
								className='p-4 rounded-lg bg-black/30 border border-green-500/20'
							>
								<div className='flex items-start justify-between mb-3'>
									<div>
										<h4 className='font-semibold text-white text-lg'>
											{workout.name}
										</h4>
										<p className='text-green-300 text-sm'>
											{
												workout.description
											}
										</p>
									</div>
									<Button
										size='sm'
										className='bg-green-600 hover:bg-green-700'
									>
										<Play className='h-4 w-4 mr-1' />
										Start
									</Button>
								</div>

								<div className='flex flex-wrap gap-2 mb-3'>
									<Badge
										variant='outline'
										className='border-green-500/30 text-green-300'
									>
										<Clock className='h-3 w-3 mr-1' />
										{workout.duration}
										min
									</Badge>
									<Badge
										variant='outline'
										className='border-green-500/30 text-green-300'
									>
										<Target className='h-3 w-3 mr-1' />
										{workout.difficulty}
									</Badge>
									<Badge
										variant='outline'
										className='border-green-500/30 text-green-300'
									>
										{workout.type}
									</Badge>
								</div>

								{workout.exercises &&
									workout.exercises
										.length > 0 && (
										<div>
											<p className='text-gray-300 text-sm mb-2'>
												Key
												Exercises:
											</p>
											<div className='flex flex-wrap gap-1'>
												{workout.exercises
													.slice(
														0,
														4
													)
													.map(
														(
															exercise,
															idx
														) => (
															<Badge
																key={
																	idx
																}
																variant='secondary'
																className='bg-green-500/10 text-green-200 text-xs'
															>
																{
																	exercise
																}
															</Badge>
														)
													)}
												{workout
													.exercises
													.length >
													4 && (
													<Badge
														variant='secondary'
														className='bg-green-500/10 text-green-200 text-xs'
													>
														+
														{workout
															.exercises
															.length -
															4}{' '}
														more
													</Badge>
												)}
											</div>
										</div>
									)}

								{workout.targetMuscles &&
									workout.targetMuscles
										.length > 0 && (
										<div className='mt-2'>
											<p className='text-gray-300 text-sm mb-1'>
												Target
												Muscles:
											</p>
											<div className='flex flex-wrap gap-1'>
												{workout.targetMuscles.map(
													(
														muscle,
														idx
													) => (
														<Badge
															key={
																idx
															}
															variant='outline'
															className='border-green-500/20 text-green-300 text-xs'
														>
															{
																muscle
															}
														</Badge>
													)
												)}
											</div>
										</div>
									)}
							</div>
						)
					)}
				</CardContent>
			</Card>

			{/* AI-Generated Nutrition */}
			<Card className='border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-yellow-900/20'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-orange-300'>
						<ChefHat className='h-5 w-5' />
						AI-Personalized Nutrition
						<Badge
							variant='secondary'
							className='bg-orange-500/20 text-orange-300'
						>
							{aiContent.meals?.length || 0}{' '}
							meals
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					{aiContent.meals?.map((meal, index) => (
						<div
							key={meal.id || index}
							className='p-4 rounded-lg bg-black/30 border border-orange-500/20'
						>
							<div className='flex items-start justify-between mb-3'>
								<div>
									<h4 className='font-semibold text-white text-lg'>
										{meal.name}
									</h4>
									<p className='text-orange-300 text-sm capitalize'>
										{meal.type} •{' '}
										{meal.description}
									</p>
								</div>
								<Button
									size='sm'
									variant='outline'
									className='border-orange-500/30 text-orange-300 hover:bg-orange-500/10'
								>
									<Utensils className='h-4 w-4 mr-1' />
									Log
								</Button>
							</div>

							<div className='flex flex-wrap gap-2 mb-3'>
								<Badge
									variant='outline'
									className='border-orange-500/30 text-orange-300'
								>
									<Flame className='h-3 w-3 mr-1' />
									{meal.calories} cal
								</Badge>
								<Badge
									variant='outline'
									className='border-orange-500/30 text-orange-300'
								>
									{meal.protein}g protein
								</Badge>
								{meal.macros && (
									<>
										<Badge
											variant='outline'
											className='border-orange-500/30 text-orange-300'
										>
											{
												meal.macros
													.carbs
											}
											g carbs
										</Badge>
										<Badge
											variant='outline'
											className='border-orange-500/30 text-orange-300'
										>
											{
												meal.macros
													.fats
											}
											g fats
										</Badge>
									</>
								)}
							</div>

							{meal.ingredients &&
								meal.ingredients.length >
									0 && (
									<div>
										<p className='text-gray-300 text-sm mb-2'>
											Ingredients:
										</p>
										<div className='flex flex-wrap gap-1'>
											{meal.ingredients
												.slice(0, 5)
												.map(
													(
														ingredient,
														idx
													) => (
														<Badge
															key={
																idx
															}
															variant='secondary'
															className='bg-orange-500/10 text-orange-200 text-xs'
														>
															{
																ingredient
															}
														</Badge>
													)
												)}
											{meal
												.ingredients
												.length >
												5 && (
												<Badge
													variant='secondary'
													className='bg-orange-500/10 text-orange-200 text-xs'
												>
													+
													{meal
														.ingredients
														.length -
														5}{' '}
													more
												</Badge>
											)}
										</div>
									</div>
								)}
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default AIContentDisplay;
