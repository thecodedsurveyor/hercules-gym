import { motion } from 'framer-motion';
import {
	Activity,
	Calendar,
	Clock,
	Zap,
} from 'lucide-react';

interface ActivityLevelStepProps {
	data: any;
	updateData: (data: any) => void;
}

const fitnessLevels = [
	{
		id: 'beginner',
		title: 'Beginner',
		subtitle: 'New to fitness',
		description:
			'Rarely or never worked out, or returning after a long break',
		characteristics: [
			'Limited exercise experience',
			'Building basic fitness habits',
			'Learning proper form',
		],
		icon: '🌱',
		color: 'from-green-500/20 to-emerald-500/20',
		borderColor: 'border-green-500/30',
	},
	{
		id: 'intermediate',
		title: 'Intermediate',
		subtitle: 'Some experience',
		description:
			'Work out occasionally and somewhat familiar with exercises',
		characteristics: [
			'2-6 months of experience',
			'Comfortable with basic movements',
			'Ready for progression',
		],
		icon: '⚡',
		color: 'from-brand/20 to-yellow-500/20',
		borderColor: 'border-brand/30',
	},
	{
		id: 'advanced',
		title: 'Advanced',
		subtitle: 'Experienced athlete',
		description:
			'Regularly active and comfortable with challenging workouts',
		characteristics: [
			'6+ months of experience',
			'Strong foundation',
			'Seeking optimization',
		],
		icon: '🚀',
		color: 'from-purple-500/20 to-blue-500/20',
		borderColor: 'border-purple-500/30',
	},
];

const workoutFrequencies = [
	{
		days: 1,
		label: '1 day',
		description: 'Light activity to get started',
	},
	{
		days: 2,
		label: '2 days',
		description: 'Building a foundation',
	},
	{
		days: 3,
		label: '3 days',
		description: 'Balanced routine',
	},
	{
		days: 4,
		label: '4 days',
		description: 'Committed to fitness',
	},
	{
		days: 5,
		label: '5 days',
		description: 'High dedication',
	},
	{
		days: 6,
		label: '6 days',
		description: 'Athletic lifestyle',
	},
	{
		days: 7,
		label: '7 days',
		description: 'Maximum commitment',
	},
];

export default function ActivityLevelStep({
	data,
	updateData,
}: ActivityLevelStepProps) {
	const handleLevelSelect = (levelId: string) => {
		updateData({ fitnessLevel: levelId });
	};

	const handleFrequencySelect = (frequency: number) => {
		updateData({ workoutFrequency: frequency });
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
						<Activity className='w-8 h-8 text-brand' />
					</div>
				</div>
				<p className='text-gray-300 max-w-lg mx-auto'>
					Help us understand your current fitness
					level and how often you&apos;d like to
					work out. This ensures we create a plan
					that&apos;s challenging but achievable.
				</p>
			</motion.div>

			{/* Fitness Level Selection */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='space-y-4'
			>
				<h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
					<Zap className='w-5 h-5 text-brand' />
					What&apos;s your current fitness level?
				</h3>

				<div className='grid gap-4'>
					{fitnessLevels.map((level, index) => {
						const isSelected =
							data.fitnessLevel === level.id;

						return (
							<motion.div
								key={level.id}
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
									handleLevelSelect(
										level.id
									)
								}
								className={`
                  relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                  ${
						isSelected
							? `bg-gradient-to-r ${level.color} ${level.borderColor} border-opacity-100`
							: 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
					}
                `}
							>
								<div className='flex items-start space-x-4'>
									<div className='text-3xl'>
										{level.icon}
									</div>
									<div className='flex-1'>
										<div className='flex items-center justify-between mb-2'>
											<h4
												className={`text-xl font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}
											>
												{
													level.title
												}
											</h4>
											{isSelected && (
												<div className='text-brand text-xl'>
													✓
												</div>
											)}
										</div>
										<p
											className={`text-sm font-medium mb-2 ${isSelected ? 'text-brand' : 'text-gray-400'}`}
										>
											{level.subtitle}
										</p>
										<p
											className={`text-sm mb-3 ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}
										>
											{
												level.description
											}
										</p>
										<div className='flex flex-wrap gap-2'>
											{level.characteristics.map(
												(
													char,
													idx
												) => (
													<span
														key={
															idx
														}
														className={`
                            text-xs px-2 py-1 rounded-full
                            ${
								isSelected
									? 'bg-white/10 text-white'
									: 'bg-gray-700/50 text-gray-400'
							}
                          `}
													>
														{
															char
														}
													</span>
												)
											)}
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Workout Frequency Selection */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className='space-y-4'
			>
				<h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
					<Calendar className='w-5 h-5 text-brand' />
					How often would you like to work out per
					week?
				</h3>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{workoutFrequencies.map(
						(freq, index) => {
							const isSelected =
								data.workoutFrequency ===
								freq.days;

							return (
								<motion.div
									key={freq.days}
									initial={{
										opacity: 0,
										scale: 0.9,
									}}
									animate={{
										opacity: 1,
										scale: 1,
									}}
									transition={{
										delay: 0.05 * index,
									}}
									onClick={() =>
										handleFrequencySelect(
											freq.days
										)
									}
									className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center
                  ${
						isSelected
							? 'bg-brand/10 border-brand text-white'
							: 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
					}
                `}
								>
									<div
										className={`text-2xl font-bold mb-1 ${isSelected ? 'text-brand' : 'text-gray-400'}`}
									>
										{freq.days}
									</div>
									<div
										className={`text-sm font-medium mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}
									>
										{freq.label}
									</div>
									<div
										className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}
									>
										{freq.description}
									</div>
								</motion.div>
							);
						}
					)}
				</div>
			</motion.div>

			{/* Recommendations */}
			{data.fitnessLevel && data.workoutFrequency && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='bg-brand/10 border border-brand/20 rounded-xl p-6'
				>
					<div className='flex items-start space-x-3'>
						<Clock className='w-6 h-6 text-brand flex-shrink-0 mt-1' />
						<div>
							<h4 className='text-white font-semibold mb-2'>
								Recommended Schedule
							</h4>
							<p className='text-sm text-gray-300 mb-3'>
								Based on your{' '}
								{data.fitnessLevel} level
								and {data.workoutFrequency}{' '}
								day per week preference:
							</p>
							<div className='space-y-2 text-sm text-gray-400'>
								{data.fitnessLevel ===
									'beginner' && (
									<>
										<div>
											• Focus on
											full-body
											workouts with
											basic movements
										</div>
										<div>
											• 30-45 minute
											sessions with
											proper rest
											between
											exercises
										</div>
										<div>
											• Emphasis on
											learning proper
											form and
											building habits
										</div>
									</>
								)}
								{data.fitnessLevel ===
									'intermediate' && (
									<>
										<div>
											• Mix of
											full-body and
											split routines
											depending on
											frequency
										</div>
										<div>
											• 45-60 minute
											sessions with
											moderate to high
											intensity
										</div>
										<div>
											• Progressive
											overload and
											skill
											development
										</div>
									</>
								)}
								{data.fitnessLevel ===
									'advanced' && (
									<>
										<div>
											• Advanced split
											routines and
											specialized
											training
										</div>
										<div>
											• 60-90 minute
											sessions with
											high intensity
										</div>
										<div>
											• Focus on
											optimization and
											specific
											adaptations
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
