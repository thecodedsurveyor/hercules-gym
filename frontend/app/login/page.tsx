'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/landing/Footer';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { StreakPopup } from '@/components/ui/achievement-popup';

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [showStreakPopup, setShowStreakPopup] =
		useState(false);
	const [currentStreak, setCurrentStreak] = useState(0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch(
				'http://localhost:3002/users/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || 'Login failed'
				);
			}

			const userData = await response.json();
			console.log('Login successful:', userData);

			// Store user data and token
			localStorage.setItem(
				'user',
				JSON.stringify(userData.user)
			);
			localStorage.setItem('token', userData.token);

			// Check for streak achievements
			if (userData.streak) {
				setCurrentStreak(userData.streak.current);

				// Show streak popup for milestone achievements
				if (
					userData.streak.achievements &&
					userData.streak.achievements.length > 0
				) {
					setShowStreakPopup(true);
					// Delay redirect to show achievement
					setTimeout(() => {
						window.location.href = '/dashboard';
					}, 3000);
					return;
				}
			}

			// Redirect to dashboard
			window.location.href = '/dashboard';
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Invalid email or password'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<main className='min-h-screen bg-black flex items-center justify-center p-4'>
				<div className='w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center'>
					{/* Left Side - Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className='w-full max-w-md mx-auto space-y-8'
					>
						<div className='text-center md:text-left'>
							<Link
								href='/'
								className='inline-block'
							>
								<Image
									src='/logo.png'
									alt='Hercules Gym'
									width={150}
									height={40}
									className='mb-8'
								/>
							</Link>
							<h1 className='text-3xl md:text-4xl font-bold mb-4'>
								Welcome Back to{' '}
								<span className='text-brand'>
									Hercules
								</span>
							</h1>
							<p className='text-gray-400 text-sm md:text-base'>
								Sign in to access your
								personalized workout plans
								and connect with our fitness
								community.
							</p>
						</div>

						{error && (
							<div className='bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm'>
								{error}
							</div>
						)}

						<form
							onSubmit={handleSubmit}
							className='space-y-6'
						>
							<div className='space-y-2'>
								<Label htmlFor='email'>
									Email
								</Label>
								<Input
									id='email'
									type='email'
									placeholder='Enter your email'
									className='bg-gray-900 border-gray-800 text-white placeholder:text-gray-500'
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target
												.value,
										})
									}
									required
								/>
							</div>

							<div className='space-y-2'>
								<div className='flex justify-between items-center'>
									<Label htmlFor='password'>
										Password
									</Label>
									<Link
										href='/forgot-password'
										className='text-sm text-brand hover:text-brand/80'
									>
										Forgot Password?
									</Link>
								</div>
								<div className='relative'>
									<Input
										id='password'
										type={
											showPassword
												? 'text'
												: 'password'
										}
										placeholder='Enter your password'
										className='bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 pr-10'
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
										required
									/>
									<button
										type='button'
										onClick={() =>
											setShowPassword(
												!showPassword
											)
										}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300'
									>
										{showPassword ? (
											<EyeOff className='w-4 h-4' />
										) : (
											<Eye className='w-4 h-4' />
										)}
									</button>
								</div>
							</div>

							<Button
								type='submit'
								className='w-full bg-brand hover:bg-brand/80 text-black font-bold py-3'
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
										Signing in...
									</>
								) : (
									'Sign In'
								)}
							</Button>
						</form>

						<p className='text-center text-gray-400'>
							Don&apos;t have an account?{' '}
							<Link
								href='/get-started'
								className='text-brand hover:text-brand/80 font-medium'
							>
								Get Started
							</Link>
						</p>
					</motion.div>

					{/* Right Side - Image */}
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.95,
						}}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className='hidden md:block relative h-[600px] rounded-3xl overflow-hidden'
					>
						<Image
							src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
							alt='Gym atmosphere'
							fill
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>

						{/* Testimonial Overlay */}
						<div className='absolute bottom-8 left-8 right-8 bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6'>
							<div className='flex items-start gap-4'>
								<Image
									src='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
									alt='Member'
									width={60}
									height={60}
									className='rounded-full'
								/>
								<div>
									<blockquote className='text-gray-300 text-sm leading-relaxed mb-2'>
										&quot;Hercules Gym
										has transformed my
										fitness journey. The
										personalized plans
										and supportive
										community make all
										the
										difference.&quot;
									</blockquote>
									<cite className='text-white font-medium block'>
										- Michael Chen,
										Member since 2023
									</cite>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</main>
			<Footer />

			{/* Streak Achievement Popup */}
			<StreakPopup
				streak={currentStreak}
				isVisible={showStreakPopup}
				onClose={() => {
					setShowStreakPopup(false);
					window.location.href = '/dashboard';
				}}
			/>
		</>
	);
}
