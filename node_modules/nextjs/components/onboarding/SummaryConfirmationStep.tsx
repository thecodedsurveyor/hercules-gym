import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	Check,
	Edit2,
	User,
	Target,
	Activity,
	Ruler,
	Utensils,
	Calendar,
	Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SummaryConfirmationStepProps {
	data: any;
	onEdit: (step: number) => void;
	onConfirm: () => void;
	isLoading?: boolean;
}

const dietaryOptions = [
	{ id: 'none', title: 'No Restrictions' },
	{ id: 'vegetarian', title: 'Vegetarian' },
	{ id: 'vegan', title: 'Vegan' },
	{ id: 'pescatarian', title: 'Pescatarian' },
	{ id: 'keto', title: 'Ketogenic (Keto)' },
	{ id: 'paleo', title: 'Paleo' },
	{ id: 'gluten-free', title: 'Gluten-Free' },
	{
		id: 'lactose-intolerant',
		title: 'Lactose Intolerant',
	},
];

export default function SummaryConfirmationStep({
	data,
	onEdit,
	onConfirm,
	isLoading = false,
}: SummaryConfirmationStepProps) {
	const [agreed, setAgreed] = useState(false);

	const calculateBMI = () => {
		if (data.height && data.weight) {
			const heightInMeters = data.height / 100;
			const bmi =
				data.weight /
				(heightInMeters * heightInMeters);
			return bmi.toFixed(1);
		}
		return null;
	};

	const getBMICategory = (bmi: number) => {
		if (bmi < 18.5)
			return {
				category: 'Underweight',
				color: 'text-blue-400',
			};
		if (bmi < 25)
			return {
				category: 'Normal',
				color: 'text-green-400',
			};
		if (bmi < 30)
			return {
				category: 'Overweight',
				color: 'text-yellow-400',
			};
		return { category: 'Obese', color: 'text-red-400' };
	};

	const getActivityLevelText = (level: string) => {
		const levels = {
			sedentary: 'Sedentary (Little to no exercise)',
			light: 'Lightly Active (1-3 days per week)',
			moderate:
				'Moderately Active (3-5 days per week)',
			very: 'Very Active (6-7 days per week)',
			extra: 'Extremely Active (2x per day, intense workouts)',
		};
		return (
			levels[level as keyof typeof levels] || level
		);
	};

	const getFitnessLevelText = (level: string) => {
		const levels = {
			beginner: 'Beginner (New to fitness)',
			intermediate: 'Intermediate (Some experience)',
			advanced: 'Advanced (Experienced)',
			expert: 'Expert (Professional level)',
		};
		return (
			levels[level as keyof typeof levels] || level
		);
	};

	const bmi = calculateBMI();
	const bmiInfo = bmi
		? getBMICategory(parseFloat(bmi))
		: null;

	const summaryCards = [
		{
			title: 'Basic Information',
			icon: <User className='w-5 h-5' />,
			step: 2,
			content: (
				<div className='space-y-2'>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Age:
						</span>
						<span className='text-white'>
							{data.age} years old
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Gender:
						</span>
						<span className='text-white capitalize'>
							{data.gender}
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Height:
						</span>
						<span className='text-white'>
							{data.height} cm
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Weight:
						</span>
						<span className='text-white'>
							{data.weight} kg
						</span>
					</div>
					{bmi && (
						<div className='flex justify-between pt-2 border-t border-gray-700'>
							<span className='text-gray-400'>
								BMI:
							</span>
							<span
								className={`font-medium ${bmiInfo?.color}`}
							>
								{bmi} ({bmiInfo?.category})
							</span>
						</div>
					)}
				</div>
			),
		},
		{
			title: 'Fitness Goals',
			icon: <Target className='w-5 h-5' />,
			step: 3,
			content: (
				<div className='space-y-2'>
					{data.fitnessGoals?.map(
						(goal: any, index: number) => (
							<div
								key={goal.id}
								className='flex justify-between items-center'
							>
								<span className='text-gray-400'>
									#{index + 1} Priority:
								</span>
								<span className='text-white font-medium'>
									{goal.title}
								</span>
							</div>
						)
					)}
				</div>
			),
		},
		{
			title: 'Activity Level',
			icon: <Activity className='w-5 h-5' />,
			step: 4,
			content: (
				<div className='space-y-2'>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Fitness Level:
						</span>
						<span className='text-white'>
							{getFitnessLevelText(
								data.fitnessLevel
							)}
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Activity Level:
						</span>
						<span className='text-white'>
							{getActivityLevelText(
								data.activityLevel
							)}
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-400'>
							Workout Frequency:
						</span>
						<span className='text-white'>
							{data.workoutFrequency}{' '}
							days/week
						</span>
					</div>
				</div>
			),
		},
	];

	// Add body composition card if data exists
	if (
		data.bodyFatPercentage ||
		Object.keys(data.measurements || {}).length > 0
	) {
		summaryCards.push({
			title: 'Body Composition',
			icon: <Ruler className='w-5 h-5' />,
			step: 5,
			content: (
				<div className='space-y-2'>
					{data.bodyFatPercentage && (
						<div
							className='flex justify-between'
							key='body-fat'
						>
							<span className='text-gray-400'>
								Body Fat:
							</span>
							<span className='text-white'>
								{data.bodyFatPercentage}%
							</span>
						</div>
					)}
					{data.measurements?.waist && (
						<div
							className='flex justify-between'
							key='waist'
						>
							<span className='text-gray-400'>
								Waist:
							</span>
							<span className='text-white'>
								{data.measurements.waist} cm
							</span>
						</div>
					)}
					{data.measurements?.chest && (
						<div
							className='flex justify-between'
							key='chest'
						>
							<span className='text-gray-400'>
								Chest:
							</span>
							<span className='text-white'>
								{data.measurements.chest} cm
							</span>
						</div>
					)}
					{data.measurements?.arms && (
						<div
							className='flex justify-between'
							key='arms'
						>
							<span className='text-gray-400'>
								Arms:
							</span>
							<span className='text-white'>
								{data.measurements.arms} cm
							</span>
						</div>
					)}
					{data.measurements?.thighs && (
						<div
							className='flex justify-between'
							key='thighs'
						>
							<span className='text-gray-400'>
								Thighs:
							</span>
							<span className='text-white'>
								{data.measurements.thighs}{' '}
								cm
							</span>
						</div>
					)}
				</div>
			),
		});
	}

	// Add dietary preferences card if data exists
	if (data.dietaryPreferences?.length > 0) {
		summaryCards.push({
			title: 'Dietary Preferences',
			icon: <Utensils className='w-5 h-5' />,
			step: 6,
			content: (
				<div className='space-y-2'>
					{data.dietaryPreferences.map(
						(prefId: string) => {
							const option =
								dietaryOptions.find(
									(opt) =>
										opt.id === prefId
								);
							return option ? (
								<div
									key={prefId}
									className='flex items-center space-x-2'
								>
									<div className='w-2 h-2 bg-brand rounded-full'></div>
									<span className='text-white'>
										{option.title}
									</span>
								</div>
							) : null;
						}
					)}
				</div>
			),
		});
	}

	return (
		<div className='space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-center space-y-4'
			>
				<div className='flex justify-center mb-4'>
					<div className='bg-brand/10 p-4 rounded-full'>
						<Sparkles className='w-10 h-10 text-brand' />
					</div>
				</div>
				<h3 className='text-2xl font-bold text-white'>
					Almost Ready to Start Your Journey!
				</h3>
				<p className='text-gray-300 max-w-2xl mx-auto'>
					Please review your information below.
					We&apos;ll use this to create your
					personalized fitness plan, nutrition
					recommendations, and track your
					progress.
				</p>
			</motion.div>

			{/* Summary Cards */}
			<div className='grid gap-6'>
				{summaryCards.map((card, index) => (
					<motion.div
						key={card.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index }}
						className='bg-gray-800/50 border border-gray-700/50 rounded-xl p-6'
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center space-x-3'>
								<div className='text-brand'>
									{card.icon}
								</div>
								<h4 className='text-lg font-semibold text-white'>
									{card.title}
								</h4>
							</div>
							<Button
								variant='ghost'
								size='sm'
								onClick={() =>
									onEdit(card.step)
								}
								className='text-gray-400 hover:text-white hover:bg-gray-700'
							>
								<Edit2 className='w-4 h-4 mr-2' />
								Edit
							</Button>
						</div>
						{card.content}
					</motion.div>
				))}
			</div>

			{/* AI Preview */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className='bg-gradient-to-r from-brand/10 to-green-500/10 border border-brand/20 rounded-xl p-6'
			>
				<div className='flex items-start space-x-4'>
					<div className='bg-brand/20 p-3 rounded-lg'>
						<Sparkles className='w-6 h-6 text-brand' />
					</div>
					<div className='flex-1'>
						<h4 className='text-white font-semibold mb-2'>
							What Happens Next?
						</h4>
						<div className='space-y-2 text-sm text-gray-300'>
							<div
								className='flex items-center space-x-2'
								key='ai-analyze'
							>
								<Check className='w-4 h-4 text-green-400' />
								<span>
									AI will analyze your
									data and create a
									personalized fitness
									plan
								</span>
							</div>
							<div
								className='flex items-center space-x-2'
								key='meal-recommendations'
							>
								<Check className='w-4 h-4 text-green-400' />
								<span>
									Custom meal
									recommendations based on
									your dietary preferences
								</span>
							</div>
							<div
								className='flex items-center space-x-2'
								key='progress-tracking'
							>
								<Check className='w-4 h-4 text-green-400' />
								<span>
									Progress tracking
									dashboard with detailed
									analytics
								</span>
							</div>
							<div
								className='flex items-center space-x-2'
								key='community-access'
							>
								<Check className='w-4 h-4 text-green-400' />
								<span>
									Access to our community
									and expert trainers
								</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Terms and Confirmation */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='space-y-6'
			>
				<div className='bg-gray-800/30 border border-gray-700/50 rounded-lg p-4'>
					<label className='flex items-start space-x-3 cursor-pointer'>
						<input
							type='checkbox'
							checked={agreed}
							onChange={(e) =>
								setAgreed(e.target.checked)
							}
							className='mt-1 w-4 h-4 text-brand bg-gray-700 border-gray-600 rounded focus:ring-brand'
						/>
						<span className='text-sm text-gray-300 leading-relaxed'>
							I confirm that all the
							information provided is accurate
							to the best of my knowledge. I
							understand that this data will
							be used to create personalized
							recommendations and agree to
							Hercules Gym&apos;s{' '}
							<a
								href='/privacy'
								className='text-brand hover:underline'
							>
								Privacy Policy
							</a>{' '}
							and{' '}
							<a
								href='/terms'
								className='text-brand hover:underline'
							>
								Terms of Service
							</a>
							.
						</span>
					</label>
				</div>

				<Button
					onClick={onConfirm}
					disabled={!agreed || isLoading}
					className='w-full bg-brand hover:bg-brand/80 text-black font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{isLoading ? (
						<div className='flex items-center justify-center space-x-2'>
							<div className='animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent'></div>
							<span>
								Creating Your Profile...
							</span>
						</div>
					) : (
						<div className='flex items-center justify-center space-x-2'>
							<Calendar className='w-5 h-5' />
							<span>
								Complete Onboarding & Start
								Journey
							</span>
						</div>
					)}
				</Button>

				<p className='text-center text-xs text-gray-500'>
					You can always update any of this
					information later in your profile
					settings. Welcome to Hercules Gym!
				</p>
			</motion.div>
		</div>
	);
}
