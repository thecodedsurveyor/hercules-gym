'use client';

import React, { useState } from 'react';
import {
	ChevronsRight,
	Play,
	Clock,
	Target,
	TrendingUp,
	Users,
	Star,
} from 'lucide-react';
import Image from 'next/image';

interface Exercise {
	id: string;
	name: string;
	sets: number;
	reps: string;
	rest: string;
	description: string;
	image: string;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
	muscleGroups: string[];
}

interface WorkoutPlan {
	id: string;
	name: string;
	duration: string;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
	description: string;
	exercises: Exercise[];
	benefits: string[];
	equipment: string[];
}

const workoutPlans: WorkoutPlan[] = [
	{
		id: 'beginner',
		name: 'SCREECHING BEGINNER',
		duration: '4-6 weeks',
		difficulty: 'Beginner',
		description:
			'Perfect for those new to high-intensity training. Builds foundational strength and endurance with progressive intensity.',
		exercises: [
			{
				id: '1',
				name: 'Modified Burpees',
				sets: 3,
				reps: '8-10',
				rest: '60 seconds',
				description:
					'Start with a step-back instead of jumping, gradually building to full burpees.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Full Body', 'Cardio'],
			},
			{
				id: '2',
				name: 'Wall Push-ups',
				sets: 3,
				reps: '12-15',
				rest: '45 seconds',
				description:
					'Stand facing a wall, place hands on wall and perform push-ups.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: [
					'Chest',
					'Arms',
					'Shoulders',
				],
			},
			{
				id: '3',
				name: 'Assisted Squats',
				sets: 3,
				reps: '10-12',
				rest: '60 seconds',
				description:
					'Hold onto a stable surface for balance while performing squats.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Legs', 'Glutes'],
			},
			{
				id: '4',
				name: 'Plank Hold',
				sets: 3,
				reps: '20-30 seconds',
				rest: '45 seconds',
				description:
					'Hold plank position on knees or toes, focusing on form.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Core', 'Shoulders'],
			},
		],
		benefits: [
			'Builds foundational strength',
			'Improves cardiovascular endurance',
			'Teaches proper form',
			'Low injury risk',
		],
		equipment: [
			'None required',
			'Optional: yoga mat',
			'Optional: resistance bands',
		],
	},
	{
		id: 'intermediate',
		name: 'SCREECHING INTERMEDIATE',
		duration: '6-8 weeks',
		difficulty: 'Intermediate',
		description:
			'For those ready to push their limits. Combines strength and cardio with challenging movements.',
		exercises: [
			{
				id: '1',
				name: 'Full Burpees',
				sets: 4,
				reps: '12-15',
				rest: '45 seconds',
				description:
					'Complete burpee with push-up and jump, maintaining explosive power.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Full Body', 'Cardio'],
			},
			{
				id: '2',
				name: 'Diamond Push-ups',
				sets: 4,
				reps: '8-12',
				rest: '60 seconds',
				description:
					'Form diamond shape with hands under chest for tricep focus.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: [
					'Chest',
					'Triceps',
					'Shoulders',
				],
			},
			{
				id: '3',
				name: 'Jump Squats',
				sets: 4,
				reps: '15-20',
				rest: '60 seconds',
				description:
					'Explosive squat with jump at the top, landing softly.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Legs', 'Glutes', 'Cardio'],
			},
			{
				id: '4',
				name: 'Mountain Climbers',
				sets: 4,
				reps: '30 seconds',
				rest: '30 seconds',
				description:
					'Alternating knee drives in plank position, maintaining core engagement.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: [
					'Core',
					'Cardio',
					'Shoulders',
				],
			},
			{
				id: '5',
				name: 'Pike Push-ups',
				sets: 3,
				reps: '8-12',
				rest: '60 seconds',
				description:
					'Elevated push-up with hips high, targeting shoulders.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: [
					'Shoulders',
					'Triceps',
					'Core',
				],
			},
		],
		benefits: [
			'Increases strength and power',
			'Improves cardiovascular fitness',
			'Builds muscle endurance',
			'Enhances coordination',
		],
		equipment: [
			'None required',
			'Optional: yoga mat',
			'Optional: resistance bands',
		],
	},
	{
		id: 'advanced',
		name: 'SCREECHING ADVANCED',
		duration: '8-12 weeks',
		difficulty: 'Advanced',
		description:
			'Elite-level training for experienced athletes. Maximum intensity with complex movements.',
		exercises: [
			{
				id: '1',
				name: 'Burpee Pull-ups',
				sets: 5,
				reps: '10-15',
				rest: '60 seconds',
				description:
					'Burpee followed by pull-up, combining cardio and strength.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Full Body', 'Back', 'Arms'],
			},
			{
				id: '2',
				name: 'Handstand Push-ups',
				sets: 4,
				reps: '5-10',
				rest: '90 seconds',
				description:
					'Push-ups in handstand position against wall.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: [
					'Shoulders',
					'Triceps',
					'Core',
				],
			},
			{
				id: '3',
				name: 'Pistol Squats',
				sets: 4,
				reps: '8-12 each leg',
				rest: '90 seconds',
				description:
					'Single-leg squat with other leg extended forward.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Legs', 'Glutes', 'Balance'],
			},
			{
				id: '4',
				name: 'L-Sit Hold',
				sets: 4,
				reps: '20-30 seconds',
				rest: '60 seconds',
				description:
					'Hold L-sit position on parallel bars or rings.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Core', 'Shoulders', 'Arms'],
			},
			{
				id: '5',
				name: 'Muscle-ups',
				sets: 3,
				reps: '3-8',
				rest: '120 seconds',
				description:
					'Pull-up transitioning to dip on rings or bar.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: [
					'Back',
					'Arms',
					'Shoulders',
					'Chest',
				],
			},
			{
				id: '6',
				name: 'Planche Progressions',
				sets: 4,
				reps: '15-30 seconds',
				rest: '90 seconds',
				description:
					'Progressive planche holds building to full planche.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: [
					'Shoulders',
					'Arms',
					'Core',
					'Back',
				],
			},
		],
		benefits: [
			'Elite strength development',
			'Advanced skill acquisition',
			'Maximum power output',
			'Complete body control',
		],
		equipment: [
			'Pull-up bar',
			'Rings (optional)',
			'Parallel bars (optional)',
			'Yoga mat',
		],
	},
];

export default function ScreechingWorkoutPage() {
	const [selectedPlan, setSelectedPlan] =
		useState<string>('intermediate');
	const [selectedExercise, setSelectedExercise] =
		useState<string | null>(null);

	const currentPlan = workoutPlans.find(
		(plan) => plan.id === selectedPlan
	);

	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Section */}
			<section className='py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
				<div className='container mx-auto px-4 md:px-6 text-center'>
					<div className='mb-4'>
						<ChevronsRight className='w-16 h-16 md:w-24 md:h-24 text-brand mx-auto' />
					</div>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6'>
						SCREECHING{' '}
						<span className='text-brand'>
							WORKOUT
						</span>
					</h1>
					<p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8'>
						Push your limits with our
						high-intensity bodyweight training
						program. Build strength, power, and
						endurance through progressive
						calisthenics.
					</p>

					{/* Stats */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								3
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Difficulty Levels
							</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								15+
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Exercises
							</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								12
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Weeks Max
							</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								5.0
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Rating
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Plan Selection */}
			<section className='py-16 bg-black border-b border-gray-800'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12'>
						Choose Your{' '}
						<span className='text-brand'>
							Level
						</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
						{workoutPlans.map((plan) => (
							<div
								key={plan.id}
								onClick={() =>
									setSelectedPlan(plan.id)
								}
								className={`bg-gray-900 border rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
									selectedPlan === plan.id
										? 'border-brand bg-gray-800'
										: 'border-gray-700 hover:border-gray-600'
								}`}
							>
								<div className='text-center'>
									<h3 className='text-xl font-bold text-white mb-2'>
										{plan.name}
									</h3>
									<div className='flex items-center justify-center gap-2 mb-4'>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${
												plan.difficulty ===
												'Beginner'
													? 'bg-green-500/20 text-green-400'
													: plan.difficulty ===
														  'Intermediate'
														? 'bg-yellow-500/20 text-yellow-400'
														: 'bg-red-500/20 text-red-400'
											}`}
										>
											{
												plan.difficulty
											}
										</span>
									</div>
									<p className='text-gray-300 text-sm mb-4'>
										{plan.description}
									</p>
									<div className='flex items-center justify-center text-sm text-gray-400'>
										<Clock className='w-4 h-4 mr-1' />
										{plan.duration}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Selected Plan Details */}
			{currentPlan && (
				<section className='py-16 md:py-24 bg-black'>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='max-w-6xl mx-auto'>
							{/* Plan Overview */}
							<div className='bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-12'>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h3 className='text-2xl font-bold text-white mb-4'>
											{
												currentPlan.name
											}
										</h3>
										<p className='text-gray-300 leading-relaxed mb-6'>
											{
												currentPlan.description
											}
										</p>

										<div className='space-y-4'>
											<div>
												<h4 className='text-white font-semibold mb-2 flex items-center'>
													<Target className='w-4 h-4 mr-2 text-brand' />
													Benefits
												</h4>
												<ul className='space-y-1'>
													{currentPlan.benefits.map(
														(
															benefit,
															idx
														) => (
															<li
																key={
																	idx
																}
																className='text-sm text-gray-300 flex items-center'
															>
																<div className='w-2 h-2 bg-brand rounded-full mr-2'></div>
																{
																	benefit
																}
															</li>
														)
													)}
												</ul>
											</div>

											<div>
												<h4 className='text-white font-semibold mb-2 flex items-center'>
													<TrendingUp className='w-4 h-4 mr-2 text-brand' />
													Equipment
													Needed
												</h4>
												<div className='flex flex-wrap gap-2'>
													{currentPlan.equipment.map(
														(
															item,
															idx
														) => (
															<span
																key={
																	idx
																}
																className='bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm'
															>
																{
																	item
																}
															</span>
														)
													)}
												</div>
											</div>
										</div>
									</div>

									<div className='flex items-center justify-center'>
										<div className='text-center'>
											<div className='text-6xl font-bold text-brand mb-4'>
												{
													currentPlan
														.exercises
														.length
												}
											</div>
											<div className='text-xl text-white mb-2'>
												Exercises
											</div>
											<div className='text-gray-400'>
												in this
												program
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Exercises */}
							<div>
								<h3 className='text-2xl font-bold text-white mb-8'>
									Workout Exercises
								</h3>
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									{currentPlan.exercises.map(
										(exercise) => (
											<div
												key={
													exercise.id
												}
												className='bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300'
											>
												<div className='relative h-48'>
													<Image
														src={
															exercise.image
														}
														alt={
															exercise.name
														}
														width={
															400
														}
														height={
															192
														}
														className='w-full h-full object-cover'
													/>
													<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>

													<button
														onClick={() =>
															setSelectedExercise(
																selectedExercise ===
																	exercise.id
																	? null
																	: exercise.id
															)
														}
														className='absolute top-4 right-4 w-10 h-10 bg-brand hover:bg-brand/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-brand/25'
													>
														<Play className='w-5 h-5 text-black' />
													</button>
												</div>

												<div className='p-6'>
													<div className='flex items-center justify-between mb-3'>
														<h4 className='text-lg font-bold text-white'>
															{
																exercise.name
															}
														</h4>
														<span
															className={`px-2 py-1 rounded-full text-xs font-medium ${
																exercise.difficulty ===
																'Beginner'
																	? 'bg-green-500/20 text-green-400'
																	: exercise.difficulty ===
																		  'Intermediate'
																		? 'bg-yellow-500/20 text-yellow-400'
																		: 'bg-red-500/20 text-red-400'
															}`}
														>
															{
																exercise.difficulty
															}
														</span>
													</div>

													<div className='grid grid-cols-3 gap-4 mb-4'>
														<div className='text-center'>
															<div className='text-lg font-bold text-brand'>
																{
																	exercise.sets
																}
															</div>
															<div className='text-xs text-gray-400'>
																Sets
															</div>
														</div>
														<div className='text-center'>
															<div className='text-lg font-bold text-brand'>
																{
																	exercise.reps
																}
															</div>
															<div className='text-xs text-gray-400'>
																Reps
															</div>
														</div>
														<div className='text-center'>
															<div className='text-lg font-bold text-brand'>
																{
																	exercise.rest
																}
															</div>
															<div className='text-xs text-gray-400'>
																Rest
															</div>
														</div>
													</div>

													<p className='text-gray-300 text-sm mb-4'>
														{
															exercise.description
														}
													</p>

													<div className='flex flex-wrap gap-2'>
														{exercise.muscleGroups.map(
															(
																muscle,
																idx
															) => (
																<span
																	key={
																		idx
																	}
																	className='bg-brand/20 text-brand px-2 py-1 rounded-full text-xs font-medium'
																>
																	{
																		muscle
																	}
																</span>
															)
														)}
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className='py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
				<div className='container mx-auto px-4 md:px-6 text-center'>
					<div className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
							Ready to Start Your Screeching
							Journey?
						</h2>
						<p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
							Join our community of
							calisthenics enthusiasts and
							transform your body with
							bodyweight training.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								className='w-full sm:w-auto bg-brand hover:bg-brand/80 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Start Training
							</button>
							<button
								className='w-full sm:w-auto bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-lg md:text-xl transition-all duration-200 hover:bg-gray-800/50'
								onClick={() =>
									(window.location.href =
										'/coaches')
								}
							>
								Get a Coach
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
