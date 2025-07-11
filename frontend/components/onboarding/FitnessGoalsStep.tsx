import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	Target,
	TrendingDown,
	Zap,
	Heart,
	Minimize,
	ChevronUp,
	ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FitnessGoalsStepProps {
	data: any;
	updateData: (data: any) => void;
}

const fitnessGoals = [
	{
		id: 'lose-weight',
		title: 'Lose Weight (Fat Loss)',
		description:
			'Reduce body fat percentage and achieve a leaner physique',
		icon: <TrendingDown className='w-6 h-6' />,
		color: 'from-red-500/20 to-orange-500/20',
		borderColor: 'border-red-500/30',
	},
	{
		id: 'build-muscle',
		title: 'Build Muscle (Muscle Gain)',
		description:
			'Increase muscle mass and develop strength',
		icon: <Zap className='w-6 h-6' />,
		color: 'from-blue-500/20 to-purple-500/20',
		borderColor: 'border-blue-500/30',
	},
	{
		id: 'improve-endurance',
		title: 'Improve Endurance',
		description:
			'Enhance cardiovascular fitness and stamina',
		icon: <Heart className='w-6 h-6' />,
		color: 'from-green-500/20 to-emerald-500/20',
		borderColor: 'border-green-500/30',
	},
	{
		id: 'general-health',
		title: 'General Health & Well-being',
		description:
			'Overall fitness improvement and healthy lifestyle',
		icon: <Target className='w-6 h-6' />,
		color: 'from-brand/20 to-yellow-500/20',
		borderColor: 'border-brand/30',
	},
	{
		id: 'flexibility-mobility',
		title: 'Flexibility & Mobility',
		description:
			'Improve range of motion and reduce stiffness',
		icon: <Minimize className='w-6 h-6' />,
		color: 'from-pink-500/20 to-rose-500/20',
		borderColor: 'border-pink-500/30',
	},
];

export default function FitnessGoalsStep({
	data,
	updateData,
}: FitnessGoalsStepProps) {
	const selectedGoals = data.fitnessGoals || [];
	const goalPriority = data.goalPriority || [];

	const toggleGoal = (goalId: string) => {
		let newSelectedGoals;
		let newPriority;

		if (selectedGoals.includes(goalId)) {
			// Remove goal
			newSelectedGoals = selectedGoals.filter(
				(id: string) => id !== goalId
			);
			newPriority = goalPriority.filter(
				(id: string) => id !== goalId
			);
		} else {
			// Add goal
			newSelectedGoals = [...selectedGoals, goalId];
			newPriority = [...goalPriority, goalId];
		}

		updateData({
			fitnessGoals: newSelectedGoals,
			goalPriority: newPriority,
			primaryGoal: newPriority[0] || '',
		});
	};

	const moveGoalUp = (goalId: string) => {
		const currentIndex = goalPriority.indexOf(goalId);
		if (currentIndex > 0) {
			const newPriority = [...goalPriority];
			[
				newPriority[currentIndex - 1],
				newPriority[currentIndex],
			] = [
				newPriority[currentIndex],
				newPriority[currentIndex - 1],
			];

			updateData({
				goalPriority: newPriority,
				primaryGoal: newPriority[0],
			});
		}
	};

	const moveGoalDown = (goalId: string) => {
		const currentIndex = goalPriority.indexOf(goalId);
		if (currentIndex < goalPriority.length - 1) {
			const newPriority = [...goalPriority];
			[
				newPriority[currentIndex],
				newPriority[currentIndex + 1],
			] = [
				newPriority[currentIndex + 1],
				newPriority[currentIndex],
			];

			updateData({
				goalPriority: newPriority,
				primaryGoal: newPriority[0],
			});
		}
	};

	return (
		<div className='space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-center space-y-2'
			>
				<div className='flex justify-center mb-4'>
					<div className='bg-brand/10 p-3 rounded-full'>
						<Target className='w-8 h-8 text-brand' />
					</div>
				</div>
				<p className='text-gray-300 max-w-lg mx-auto'>
					What are your main fitness goals? You
					can select multiple goals and we&apos;ll
					help you prioritize them to create the
					most effective plan.
				</p>
			</motion.div>

			{/* Goal Selection */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='space-y-4'
			>
				<h3 className='text-lg font-semibold text-white mb-4'>
					Select Your Goals
				</h3>

				<div className='grid gap-4'>
					{fitnessGoals.map((goal, index) => {
						const isSelected =
							selectedGoals.includes(goal.id);

						return (
							<motion.div
								key={goal.id}
								initial={{
									opacity: 0,
									x: -20,
								}}
								animate={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									delay: 0.1 * index,
								}}
								onClick={() =>
									toggleGoal(goal.id)
								}
								className={`
                  relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                  ${
						isSelected
							? `bg-gradient-to-r ${goal.color} ${goal.borderColor} border-opacity-100`
							: 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
					}
                `}
							>
								<div className='flex items-start space-x-4'>
									<div
										className={`p-3 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-gray-700/50'}`}
									>
										<div
											className={
												isSelected
													? 'text-white'
													: 'text-gray-400'
											}
										>
											{goal.icon}
										</div>
									</div>
									<div className='flex-1'>
										<h4
											className={`font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}
										>
											{goal.title}
										</h4>
										<p
											className={`text-sm ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}
										>
											{
												goal.description
											}
										</p>
									</div>
									{isSelected && (
										<div className='text-white'>
											✓
										</div>
									)}
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Priority Ranking */}
			{selectedGoals.length > 1 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className='space-y-4'
				>
					<h3 className='text-lg font-semibold text-white mb-4'>
						Rank Your Goals by Priority
					</h3>
					<p className='text-sm text-gray-400 mb-4'>
						Drag to reorder or use the arrow
						buttons. Your top priority will
						guide your primary workout plan.
					</p>

					<div className='space-y-3'>
						{goalPriority.map(
							(
								goalId: string,
								index: number
							) => {
								const goal =
									fitnessGoals.find(
										(g) =>
											g.id === goalId
									);
								if (!goal) return null;

								return (
									<motion.div
										key={goalId}
										initial={{
											opacity: 0,
											x: -20,
										}}
										animate={{
											opacity: 1,
											x: 0,
										}}
										transition={{
											delay:
												0.1 * index,
										}}
										className='flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700'
									>
										<div
											className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${index === 0 ? 'bg-brand text-black' : 'bg-gray-700 text-gray-300'}
                  `}
										>
											{index + 1}
										</div>

										<div className='flex-1'>
											<span className='text-white font-medium'>
												{goal.title}
											</span>
											{index ===
												0 && (
												<span className='ml-2 text-xs bg-brand/20 text-brand px-2 py-1 rounded'>
													Primary
													Goal
												</span>
											)}
										</div>

										<div className='flex flex-col space-y-1'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() =>
													moveGoalUp(
														goalId
													)
												}
												disabled={
													index ===
													0
												}
												className='h-6 w-6 p-0 hover:bg-gray-700'
											>
												<ChevronUp className='w-3 h-3' />
											</Button>
											<Button
												variant='ghost'
												size='sm'
												onClick={() =>
													moveGoalDown(
														goalId
													)
												}
												disabled={
													index ===
													goalPriority.length -
														1
												}
												className='h-6 w-6 p-0 hover:bg-gray-700'
											>
												<ChevronDown className='w-3 h-3' />
											</Button>
										</div>
									</motion.div>
								);
							}
						)}
					</div>
				</motion.div>
			)}

			{/* Summary */}
			{selectedGoals.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='bg-brand/10 border border-brand/20 rounded-xl p-4'
				>
					<h4 className='text-white font-semibold mb-2'>
						Your Fitness Focus
					</h4>
					<p className='text-sm text-gray-300'>
						Primary Goal:{' '}
						<span className='text-brand font-medium'>
							{fitnessGoals.find(
								(g) =>
									g.id ===
									data.primaryGoal
							)?.title || 'Not selected'}
						</span>
					</p>
					<p className='text-xs text-gray-400 mt-2'>
						We&apos;ll design your workout plan
						around your primary goal while
						incorporating elements to help you
						achieve your other selected goals.
					</p>
				</motion.div>
			)}
		</div>
	);
}
