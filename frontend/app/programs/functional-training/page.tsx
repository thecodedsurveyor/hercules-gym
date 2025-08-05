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
	Zap,
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
	movementPattern: string;
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
	focus: string[];
}

const workoutPlans: WorkoutPlan[] = [
	{
		id: 'foundation',
		name: 'FUNCTIONAL FOUNDATION',
		duration: '6-8 weeks',
		difficulty: 'Beginner',
		description:
			'Build fundamental movement patterns and improve mobility. Perfect for beginners or those returning to fitness.',
		exercises: [
			{
				id: '1',
				name: 'Bodyweight Squats',
				sets: 3,
				reps: '12-15',
				rest: '60 seconds',
				description:
					'Master the basic squat pattern with proper form and depth.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Legs', 'Glutes', 'Core'],
				movementPattern: 'Squat',
			},
			{
				id: '2',
				name: 'Hip Hinges',
				sets: 3,
				reps: '10-12',
				rest: '60 seconds',
				description:
					'Learn proper hip hinge movement for deadlift patterns.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Posterior Chain', 'Core'],
				movementPattern: 'Hinge',
			},
			{
				id: '3',
				name: 'Wall Push-ups',
				sets: 3,
				reps: '12-15',
				rest: '45 seconds',
				description:
					'Develop upper body pushing strength with proper form.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: [
					'Chest',
					'Arms',
					'Shoulders',
				],
				movementPattern: 'Push',
			},
			{
				id: '4',
				name: 'Bird Dogs',
				sets: 3,
				reps: '8-10 each side',
				rest: '45 seconds',
				description:
					'Improve core stability and coordination.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Core', 'Back'],
				movementPattern: 'Anti-rotation',
			},
			{
				id: '5',
				name: 'Cat-Cow Stretches',
				sets: 2,
				reps: '10-12',
				rest: '30 seconds',
				description:
					'Improve spinal mobility and flexibility.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Beginner',
				muscleGroups: ['Spine', 'Core'],
				movementPattern: 'Mobility',
			},
		],
		benefits: [
			'Improves movement quality',
			'Builds foundational strength',
			'Enhances mobility',
			'Reduces injury risk',
		],
		equipment: [
			'None required',
			'Optional: yoga mat',
			'Optional: resistance bands',
		],
		focus: [
			'Movement Patterns',
			'Mobility',
			'Stability',
			'Coordination',
		],
	},
	{
		id: 'performance',
		name: 'FUNCTIONAL PERFORMANCE',
		duration: '8-10 weeks',
		difficulty: 'Intermediate',
		description:
			'Enhance functional strength and movement efficiency for daily activities and sports performance.',
		exercises: [
			{
				id: '1',
				name: 'Goblet Squats',
				sets: 4,
				reps: '10-12',
				rest: '90 seconds',
				description:
					'Weighted squat variation that improves form and builds strength.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Legs', 'Glutes', 'Core'],
				movementPattern: 'Squat',
			},
			{
				id: '2',
				name: 'Romanian Deadlifts',
				sets: 4,
				reps: '8-12',
				rest: '90 seconds',
				description:
					'Hip hinge movement that strengthens posterior chain.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: [
					'Hamstrings',
					'Glutes',
					'Lower Back',
				],
				movementPattern: 'Hinge',
			},
			{
				id: '3',
				name: 'Push-up Variations',
				sets: 4,
				reps: '8-15',
				rest: '60 seconds',
				description:
					'Progressive push-up variations to build upper body strength.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: [
					'Chest',
					'Arms',
					'Shoulders',
				],
				movementPattern: 'Push',
			},
			{
				id: '4',
				name: 'Single-Leg Deadlifts',
				sets: 3,
				reps: '8-10 each leg',
				rest: '90 seconds',
				description:
					'Unilateral movement that improves balance and stability.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Legs', 'Glutes', 'Core'],
				movementPattern: 'Unilateral',
			},
			{
				id: '5',
				name: 'Plank Variations',
				sets: 4,
				reps: '30-60 seconds',
				rest: '60 seconds',
				description:
					'Advanced core stability exercises.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Core', 'Shoulders'],
				movementPattern: 'Anti-extension',
			},
			{
				id: '6',
				name: 'Turkish Get-ups',
				sets: 3,
				reps: '3-5 each side',
				rest: '120 seconds',
				description:
					'Complex movement that improves coordination and strength.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Intermediate',
				muscleGroups: ['Full Body', 'Core'],
				movementPattern: 'Complex',
			},
		],
		benefits: [
			'Improves functional strength',
			'Enhances movement efficiency',
			'Builds stability',
			'Increases power',
		],
		equipment: [
			'Dumbbells',
			'Kettlebells',
			'Resistance bands',
			'Yoga mat',
		],
		focus: [
			'Strength',
			'Stability',
			'Power',
			'Coordination',
		],
	},
	{
		id: 'elite',
		name: 'FUNCTIONAL ELITE',
		duration: '10-12 weeks',
		difficulty: 'Advanced',
		description:
			'Elite-level functional training for athletes and advanced fitness enthusiasts. Complex movements and high intensity.',
		exercises: [
			{
				id: '1',
				name: 'Overhead Squats',
				sets: 5,
				reps: '5-8',
				rest: '120 seconds',
				description:
					'Advanced squat variation that requires mobility and stability.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Full Body', 'Shoulders'],
				movementPattern: 'Complex Squat',
			},
			{
				id: '2',
				name: 'Snatch Progressions',
				sets: 4,
				reps: '3-5',
				rest: '180 seconds',
				description:
					'Olympic lift progression for power development.',
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Full Body', 'Power'],
				movementPattern: 'Olympic',
			},
			{
				id: '3',
				name: 'Handstand Push-ups',
				sets: 4,
				reps: '5-10',
				rest: '120 seconds',
				description:
					'Advanced pushing movement requiring strength and balance.',
				image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Shoulders', 'Arms', 'Core'],
				movementPattern: 'Advanced Push',
			},
			{
				id: '4',
				name: 'Pistol Squats',
				sets: 4,
				reps: '6-10 each leg',
				rest: '120 seconds',
				description:
					'Single-leg squat requiring strength and mobility.',
				image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Legs', 'Glutes', 'Balance'],
				movementPattern: 'Unilateral Squat',
			},
			{
				id: '5',
				name: 'Muscle-ups',
				sets: 3,
				reps: '3-8',
				rest: '180 seconds',
				description:
					'Advanced pull-up to dip transition.',
				image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Back', 'Arms', 'Shoulders'],
				movementPattern: 'Complex Pull',
			},
			{
				id: '6',
				name: 'L-Sit to Handstand',
				sets: 3,
				reps: '3-5 attempts',
				rest: '180 seconds',
				description:
					'Advanced gymnastics movement requiring full body control.',
				image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				difficulty: 'Advanced',
				muscleGroups: ['Full Body', 'Core'],
				movementPattern: 'Gymnastics',
			},
		],
		benefits: [
			'Elite strength development',
			'Advanced skill acquisition',
			'Maximum power output',
			'Complete body control',
		],
		equipment: [
			'Barbell',
			'Weight plates',
			'Pull-up bar',
			'Rings',
			'Kettlebells',
		],
		focus: [
			'Power',
			'Skill',
			'Complexity',
			'Performance',
		],
	},
];

export default function FunctionalTrainingPage() {
	const [selectedPlan, setSelectedPlan] =
		useState<string>('performance');
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
						FUNCTIONAL{' '}
						<span className='text-brand'>
							TRAINING
						</span>
					</h1>
					<p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8'>
						Train movements, not muscles. Our
						functional training programs improve
						your ability to perform real-world
						activities with strength, mobility,
						and efficiency.
					</p>

					{/* Stats */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								3
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Training Levels
							</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-brand mb-2'>
								17+
							</div>
							<div className='text-sm md:text-base text-gray-300'>
								Movement Patterns
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
													<Zap className='w-4 h-4 mr-2 text-brand' />
													Focus
													Areas
												</h4>
												<div className='flex flex-wrap gap-2'>
													{currentPlan.focus.map(
														(
															focus,
															idx
														) => (
															<span
																key={
																	idx
																}
																className='bg-brand/20 text-brand px-3 py-1 rounded-full text-sm'
															>
																{
																	focus
																}
															</span>
														)
													)}
												</div>
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
									Functional Movements
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

													<div className='space-y-2'>
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
														<div className='flex flex-wrap gap-2'>
															<span className='bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium'>
																{
																	exercise.movementPattern
																}
															</span>
														</div>
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
							Ready to Train Functionally?
						</h2>
						<p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
							Improve your movement quality,
							build functional strength, and
							enhance your daily performance.
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
