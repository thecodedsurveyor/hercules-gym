'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	ChevronRight,
	ChevronLeft,
	Loader2,
} from 'lucide-react';

// Import step components
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import BasicInfoStep from '@/components/onboarding/BasicInfoStep';
import FitnessGoalsStep from '@/components/onboarding/FitnessGoalsStep';
import ActivityLevelStep from '@/components/onboarding/ActivityLevelStep';
import BodyCompositionStep from '@/components/onboarding/BodyCompositionStep';
import DietaryPreferencesStep from '@/components/onboarding/DietaryPreferencesStep';
import SummaryConfirmationStep from '@/components/onboarding/SummaryConfirmationStep';

interface OnboardingData {
	// Basic Information
	age: number | null;
	gender: string;
	height: number | null;
	weight: number | null;

	// Fitness Goals
	fitnessGoals: string[];
	goalPriority: string[];
	primaryGoal: string;

	// Activity Level
	fitnessLevel: string;
	activityLevel: string;
	workoutFrequency: number | null;

	// Body Composition (Optional)
	bodyFatPercentage: number | null;
	measurements: {
		waist?: number;
		chest?: number;
		arms?: number;
		thighs?: number;
	};

	// Dietary Preferences
	dietaryPreferences: string[];
}

const TOTAL_STEPS = 7;

export default function OnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [userData, setUserData] = useState<any>(null);

	const [onboardingData, setOnboardingData] =
		useState<OnboardingData>({
			// Basic Information
			age: null,
			gender: '',
			height: null,
			weight: null,

			// Fitness Goals
			fitnessGoals: [],
			goalPriority: [],
			primaryGoal: '',

			// Activity Level
			fitnessLevel: '',
			activityLevel: '',
			workoutFrequency: null,

			// Body Composition
			bodyFatPercentage: null,
			measurements: {},

			// Dietary Preferences
			dietaryPreferences: [],
		});

	// Check if user is logged in
	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			window.location.href = '/login';
			return;
		}
		setUserData(JSON.parse(user));
	}, []);

	const updateOnboardingData = (
		stepData: Partial<OnboardingData>
	) => {
		setOnboardingData((prev) => ({
			...prev,
			...stepData,
		}));
	};

	const canProceed = () => {
		switch (currentStep) {
			case 1:
				return true; // Welcome step
			case 2:
				return (
					onboardingData.age &&
					onboardingData.gender &&
					onboardingData.height &&
					onboardingData.weight
				);
			case 3:
				return (
					onboardingData.fitnessGoals.length >
						0 && onboardingData.primaryGoal
				);
			case 4:
				return (
					onboardingData.fitnessLevel &&
					onboardingData.workoutFrequency
				);
			case 5:
				return true; // Optional step
			case 6:
				return true; // Can proceed without dietary preferences
			case 7:
				return true; // Summary step
			default:
				return false;
		}
	};

	const handleNext = () => {
		if (!canProceed()) return;

		if (currentStep === TOTAL_STEPS) {
			handleSubmit();
			return;
		}

		setCurrentStep((prev) =>
			Math.min(prev + 1, TOTAL_STEPS)
		);
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch(
				'http://localhost:3002/users/onboarding',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userData?.token || ''}`,
					},
					body: JSON.stringify({
						userId: userData?.id,
						...onboardingData,
						onboardingCompleted: true,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message ||
						'Failed to save onboarding data'
				);
			}

			// Redirect to dashboard with personalized recommendations
			window.location.href = '/dashboard';
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Something went wrong'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const getStepComponent = () => {
		switch (currentStep) {
			case 1:
				return <WelcomeStep userData={userData} />;
			case 2:
				return (
					<BasicInfoStep
						data={onboardingData}
						updateData={updateOnboardingData}
					/>
				);
			case 3:
				return (
					<FitnessGoalsStep
						data={onboardingData}
						updateData={updateOnboardingData}
					/>
				);
			case 4:
				return (
					<ActivityLevelStep
						data={onboardingData}
						updateData={updateOnboardingData}
					/>
				);
			case 5:
				return (
					<BodyCompositionStep
						data={onboardingData}
						updateData={updateOnboardingData}
					/>
				);
			case 6:
				return (
					<DietaryPreferencesStep
						data={onboardingData}
						updateData={updateOnboardingData}
					/>
				);
			case 7:
				return (
					<SummaryConfirmationStep
						data={onboardingData}
						onEdit={(step: number) =>
							setCurrentStep(step)
						}
						onConfirm={handleSubmit}
						isLoading={isSubmitting}
					/>
				);
			default:
				return null;
		}
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case 1:
				return 'Welcome';
			case 2:
				return 'Basic Information';
			case 3:
				return 'Fitness Goals';
			case 4:
				return 'Activity Level';
			case 5:
				return 'Body Composition';
			case 6:
				return 'Dietary Preferences';
			case 7:
				return 'Summary';
			default:
				return '';
		}
	};

	if (!userData) {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center'>
				<Loader2 className='w-8 h-8 animate-spin text-brand' />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
							Complete Your{' '}
							<span className='text-brand'>
								Fitness Profile
							</span>
						</h1>
						<p className='text-gray-400'>
							Help us create the perfect
							workout and nutrition plan for
							you
						</p>
					</div>

					{/* Progress Bar */}
					<div className='mb-8'>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-sm text-gray-400'>
								Step {currentStep} of{' '}
								{TOTAL_STEPS}
							</span>
							<span className='text-sm text-gray-400'>
								{Math.round(
									(currentStep /
										TOTAL_STEPS) *
										100
								)}
								% Complete
							</span>
						</div>
						<Progress
							value={
								(currentStep /
									TOTAL_STEPS) *
								100
							}
							className='h-2 bg-gray-800'
						/>
					</div>

					{/* Step Content */}
					<div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 mb-8 min-h-[500px]'>
						<div className='mb-6'>
							<h2 className='text-xl md:text-2xl font-semibold text-white mb-2'>
								{getStepTitle()}
							</h2>
						</div>

						<AnimatePresence mode='wait'>
							<motion.div
								key={currentStep}
								initial={{
									opacity: 0,
									x: 20,
								}}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 0,
									x: -20,
								}}
								transition={{
									duration: 0.3,
								}}
							>
								{getStepComponent()}
							</motion.div>
						</AnimatePresence>

						{/* Error Message */}
						{error && (
							<div className='mt-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4'>
								<p className='text-red-400 text-sm'>
									{error}
								</p>
							</div>
						)}
					</div>

					{/* Navigation */}
					<div className='flex justify-between items-center'>
						{currentStep > 1 ? (
							<Button
								onClick={handleBack}
								variant='outline'
								className='flex items-center gap-2 bg-red-600/90 hover:bg-red-700 text-black border-red-700'
								disabled={isSubmitting}
							>
								<ChevronLeft className='w-4 h-4' />
								Back
							</Button>
						) : (
							<div></div>
						)}

						<Button
							onClick={handleNext}
							disabled={
								!canProceed() ||
								isSubmitting
							}
							className={`flex items-center gap-2 px-8 ${
								!canProceed()
									? 'bg-gray-700 text-gray-400 cursor-not-allowed'
									: 'bg-brand text-black hover:bg-brand/80'
							}`}
						>
							{isSubmitting ? (
								<>
									<Loader2 className='w-4 h-4 animate-spin' />
									Saving...
								</>
							) : (
								<>
									{currentStep ===
									TOTAL_STEPS
										? 'Complete Setup'
										: 'Continue'}
									<ChevronRight className='w-4 h-4' />
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
