'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
	Trophy,
	Target,
	Camera,
	Edit,
	Save,
	X,
	User,
	Mail,
	Calendar,
	Ruler,
	Weight,
	Activity,
	Heart,
	Utensils,
	Settings,
	ChevronDown,
	Upload,
	Moon,
	Sun,
	LogOut,
} from 'lucide-react';

interface UserData {
	id: string;
	name: string;
	email: string;
	age?: number;
	gender?: string;
	height?: number;
	weight?: number;
	primaryGoal?: string;
	fitnessLevel?: string;
	onboardingCompleted?: boolean;
	totalPoints?: number;
	currentStreak?: number;
	longestStreak?: number;
	totalWorkouts?: number;
	totalCaloriesBurned?: number;
	weeklyWorkoutGoal?: number;
	fitnessGoals?: string[];
	dietaryPreferences?: string[];
	profileImage?: string;
}

export default function ProfilePage() {
	const [userData, setUserData] =
		useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [profileImage, setProfileImage] = useState<
		string | null
	>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [editData, setEditData] = useState<
		Partial<UserData>
	>({});

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			window.location.href = '/login';
			return;
		}

		try {
			const parsedUser = JSON.parse(user);
			setUserData(parsedUser);
			setEditData(parsedUser);
			setProfileImage(
				parsedUser.profileImage || null
			);
		} catch (error) {
			console.error(
				'Error parsing user data:',
				error
			);
			window.location.href = '/login';
		} finally {
			setLoading(false);
		}
	}, []);

	const themeClasses = {
		bg: {
			primary: isDarkMode
				? 'bg-gray-900'
				: 'bg-gray-50',
			secondary: isDarkMode
				? 'bg-gray-800'
				: 'bg-white',
			tertiary: isDarkMode
				? 'bg-gray-700'
				: 'bg-gray-100',
			card: isDarkMode ? 'bg-gray-800' : 'bg-white',
			gradient:
				'bg-gradient-to-r from-blue-600 to-purple-600',
		},
		text: {
			primary: isDarkMode
				? 'text-white'
				: 'text-gray-900',
			secondary: isDarkMode
				? 'text-gray-300'
				: 'text-gray-600',
			tertiary: isDarkMode
				? 'text-gray-400'
				: 'text-gray-500',
			muted: isDarkMode
				? 'text-gray-500'
				: 'text-gray-400',
		},
		border: {
			primary: isDarkMode
				? 'border-gray-700'
				: 'border-gray-200',
			secondary: isDarkMode
				? 'border-gray-600'
				: 'border-gray-300',
		},
		hover: {
			bg: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
			card: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
		},
	};

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setProfileImage(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		try {
			if (!userData?.id) {
				console.error('No valid user data');
				return;
			}
			// Here you would typically save to your backend
			const updatedUser: UserData = {
				...userData,
				...editData,
				profileImage: profileImage || undefined,
			};
			localStorage.setItem(
				'user',
				JSON.stringify(updatedUser)
			);
			setUserData(updatedUser);
			setIsEditing(false);
		} catch (error) {
			console.error('Error saving profile:', error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.href = '/login';
	};

	if (loading) {
		return (
			<div
				className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} flex items-center justify-center`}
			>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4'></div>
					<p
						className={
							themeClasses.text.secondary
						}
					>
						Loading your profile...
					</p>
				</div>
			</div>
		);
	}

	if (!userData) {
		return (
			<div
				className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} flex items-center justify-center`}
			>
				<div className='text-center'>
					<p
						className={`${themeClasses.text.primary} text-xl mb-4`}
					>
						Unable to load profile data
					</p>
					<button
						onClick={() =>
							(window.location.href =
								'/login')
						}
						className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
					>
						Go to Login
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary}`}
		>
			{/* Header */}
			<div
				className={`${themeClasses.bg.secondary} ${themeClasses.border.primary} border-b sticky top-0 z-10 transition-colors duration-300`}
			>
				<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
									<Trophy className='w-5 h-5 text-white' />
								</div>
								<h1
									className={`text-xl font-bold ${themeClasses.text.primary}`}
								>
									Hercules Gym
								</h1>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() =>
									setIsDarkMode(
										!isDarkMode
									)
								}
								className={`w-8 h-8 ${isDarkMode ? 'bg-yellow-100' : 'bg-gray-100'} rounded-full flex items-center justify-center ${themeClasses.hover.bg} transition-colors`}
							>
								{isDarkMode ? (
									<Sun className='w-4 h-4 text-yellow-600' />
								) : (
									<Moon className='w-4 h-4 text-gray-600' />
								)}
							</button>
							<div className='relative'>
								<button
									onClick={() =>
										setShowDropdown(
											!showDropdown
										)
									}
									className={`w-8 h-8 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center ${themeClasses.hover.bg} transition-colors`}
								>
									<User className='w-4 h-4 text-blue-600' />
								</button>
								{showDropdown && (
									<div
										className={`absolute right-0 mt-2 w-48 ${themeClasses.bg.secondary} rounded-lg shadow-lg border ${themeClasses.border.primary} z-20`}
									>
										<div className='py-1'>
											<button
												onClick={() =>
													(window.location.href =
														'/dashboard')
												}
												className={`w-full px-4 py-2 text-left ${themeClasses.text.primary} ${themeClasses.hover.bg} transition-colors`}
											>
												Dashboard
											</button>
											<button
												onClick={() =>
													(window.location.href =
														'/settings')
												}
												className={`w-full px-4 py-2 text-left ${themeClasses.text.primary} ${themeClasses.hover.bg} transition-colors`}
											>
												Settings
											</button>
											<button
												onClick={
													handleLogout
												}
												className={`w-full px-4 py-2 text-left text-red-600 ${themeClasses.hover.bg} transition-colors`}
											>
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Profile Header */}
				<div
					className={`${themeClasses.bg.gradient} rounded-xl p-6 text-white shadow-lg mb-8`}
				>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-6'>
							<div className='relative'>
								<div className='w-24 h-24 bg-white/20 rounded-full flex items-center justify-center overflow-hidden'>
									{profileImage ? (
										<Image
											src={
												profileImage
											}
											alt='Profile'
											width={96}
											height={96}
											className='w-full h-full object-cover'
										/>
									) : (
										<User className='w-12 h-12 text-white' />
									)}
								</div>
								<label className='absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors'>
									<Camera className='w-4 h-4 text-white' />
									<input
										type='file'
										accept='image/*'
										onChange={
											handleImageUpload
										}
										className='hidden'
									/>
								</label>
							</div>
							<div>
								<h2 className='text-2xl font-bold'>
									{userData.name}
								</h2>
								<p className='text-white/80'>
									{userData.email}
								</p>
								<div className='flex items-center space-x-4 mt-2'>
									<div className='flex items-center space-x-1'>
										<Trophy className='w-4 h-4' />
										<span className='text-sm'>
											{userData.totalPoints ||
												0}{' '}
											points
										</span>
									</div>
									<div className='flex items-center space-x-1'>
										<Target className='w-4 h-4' />
										<span className='text-sm'>
											{userData.currentStreak ||
												0}{' '}
											day streak
										</span>
									</div>
								</div>
							</div>
						</div>
						<button
							onClick={() =>
								setIsEditing(!isEditing)
							}
							className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2'
						>
							{isEditing ? (
								<X className='w-4 h-4' />
							) : (
								<Edit className='w-4 h-4' />
							)}
							<span>
								{isEditing
									? 'Cancel'
									: 'Edit Profile'}
							</span>
						</button>
					</div>
				</div>

				{/* Profile Content */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column - Basic Info */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Personal Information */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<h3
								className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
							>
								Personal Information
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Full Name
									</label>
									{isEditing ? (
										<input
											type='text'
											value={
												editData.name ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														name: e
															.target
															.value,
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										/>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.name}
										</p>
									)}
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Email
									</label>
									<p
										className={`${themeClasses.text.primary} font-medium`}
									>
										{userData.email}
									</p>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Age
									</label>
									{isEditing ? (
										<input
											type='number'
											value={
												editData.age ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														age: parseInt(
															e
																.target
																.value
														),
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										/>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.age ||
												'Not specified'}
										</p>
									)}
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Gender
									</label>
									{isEditing ? (
										<select
											value={
												editData.gender ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														gender: e
															.target
															.value,
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value=''>
												Select
												gender
											</option>
											<option value='male'>
												Male
											</option>
											<option value='female'>
												Female
											</option>
											<option value='other'>
												Other
											</option>
										</select>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.gender ||
												'Not specified'}
										</p>
									)}
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Height (cm)
									</label>
									{isEditing ? (
										<input
											type='number'
											value={
												editData.height ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														height: parseFloat(
															e
																.target
																.value
														),
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										/>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.height ||
												'Not specified'}
										</p>
									)}
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Weight (kg)
									</label>
									{isEditing ? (
										<input
											type='number'
											value={
												editData.weight ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														weight: parseFloat(
															e
																.target
																.value
														),
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										/>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.weight ||
												'Not specified'}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Fitness Information */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<h3
								className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
							>
								Fitness Information
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Primary Goal
									</label>
									{isEditing ? (
										<select
											value={
												editData.primaryGoal ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														primaryGoal:
															e
																.target
																.value,
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value=''>
												Select goal
											</option>
											<option value='weight-loss'>
												Weight Loss
											</option>
											<option value='muscle-gain'>
												Muscle Gain
											</option>
											<option value='endurance'>
												Improve
												Endurance
											</option>
											<option value='general-health'>
												General
												Health
											</option>
										</select>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.primaryGoal ||
												'Not specified'}
										</p>
									)}
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
									>
										Fitness Level
									</label>
									{isEditing ? (
										<select
											value={
												editData.fitnessLevel ||
												''
											}
											onChange={(e) =>
												setEditData(
													{
														...editData,
														fitnessLevel:
															e
																.target
																.value,
													}
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value=''>
												Select level
											</option>
											<option value='beginner'>
												Beginner
											</option>
											<option value='intermediate'>
												Intermediate
											</option>
											<option value='advanced'>
												Advanced
											</option>
										</select>
									) : (
										<p
											className={`${themeClasses.text.primary} font-medium`}
										>
											{userData.fitnessLevel ||
												'Not specified'}
										</p>
									)}
								</div>
							</div>
						</div>

						{isEditing && (
							<div className='flex justify-end space-x-4'>
								<button
									onClick={() =>
										setIsEditing(false)
									}
									className={`px-6 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.text.primary} ${themeClasses.hover.bg} transition-colors`}
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
								>
									<Save className='w-4 h-4' />
									<span>
										Save Changes
									</span>
								</button>
							</div>
						)}
					</div>

					{/* Right Column - Stats */}
					<div className='space-y-6'>
						{/* Fitness Stats */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<h3
								className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
							>
								Fitness Stats
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Trophy className='w-5 h-5 text-yellow-500' />
										<span
											className={`${themeClasses.text.secondary}`}
										>
											Total Points
										</span>
									</div>
									<span
										className={`${themeClasses.text.primary} font-bold`}
									>
										{userData.totalPoints ||
											0}
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Target className='w-5 h-5 text-blue-500' />
										<span
											className={`${themeClasses.text.secondary}`}
										>
											Current Streak
										</span>
									</div>
									<span
										className={`${themeClasses.text.primary} font-bold`}
									>
										{userData.currentStreak ||
											0}{' '}
										days
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Activity className='w-5 h-5 text-green-500' />
										<span
											className={`${themeClasses.text.secondary}`}
										>
											Total Workouts
										</span>
									</div>
									<span
										className={`${themeClasses.text.primary} font-bold`}
									>
										{userData.totalWorkouts ||
											0}
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Heart className='w-5 h-5 text-red-500' />
										<span
											className={`${themeClasses.text.secondary}`}
										>
											Calories Burned
										</span>
									</div>
									<span
										className={`${themeClasses.text.primary} font-bold`}
									>
										{userData.totalCaloriesBurned ||
											0}
									</span>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<h3
								className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
							>
								Quick Actions
							</h3>
							<div className='space-y-3'>
								<button
									onClick={() =>
										(window.location.href =
											'/dashboard')
									}
									className='w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-left'
								>
									Go to Dashboard
								</button>
								<button
									onClick={() =>
										(window.location.href =
											'/settings')
									}
									className={`w-full border ${themeClasses.border.primary} ${themeClasses.text.primary} px-4 py-2 rounded-lg ${themeClasses.hover.bg} transition-colors text-left`}
								>
									Account Settings
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
