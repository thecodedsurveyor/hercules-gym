'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui/radio-group';
import {
	ChevronRight,
	ChevronLeft,
	Eye,
	EyeOff,
	Check,
	X,
	Loader2,
} from 'lucide-react';
import Footer from '@/components/landing/Footer';

export default function GetStartedPage() {
	const [step, setStep] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		fitnessGoal: '',
		experienceLevel: '',
		preferredTime: '',
	});

	const passwordValidation = {
		length: formData.password.length >= 8,
		uppercase: /[A-Z]/.test(formData.password),
		lowercase: /[a-z]/.test(formData.password),
		number: /\d/.test(formData.password),
		special: /[!@#$%^&*(),.?":{}|<>]/.test(
			formData.password
		),
	};

	const isPasswordValid = Object.values(
		passwordValidation
	).every(Boolean);
	const passwordsMatch =
		formData.password === formData.confirmPassword &&
		formData.confirmPassword !== '';

	const canProceedStep1 =
		formData.name &&
		formData.email &&
		isPasswordValid &&
		passwordsMatch;
	const canProceedStep2 = formData.fitnessGoal;
	const canProceedStep3 = formData.experienceLevel;

	const handleNext = () => {
		if (step === 1 && !canProceedStep1) return;
		if (step === 2 && !canProceedStep2) return;
		if (step === 3) {
			handleSubmit();
			return;
		}
		setStep((prev) => Math.min(prev + 1, 3));
	};

	const handleBack = () => {
		setStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = async () => {
		if (!canProceedStep3) return;

		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch(
				'http://localhost:3002/users/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formData.name,
						email: formData.email,
						password: formData.password,
						fitnessGoal: formData.fitnessGoal,
						experienceLevel:
							formData.experienceLevel,
						preferredTime:
							formData.preferredTime,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message ||
						'Registration failed'
				);
			}

			const userData = await response.json();
			console.log(
				'User registered successfully:',
				userData
			);
			setSuccess(true);

			// Store user data in localStorage for persistence
			localStorage.setItem(
				'user',
				JSON.stringify(userData)
			);

			// Redirect to login or dashboard after a delay
			setTimeout(() => {
				window.location.href = '/login';
			}, 2000);
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

	if (success) {
		return (
			<>
				<div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center'>
					<div className='text-center'>
						<div className='w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6'>
							<Check className='w-10 h-10 text-black' />
						</div>
						<h1 className='text-3xl font-bold text-white mb-4'>
							Welcome to Hercules Gym!
						</h1>
						<p className='text-gray-400 mb-6'>
							Your account has been created
							successfully.
						</p>
						<p className='text-sm text-gray-500'>
							Redirecting you to login...
						</p>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className='space-y-6'
					>
						<div className='space-y-2'>
							<Label
								htmlFor='name'
								className='text-white'
							>
								Full Name
							</Label>
							<Input
								id='name'
								type='text'
								placeholder='Enter your full name'
								className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target
											.value,
									})
								}
							/>
						</div>

						<div className='space-y-2'>
							<Label
								htmlFor='email'
								className='text-white'
							>
								Email Address
							</Label>
							<Input
								id='email'
								type='email'
								placeholder='Enter your email address'
								className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target
											.value,
									})
								}
							/>
						</div>

						<div className='space-y-2'>
							<Label
								htmlFor='password'
								className='text-white'
							>
								Password
							</Label>
							<div className='relative'>
								<Input
									id='password'
									type={
										showPassword
											? 'text'
											: 'password'
									}
									placeholder='Create a strong password'
									className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand pr-10'
									value={
										formData.password
									}
									onChange={(e) =>
										setFormData({
											...formData,
											password:
												e.target
													.value,
										})
									}
								/>
								<button
									type='button'
									onClick={() =>
										setShowPassword(
											!showPassword
										)
									}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
								>
									{showPassword ? (
										<EyeOff className='w-4 h-4' />
									) : (
										<Eye className='w-4 h-4' />
									)}
								</button>
							</div>

							{/* Password Requirements */}
							{formData.password && (
								<div className='mt-3 space-y-2'>
									<p className='text-sm text-gray-300 mb-2'>
										Password
										requirements:
									</p>
									<div className='grid grid-cols-1 gap-1 text-xs'>
										<div
											className={`flex items-center gap-2 ${passwordValidation.length ? 'text-green-400' : 'text-gray-400'}`}
										>
											{passwordValidation.length ? (
												<Check className='w-3 h-3' />
											) : (
												<X className='w-3 h-3' />
											)}
											At least 8
											characters
										</div>
										<div
											className={`flex items-center gap-2 ${passwordValidation.uppercase ? 'text-green-400' : 'text-gray-400'}`}
										>
											{passwordValidation.uppercase ? (
												<Check className='w-3 h-3' />
											) : (
												<X className='w-3 h-3' />
											)}
											One uppercase
											letter
										</div>
										<div
											className={`flex items-center gap-2 ${passwordValidation.lowercase ? 'text-green-400' : 'text-gray-400'}`}
										>
											{passwordValidation.lowercase ? (
												<Check className='w-3 h-3' />
											) : (
												<X className='w-3 h-3' />
											)}
											One lowercase
											letter
										</div>
										<div
											className={`flex items-center gap-2 ${passwordValidation.number ? 'text-green-400' : 'text-gray-400'}`}
										>
											{passwordValidation.number ? (
												<Check className='w-3 h-3' />
											) : (
												<X className='w-3 h-3' />
											)}
											One number
										</div>
										<div
											className={`flex items-center gap-2 ${passwordValidation.special ? 'text-green-400' : 'text-gray-400'}`}
										>
											{passwordValidation.special ? (
												<Check className='w-3 h-3' />
											) : (
												<X className='w-3 h-3' />
											)}
											One special
											character
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='space-y-2'>
							<Label
								htmlFor='confirmPassword'
								className='text-white'
							>
								Confirm Password
							</Label>
							<div className='relative'>
								<Input
									id='confirmPassword'
									type={
										showConfirmPassword
											? 'text'
											: 'password'
									}
									placeholder='Confirm your password'
									className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand pr-10'
									value={
										formData.confirmPassword
									}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword:
												e.target
													.value,
										})
									}
								/>
								<button
									type='button'
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
								>
									{showConfirmPassword ? (
										<EyeOff className='w-4 h-4' />
									) : (
										<Eye className='w-4 h-4' />
									)}
								</button>
							</div>
							{formData.confirmPassword && (
								<div
									className={`flex items-center gap-2 text-xs mt-2 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}
								>
									{passwordsMatch ? (
										<Check className='w-3 h-3' />
									) : (
										<X className='w-3 h-3' />
									)}
									{passwordsMatch
										? 'Passwords match'
										: 'Passwords do not match'}
								</div>
							)}
						</div>
					</motion.div>
				);

			case 2:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className='space-y-8'
					>
						<div className='space-y-4'>
							<Label className='text-white text-lg'>
								What&apos;s your primary
								fitness goal?
							</Label>
							<RadioGroup
								value={formData.fitnessGoal}
								onValueChange={(value) =>
									setFormData({
										...formData,
										fitnessGoal: value,
									})
								}
								className='grid grid-cols-1 gap-4'
							>
								{[
									{
										value: 'build-muscle',
										label: 'Build Muscle',
										description:
											'Gain strength and increase muscle mass',
										icon: '💪',
									},
									{
										value: 'lose-weight',
										label: 'Lose Weight',
										description:
											'Reduce body fat and improve fitness',
										icon: '🔥',
									},
									{
										value: 'improve-fitness',
										label: 'Improve Overall Fitness',
										description:
											'Enhance endurance and general health',
										icon: '❤️',
									},
									{
										value: 'athletic-performance',
										label: 'Athletic Performance',
										description:
											'Train for specific sports or events',
										icon: '🏃',
									},
								].map((goal) => (
									<div
										key={goal.value}
										className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
											formData.fitnessGoal ===
											goal.value
												? 'border-brand bg-brand/10'
												: 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
										}`}
										onClick={() =>
											setFormData({
												...formData,
												fitnessGoal:
													goal.value,
											})
										}
									>
										<RadioGroupItem
											value={
												goal.value
											}
											id={goal.value}
											className='mt-1'
										/>
										<div className='flex-1'>
											<div className='flex items-center gap-3 mb-2'>
												<span className='text-2xl'>
													{
														goal.icon
													}
												</span>
												<Label
													htmlFor={
														goal.value
													}
													className='font-semibold text-white cursor-pointer'
												>
													{
														goal.label
													}
												</Label>
											</div>
											<p className='text-sm text-gray-400'>
												{
													goal.description
												}
											</p>
										</div>
									</div>
								))}
							</RadioGroup>
						</div>
					</motion.div>
				);

			case 3:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className='space-y-8'
					>
						<div className='space-y-4'>
							<Label className='text-white text-lg'>
								What&apos;s your experience
								level?
							</Label>
							<RadioGroup
								value={
									formData.experienceLevel
								}
								onValueChange={(value) =>
									setFormData({
										...formData,
										experienceLevel:
											value,
									})
								}
								className='grid grid-cols-1 gap-4'
							>
								{[
									{
										value: 'beginner',
										label: 'Beginner',
										description:
											'New to fitness or returning after a long break',
										icon: '🌱',
									},
									{
										value: 'intermediate',
										label: 'Intermediate',
										description:
											'Regular workout experience with basic knowledge',
										icon: '⚡',
									},
									{
										value: 'advanced',
										label: 'Advanced',
										description:
											'Experienced with various workout techniques',
										icon: '🚀',
									},
								].map((level) => (
									<div
										key={level.value}
										className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
											formData.experienceLevel ===
											level.value
												? 'border-brand bg-brand/10'
												: 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
										}`}
										onClick={() =>
											setFormData({
												...formData,
												experienceLevel:
													level.value,
											})
										}
									>
										<RadioGroupItem
											value={
												level.value
											}
											id={level.value}
											className='mt-1'
										/>
										<div className='flex-1'>
											<div className='flex items-center gap-3 mb-2'>
												<span className='text-2xl'>
													{
														level.icon
													}
												</span>
												<Label
													htmlFor={
														level.value
													}
													className='font-semibold text-white cursor-pointer'
												>
													{
														level.label
													}
												</Label>
											</div>
											<p className='text-sm text-gray-400'>
												{
													level.description
												}
											</p>
										</div>
									</div>
								))}
							</RadioGroup>
						</div>

						{/* Error Message */}
						{error && (
							<div className='bg-red-500/10 border border-red-500/50 rounded-lg p-4'>
								<p className='text-red-400 text-sm'>
									{error}
								</p>
							</div>
						)}
					</motion.div>
				);

			default:
				return null;
		}
	};

	return (
		<>
			<div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black'>
				<div className='grid lg:grid-cols-2 min-h-screen'>
					{/* Left Side - Form */}
					<div className='flex items-center justify-center p-6 lg:p-12'>
						<div className='w-full max-w-md'>
							{/* Header */}
							<div className='text-center mb-8'>
								<h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
									Join{' '}
									<span className='text-brand'>
										Hercules Gym
									</span>
								</h1>
								<p className='text-gray-400'>
									Start your fitness
									journey today
								</p>
							</div>

							{/* Progress Steps */}
							<div className='flex justify-center items-center mb-8'>
								{[1, 2, 3].map((number) => (
									<div
										key={number}
										className='flex items-center'
									>
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
												step >=
												number
													? 'bg-brand text-black'
													: step +
																1 ===
														  number
														? 'bg-gray-700 text-white border-2 border-brand'
														: 'bg-gray-800 text-gray-400'
											}`}
										>
											{number}
										</div>
										{number < 3 && (
											<div
												className={`h-1 w-16 mx-2 transition-all ${
													step >
													number
														? 'bg-brand'
														: 'bg-gray-800'
												}`}
											/>
										)}
									</div>
								))}
							</div>

							{/* Step Labels */}
							<div className='flex justify-between text-xs text-gray-400 mb-8 px-2'>
								<span
									className={
										step >= 1
											? 'text-brand'
											: ''
									}
								>
									Account
								</span>
								<span
									className={
										step >= 2
											? 'text-brand'
											: ''
									}
								>
									Goals
								</span>
								<span
									className={
										step >= 3
											? 'text-brand'
											: ''
									}
								>
									Experience
								</span>
							</div>

							{/* Form Content */}
							<div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-6'>
								{renderStep()}
							</div>

							{/* Navigation Buttons */}
							<div className='flex justify-between gap-4'>
								{step > 1 ? (
									<Button
										onClick={handleBack}
										variant='outline'
										className='flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800'
										disabled={
											isSubmitting
										}
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
										(step === 1 &&
											!canProceedStep1) ||
										(step === 2 &&
											!canProceedStep2) ||
										(step === 3 &&
											(!canProceedStep3 ||
												isSubmitting))
									}
									className={`flex items-center gap-2 px-8 ${
										(step === 1 &&
											!canProceedStep1) ||
										(step === 2 &&
											!canProceedStep2) ||
										(step === 3 &&
											!canProceedStep3)
											? 'bg-gray-700 text-gray-400 cursor-not-allowed'
											: 'bg-brand text-black hover:bg-brand/80'
									}`}
								>
									{isSubmitting ? (
										<>
											<Loader2 className='w-4 h-4 animate-spin' />
											Creating
											Account...
										</>
									) : (
										<>
											{step === 3
												? 'Complete Registration'
												: 'Continue'}
											<ChevronRight className='w-4 h-4' />
										</>
									)}
								</Button>
							</div>

							{/* Login Link */}
							<div className='text-center mt-6'>
								<p className='text-gray-400 text-sm'>
									Already have an account?{' '}
									<Link
										href='/login'
										className='text-brand hover:text-brand/80 font-medium'
									>
										Sign in
									</Link>
								</p>
							</div>
						</div>
					</div>

					{/* Right Side - Image */}
					<div className='hidden lg:block relative'>
						<div className='absolute inset-0 bg-gradient-to-l from-black/50 to-transparent z-10'></div>
						<Image
							src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
							alt='People working out at Hercules Gym'
							fill
							className='object-cover'
							priority
						/>
						<div className='absolute bottom-8 left-8 z-20 text-white'>
							<h2 className='text-2xl font-bold mb-2'>
								Transform Your Life
							</h2>
							<p className='text-gray-300'>
								Join thousands who have
								achieved their fitness goals
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
