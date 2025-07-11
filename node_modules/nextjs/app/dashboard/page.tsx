'use client';

import React, { useState, useEffect } from 'react';
import {
	Trophy,
	Target,
	Flame,
	Users,
	Calendar,
	TrendingUp,
	Star,
	Award,
	Play,
	Utensils,
	RefreshCw,
	Share2,
	MessageCircle,
	Heart,
	ChevronRight,
	Crown,
	Zap,
	CheckCircle,
	Clock,
	Camera,
	BarChart3,
	Moon,
	Sun,
	Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import {
	useDashboardData,
	useAIContent,
	useChallenges,
	useLeaderboard,
	useWeeklyChallengeProgress,
	useJoinChallenge,
	useCompleteChallenge,
} from '../../hooks/use-dashboard-data';

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
	dietaryPreferences?: string[];
	fitnessGoals?: string[];
}

export default function DashboardPage() {
	const [userData, setUserData] =
		useState<UserData | null>(null);
	const [activeTab, setActiveTab] = useState('overview');
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [showDropdown, setShowDropdown] = useState(false);

	// React Query hooks
	const {
		data: dashboardData,
		isLoading: isDashboardLoading,
		error: dashboardError,
	} = useDashboardData(userData?.id || '');

	const {
		data: aiContent,
		isLoading: isAILoading,
		error: aiError,
	} = useAIContent(userData?.id || '');

	const {
		data: challengesData,
		isLoading: isChallengesLoading,
	} = useChallenges();

	const {
		data: leaderboardData,
		isLoading: isLeaderboardLoading,
	} = useLeaderboard();

	const {
		data: weeklyProgress,
		isLoading: isWeeklyProgressLoading,
	} = useWeeklyChallengeProgress(userData?.id || '');

	// Mutations
	const joinChallengeMutation = useJoinChallenge();
	const completeChallengemutation =
		useCompleteChallenge();

	const loading = isDashboardLoading || isAILoading;

	// Derived state from React Query data
	const dailyStats = {
		workouts: {
			completed:
				dashboardData?.stats?.weeklyWorkouts || 0,
			target:
				dashboardData?.user?.weeklyWorkoutGoal || 3,
		},
		calories: {
			burned:
				dashboardData?.stats?.totalCaloriesBurned ||
				0,
			target: 600,
		},
		meals: { logged: 0, target: 4 },
		points: {
			earned: dashboardData?.user?.totalPoints || 0,
			streak: dashboardData?.user?.currentStreak || 0,
		},
	};

	const challenges = challengesData || [];
	const leaderboard = leaderboardData || [];

	// Generate activities from AI content
	const activities: Array<{
		id: string;
		type: string;
		title: string;
		description: string;
		duration?: string;
		[key: string]: any;
	}> = [
		...(aiContent?.workouts?.map((workout, index) => ({
			id: workout.id || `workout-${index}`,
			type: 'workout' as const,
			title: workout.name,
			description: workout.description,
			priority: 'high',
			duration: `${workout.duration} min`,
			category: workout.type,
			exercises: workout.exercises,
			targetMuscles: workout.targetMuscles,
		})) || []),
		...(aiContent?.meals?.map((meal, index) => ({
			id: meal.id || `meal-${index}`,
			type: 'meal' as const,
			title: meal.name,
			description: meal.description,
			calories: meal.calories,
			protein: meal.protein,
			ingredients: meal.ingredients,
			macros: meal.macros,
		})) || []),
		{
			id: 'motivation-quote',
			type: 'motivation' as const,
			title: 'Daily Motivation',
			description:
				aiContent?.motivationalQuote ||
				"The only bad workout is the one that didn't happen",
			quote:
				aiContent?.motivationalQuote ||
				"The only bad workout is the one that didn't happen",
			author: 'AI Fitness Coach',
		},
	];

	const socialPosts = [
		{
			id: 1,
			user: 'John Doe',
			content:
				'Just completed my deadlift personal record! Feeling stronger every day 💪',
			timestamp: '2 hours ago',
			likes: 12,
			comments: 5,
			hasImage: true,
		},
		{
			id: 2,
			user: 'Jane Smith',
			content:
				'Hit a new personal record on deadlifts today! 🏋️‍♀️',
			timestamp: '4 hours ago',
			likes: 8,
			comments: 3,
			hasImage: false,
		},
	];

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			window.location.href = '/login';
			return;
		}

		try {
			const parsedUser = JSON.parse(user);
			setUserData(parsedUser);
		} catch (error) {
			console.error(
				'Error parsing user data:',
				error
			);
			window.location.href = '/login';
		}
	}, []);

	const joinChallenge = async (
		challengeId: string | number,
		challengeType: 'daily' | 'weekly'
	) => {
		if (!userData?.id) {
			toast.error(
				'User not found. Please log in again.'
			);
			return;
		}

		joinChallengeMutation.mutate({
			userId: userData.id,
			challengeId: challengeId.toString(),
			challengeType,
		});
	};

	const completeChallenge = async (
		challengeEntryId: string
	) => {
		if (!userData?.id) {
			toast.error(
				'User not found. Please log in again.'
			);
			return;
		}

		completeChallengemutation.mutate({
			userId: userData.id,
			challengeEntryId,
		});
	};

	const generatePersonalizedActivities = (
		user: UserData
	) => {
		const workoutActivity = {
			id: 1,
			type: 'workout',
			title: getWorkoutTitle(
				user.primaryGoal,
				user.fitnessLevel
			),
			description: getWorkoutDescription(
				user.primaryGoal,
				user.fitnessLevel
			),
			priority: 'high',
			duration: getDuration(user.fitnessLevel),
			category: getCategory(user.primaryGoal),
		};

		const mealActivity = {
			id: 2,
			type: 'meal',
			title: 'Personalized Nutrition',
			description: getNutritionDescription(
				user.primaryGoal
			),
			meals: getPersonalizedMeals(
				user.primaryGoal,
				user.dietaryPreferences
			),
		};

		const motivationActivity = {
			id: 3,
			type: 'motivation',
			title: 'Daily Motivation',
			quote: getMotivationalQuote(user.primaryGoal),
			author: 'Hercules Gym',
		};

		return [
			workoutActivity,
			mealActivity,
			motivationActivity,
		];
	};

	const getWorkoutTitle = (
		goal?: string,
		level?: string
	) => {
		if (goal === 'weight-loss')
			return 'Fat Burning HIIT';
		if (goal === 'muscle-gain')
			return 'Muscle Building Strength';
		if (goal === 'endurance') return 'Cardio Endurance';
		return 'Full Body Workout';
	};

	const getWorkoutDescription = (
		goal?: string,
		level?: string
	) => {
		if (goal === 'weight-loss')
			return 'High-intensity interval training to maximize calorie burn and boost metabolism';
		if (goal === 'muscle-gain')
			return 'Compound movements and progressive overload to build lean muscle mass';
		if (goal === 'endurance')
			return 'Cardiovascular exercises to improve stamina and endurance';
		return 'Balanced workout targeting all major muscle groups for overall fitness';
	};

	const getDuration = (level?: string) => {
		if (level === 'beginner') return '20-30 min';
		if (level === 'intermediate') return '30-45 min';
		return '45-60 min';
	};

	const getCategory = (goal?: string) => {
		if (goal === 'weight-loss') return 'HIIT';
		if (goal === 'muscle-gain') return 'Strength';
		if (goal === 'endurance') return 'Cardio';
		return 'Mixed';
	};

	const getNutritionDescription = (goal?: string) => {
		if (goal === 'weight-loss')
			return 'Calorie-controlled meals to support fat loss while maintaining muscle';
		if (goal === 'muscle-gain')
			return 'Protein-rich meals to fuel muscle growth and recovery';
		return 'Balanced nutrition to support your fitness journey';
	};

	const getPersonalizedMeals = (
		goal?: string,
		preferences?: string[]
	) => {
		const baseMeals = [
			{
				name: 'Protein Smoothie',
				calories: 300,
				protein: 25,
			},
			{
				name: 'Grilled Chicken Salad',
				calories: 450,
				protein: 35,
			},
			{
				name: 'Quinoa Power Bowl',
				calories: 500,
				protein: 20,
			},
		];

		if (preferences?.includes('vegetarian')) {
			return [
				{
					name: 'Plant Protein Smoothie',
					calories: 300,
					protein: 20,
				},
				{
					name: 'Lentil Power Bowl',
					calories: 450,
					protein: 25,
				},
				{
					name: 'Tofu Stir Fry',
					calories: 400,
					protein: 22,
				},
			];
		}

		if (preferences?.includes('keto')) {
			return [
				{
					name: 'Avocado Eggs',
					calories: 400,
					protein: 20,
				},
				{
					name: 'Salmon & Greens',
					calories: 500,
					protein: 35,
				},
				{
					name: 'Cheese & Nuts',
					calories: 350,
					protein: 15,
				},
			];
		}

		return baseMeals;
	};

	const getMotivationalQuote = (goal?: string) => {
		if (goal === 'weight-loss')
			return 'Every step forward is a step toward achieving your goals';
		if (goal === 'muscle-gain')
			return "Strength doesn't come from what you can do. It comes from overcoming the things you thought you couldn't";
		if (goal === 'endurance')
			return 'Endurance is not just the ability to bear a hard thing, but to turn it into glory';
		return "The only bad workout is the one that didn't happen";
	};

	const updateChallengesForUser = (user: UserData) => {
		return [
			{
				id: 1,
				title: 'Daily Fitness Challenge',
				description: `Complete your ${user.primaryGoal || 'fitness'} workout today`,
				progress: 0,
				reward: '25 points',
				type: 'workout',
				status: 'active',
			},
			{
				id: 2,
				title: 'Weekly Consistency',
				description: `Complete ${user.weeklyWorkoutGoal || 3} workouts this week`,
				progress: Math.min(
					((user.totalWorkouts || 0) /
						(user.weeklyWorkoutGoal || 3)) *
						100,
					100
				),
				reward: '100 points',
				type: 'weekly',
				status: 'active',
			},
		];
	};

	const themeClasses = {
		// Background colors
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
			gradient: isDarkMode
				? 'bg-gradient-to-r from-blue-600 to-purple-600'
				: 'bg-gradient-to-r from-blue-600 to-purple-600',
		},
		// Text colors
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
		// Border colors
		border: {
			primary: isDarkMode
				? 'border-gray-700'
				: 'border-gray-200',
			secondary: isDarkMode
				? 'border-gray-600'
				: 'border-gray-300',
		},
		// Hover states
		hover: {
			bg: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
			card: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
		},
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
						Loading your dashboard...
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
						Unable to load user data
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

	// Check if onboarding is completed
	if (!userData.onboardingCompleted) {
		return (
			<div
				className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} flex items-center justify-center`}
			>
				<div className='text-center max-w-md mx-auto p-6'>
					<div className='bg-blue-600/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center'>
						<Target className='w-10 h-10 text-blue-600' />
					</div>
					<h1
						className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}
					>
						Complete Your Profile
					</h1>
					<p
						className={`${themeClasses.text.secondary} mb-6`}
					>
						To get personalized recommendations
						and track your progress, please
						complete your fitness profile first.
					</p>
					<button
						onClick={() =>
							(window.location.href =
								'/onboarding')
						}
						className='bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 py-3 rounded transition-colors'
					>
						Complete Profile
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

						{/* Navigation */}
						<div className='hidden md:flex items-center space-x-8'>
							<nav className='flex space-x-8'>
								{[
									{
										name: 'Overview',
										id: 'overview',
									},
									{
										name: 'Workouts',
										id: 'workouts',
									},
									{
										name: 'Nutrition',
										id: 'nutrition',
									},
									{
										name: 'Social',
										id: 'social',
									},
								].map((tab) => (
									<button
										key={tab.id}
										onClick={() =>
											setActiveTab(
												tab.id
											)
										}
										className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											activeTab ===
											tab.id
												? 'bg-blue-600 text-white'
												: `${themeClasses.text.secondary} ${themeClasses.hover.bg}`
										}`}
									>
										{tab.name}
									</button>
								))}
							</nav>
						</div>

						{/* User Profile & Theme Toggle */}
						<div className='flex items-center space-x-4'>
							<button
								onClick={() =>
									setIsDarkMode(
										!isDarkMode
									)
								}
								className={`p-2 rounded-lg ${themeClasses.hover.bg} transition-colors`}
							>
								{isDarkMode ? (
									<Sun
										className={`w-5 h-5 ${themeClasses.text.secondary}`}
									/>
								) : (
									<Moon
										className={`w-5 h-5 ${themeClasses.text.secondary}`}
									/>
								)}
							</button>

							<div className='relative'>
								<button
									onClick={() =>
										setShowDropdown(
											!showDropdown
										)
									}
									className={`flex items-center space-x-2 p-2 rounded-lg ${themeClasses.hover.bg} transition-colors`}
								>
									<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
										<span className='text-white text-sm font-medium'>
											{userData.name?.charAt(
												0
											) || 'U'}
										</span>
									</div>
									<span
										className={`text-sm font-medium ${themeClasses.text.primary}`}
									>
										{userData.name}
									</span>
								</button>

								{showDropdown && (
									<div
										className={`absolute right-0 mt-2 w-48 ${themeClasses.bg.secondary} rounded-md shadow-lg py-1 z-10 ${themeClasses.border.primary} border`}
									>
										<a
											href='/profile'
											className={`block px-4 py-2 text-sm ${themeClasses.text.primary} ${themeClasses.hover.bg}`}
										>
											Profile
										</a>
										<a
											href='/settings'
											className={`block px-4 py-2 text-sm ${themeClasses.text.primary} ${themeClasses.hover.bg}`}
										>
											Settings
										</a>
										<button
											onClick={() => {
												localStorage.removeItem(
													'user'
												);
												window.location.href =
													'/login';
											}}
											className={`block w-full text-left px-4 py-2 text-sm ${themeClasses.text.primary} ${themeClasses.hover.bg}`}
										>
											Sign out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Daily Goals Overview */}
				<div className='mb-8'>
					<div
						className={`${themeClasses.bg.gradient} rounded-xl p-6 text-white shadow-lg`}
					>
						<h2 className='text-2xl font-bold mb-4'>
							Let&apos;s crush today&apos;s
							fitness goals!
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm'>
									<Target className='w-6 h-6' />
								</div>
								<div className='text-sm opacity-90'>
									Total Workouts
								</div>
								<div className='text-lg font-bold'>
									{
										dailyStats.workouts
											.completed
									}
									/
									{
										dailyStats.workouts
											.target
									}
								</div>
							</div>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm'>
									<Flame className='w-6 h-6' />
								</div>
								<div className='text-sm opacity-90'>
									Calories Burned
								</div>
								<div className='text-lg font-bold'>
									{
										dailyStats.calories
											.burned
									}
									/
									{
										dailyStats.calories
											.target
									}
								</div>
							</div>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm'>
									<Utensils className='w-6 h-6' />
								</div>
								<div className='text-sm opacity-90'>
									Meals Logged
								</div>
								<div className='text-lg font-bold'>
									{
										dailyStats.meals
											.logged
									}
									/
									{
										dailyStats.meals
											.target
									}
								</div>
							</div>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm'>
									<Star className='w-6 h-6' />
								</div>
								<div className='text-sm opacity-90'>
									Points Earned
								</div>
								<div className='text-lg font-bold'>
									{
										dailyStats.points
											.earned
									}{' '}
									pts
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column - Progress & Challenges */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Progress Cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div
								className={`${
									isDarkMode
										? 'bg-blue-900/30 border-blue-800'
										: 'bg-blue-50'
								} rounded-xl p-6 border transition-colors duration-300`}
							>
								<div className='flex items-center justify-between mb-4'>
									<h3
										className={`font-semibold ${
											isDarkMode
												? 'text-blue-300'
												: 'text-blue-900'
										}`}
									>
										Weekly Workout Goal
									</h3>
									<Target className='w-5 h-5 text-blue-600' />
								</div>
								<div
									className={`text-3xl font-bold ${
										isDarkMode
											? 'text-blue-200'
											: 'text-blue-900'
									} mb-2`}
								>
									{
										dailyStats.workouts
											.completed
									}
								</div>
								<div
									className={`text-sm ${
										isDarkMode
											? 'text-blue-400'
											: 'text-blue-700'
									} mb-3`}
								>
									of{' '}
									{
										dailyStats.workouts
											.target
									}{' '}
									workouts
								</div>
								<div
									className={`w-full ${
										isDarkMode
											? 'bg-blue-800'
											: 'bg-blue-200'
									} rounded-full h-2`}
								>
									<div
										className='bg-blue-600 h-2 rounded-full transition-all duration-300'
										style={{
											width: `${Math.min(
												(dailyStats
													.workouts
													.completed /
													dailyStats
														.workouts
														.target) *
													100,
												100
											)}%`,
										}}
									></div>
								</div>
							</div>

							<div
								className={`${
									isDarkMode
										? 'bg-red-900/30 border-red-800'
										: 'bg-red-50'
								} rounded-xl p-6 border transition-colors duration-300`}
							>
								<div className='flex items-center justify-between mb-4'>
									<h3
										className={`font-semibold ${
											isDarkMode
												? 'text-red-300'
												: 'text-red-900'
										}`}
									>
										Current Streak
									</h3>
									<Flame className='w-5 h-5 text-red-600' />
								</div>
								<div
									className={`text-3xl font-bold ${
										isDarkMode
											? 'text-red-200'
											: 'text-red-900'
									} mb-2`}
								>
									{
										dailyStats.points
											.streak
									}
								</div>
								<div
									className={`text-sm ${
										isDarkMode
											? 'text-red-400'
											: 'text-red-700'
									}`}
								>
									days in a row
								</div>
							</div>

							<div
								className={`${
									isDarkMode
										? 'bg-green-900/30 border-green-800'
										: 'bg-green-50'
								} rounded-xl p-6 border transition-colors duration-300`}
							>
								<div className='flex items-center justify-between mb-4'>
									<h3
										className={`font-semibold ${
											isDarkMode
												? 'text-green-300'
												: 'text-green-900'
										}`}
									>
										Total Points
									</h3>
									<Star className='w-5 h-5 text-green-600' />
								</div>
								<div
									className={`text-3xl font-bold ${
										isDarkMode
											? 'text-green-200'
											: 'text-green-900'
									} mb-2`}
								>
									{
										dailyStats.points
											.earned
									}
								</div>
								<div
									className={`text-sm ${
										isDarkMode
											? 'text-green-400'
											: 'text-green-700'
									}`}
								>
									lifetime points
								</div>
							</div>
						</div>

						{/* AI Personalized Recommendations */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-10 h-10 ${
											isDarkMode
												? 'bg-purple-900'
												: 'bg-purple-100'
										} rounded-lg flex items-center justify-center`}
									>
										<Zap className='w-5 h-5 text-purple-600' />
									</div>
									<h2
										className={`text-xl font-bold ${themeClasses.text.primary}`}
									>
										AI Personalized for
										You
									</h2>
								</div>
								<button
									className={`p-2 ${themeClasses.hover.bg} rounded-lg transition-colors`}
								>
									<RefreshCw
										className={`w-4 h-4 ${themeClasses.text.secondary}`}
									/>
								</button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{activities
									.slice(0, 2)
									.map((activity) => (
										<div
											key={
												activity.id
											}
											className={`${themeClasses.border.primary} border rounded-lg p-4 transition-colors duration-300`}
										>
											<div className='flex items-center justify-between mb-3'>
												<div className='flex items-center space-x-2'>
													<div
														className={`w-8 h-8 rounded-lg flex items-center justify-center ${
															activity.type ===
															'workout'
																? isDarkMode
																	? 'bg-blue-900'
																	: 'bg-blue-100'
																: isDarkMode
																	? 'bg-orange-900'
																	: 'bg-orange-100'
														}`}
													>
														{activity.type ===
														'workout' ? (
															<Play className='w-4 h-4 text-blue-600' />
														) : (
															<Utensils className='w-4 h-4 text-orange-600' />
														)}
													</div>
													<span
														className={`text-xs font-medium ${themeClasses.text.tertiary} capitalize`}
													>
														{
															activity.type
														}
													</span>
												</div>
												{activity.duration && (
													<span
														className={`text-xs ${themeClasses.text.tertiary}`}
													>
														{
															activity.duration
														}
													</span>
												)}
											</div>

											<h3
												className={`font-semibold ${themeClasses.text.primary} mb-2`}
											>
												{
													activity.title
												}
											</h3>
											<p
												className={`text-sm ${themeClasses.text.secondary} mb-3`}
											>
												{
													activity.description
												}
											</p>

											<button className='w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
												{activity.type ===
												'workout'
													? 'Start Workout'
													: 'View Meals'}
											</button>
										</div>
									))}
							</div>

							{/* Motivational Quote */}
							{activities.find(
								(a) =>
									a.type === 'motivation'
							) && (
								<div
									className={`mt-4 ${
										isDarkMode
											? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50'
											: 'bg-gradient-to-r from-purple-50 to-blue-50'
									} rounded-lg p-4 border ${
										isDarkMode
											? 'border-purple-800'
											: 'border-purple-200'
									} transition-colors duration-300`}
								>
									<div className='flex items-center space-x-2 mb-2'>
										<Sparkles className='w-4 h-4 text-purple-600' />
										<span
											className={`text-sm font-medium ${
												isDarkMode
													? 'text-purple-300'
													: 'text-purple-900'
											}`}
										>
											Daily Motivation
										</span>
									</div>
									<blockquote
										className={`text-lg font-medium ${
											isDarkMode
												? 'text-purple-200'
												: 'text-purple-900'
										} mb-2`}
									>
										&quot;
										{
											activities.find(
												(a) =>
													a.type ===
													'motivation'
											)?.quote
										}
										&quot;
									</blockquote>
									<cite
										className={`text-sm ${
											isDarkMode
												? 'text-purple-400'
												: 'text-purple-700'
										}`}
									>
										—{' '}
										{
											activities.find(
												(a) =>
													a.type ===
													'motivation'
											)?.author
										}
									</cite>
								</div>
							)}
						</div>

						{/* Challenges Section */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-10 h-10 ${
											isDarkMode
												? 'bg-red-900'
												: 'bg-red-100'
										} rounded-lg flex items-center justify-center`}
									>
										<Target className='w-5 h-5 text-red-600' />
									</div>
									<h2
										className={`text-xl font-bold ${themeClasses.text.primary}`}
									>
										Daily & Weekly
										Challenges
									</h2>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{challenges.map(
									(challenge) => (
										<div
											key={
												challenge.id
											}
											className={`${themeClasses.border.primary} border rounded-lg p-4 transition-colors duration-300`}
										>
											<div className='flex items-center justify-between mb-3'>
												<div className='flex items-center space-x-2'>
													<div
														className={`w-8 h-8 rounded-lg flex items-center justify-center ${
															challenge.type ===
															'workout'
																? isDarkMode
																	? 'bg-green-900'
																	: 'bg-green-100'
																: isDarkMode
																	? 'bg-blue-900'
																	: 'bg-blue-100'
														}`}
													>
														{challenge.type ===
														'workout' ? (
															<CheckCircle className='w-4 h-4 text-green-600' />
														) : (
															<Clock className='w-4 h-4 text-blue-600' />
														)}
													</div>
													<span
														className={`text-xs font-medium ${themeClasses.text.tertiary} capitalize`}
													>
														{challenge.type ===
														'workout'
															? 'Today'
															: 'This Week'}
													</span>
												</div>
												<span className='text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded'>
													{
														challenge.reward
													}
												</span>
											</div>

											<h3
												className={`font-semibold ${themeClasses.text.primary} mb-2`}
											>
												{
													challenge.title
												}
											</h3>
											<p
												className={`text-sm ${themeClasses.text.secondary} mb-3`}
											>
												{
													challenge.description
												}
											</p>

											{challenge.progress !==
												undefined && (
												<div className='mb-3'>
													<div className='flex justify-between text-sm mb-1'>
														<span
															className={
																themeClasses
																	.text
																	.tertiary
															}
														>
															Progress
														</span>
														<span
															className={
																themeClasses
																	.text
																	.tertiary
															}
														>
															{
																challenge.progress
															}

															%
														</span>
													</div>
													<div
														className={`w-full ${
															isDarkMode
																? 'bg-gray-700'
																: 'bg-gray-200'
														} rounded-full h-2`}
													>
														<div
															className={`h-2 rounded-full transition-all duration-300 ${
																challenge.progress >=
																100
																	? 'bg-green-500'
																	: 'bg-blue-600'
															}`}
															style={{
																width: `${challenge.progress}%`,
															}}
														></div>
													</div>
												</div>
											)}

											<button
												onClick={() =>
													joinChallenge(
														challenge.id,
														challenge.type as any
													)
												}
												className={`w-full py-2 rounded-lg font-medium transition-colors ${
													challenge.status ===
													'completed'
														? 'bg-green-600 text-white'
														: 'bg-blue-600 text-white hover:bg-blue-700'
												}`}
												disabled={
													challenge.status ===
													'completed'
												}
											>
												{challenge.status ===
												'completed'
													? 'Completed!'
													: 'Join Challenge'}
											</button>
										</div>
									)
								)}
							</div>
						</div>
					</div>

					{/* Right Column - Achievements & Social */}
					<div className='space-y-6'>
						{/* Achievements & Rankings */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-10 h-10 ${
											isDarkMode
												? 'bg-yellow-900'
												: 'bg-yellow-100'
										} rounded-lg flex items-center justify-center`}
									>
										<Trophy className='w-5 h-5 text-yellow-600' />
									</div>
									<h2
										className={`text-xl font-bold ${themeClasses.text.primary}`}
									>
										Achievements &
										Rankings
									</h2>
								</div>
							</div>

							{/* Total Points */}
							<div
								className={`${
									isDarkMode
										? 'bg-yellow-900/30 border-yellow-800'
										: 'bg-yellow-50'
								} rounded-lg p-4 mb-6 border transition-colors duration-300`}
							>
								<div className='flex items-center justify-center mb-2'>
									<Crown className='w-8 h-8 text-yellow-600' />
								</div>
								<div className='text-center'>
									<div
										className={`text-2xl font-bold ${
											isDarkMode
												? 'text-yellow-200'
												: 'text-yellow-900'
										}`}
									>
										{
											dailyStats
												.points
												.earned
										}
									</div>
									<div
										className={`text-sm ${
											isDarkMode
												? 'text-yellow-400'
												: 'text-yellow-700'
										}`}
									>
										Total Points
									</div>
									<div
										className={`text-xs ${
											isDarkMode
												? 'text-yellow-500'
												: 'text-yellow-600'
										} mt-1`}
									>
										You&apos;re in the
										top performers!
									</div>
								</div>
							</div>

							{/* Leaderboard */}
							<div className='space-y-3'>
								<h3
									className={`font-semibold ${themeClasses.text.primary}`}
								>
									Leaderboard
								</h3>
								{leaderboard
									.slice(0, 5)
									.map((user: any) => (
										<div
											key={user.rank}
											className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
												user.name ===
												userData.name
													? isDarkMode
														? 'bg-blue-900/30 border border-blue-800'
														: 'bg-blue-50 border border-blue-200'
													: isDarkMode
														? 'bg-gray-700'
														: 'bg-gray-50'
											}`}
										>
											<div className='flex items-center space-x-3'>
												<div
													className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
														user.rank ===
														1
															? 'bg-yellow-500 text-white'
															: user.rank ===
																  2
																? 'bg-gray-400 text-white'
																: user.rank ===
																	  3
																	? 'bg-yellow-600 text-white'
																	: isDarkMode
																		? 'bg-gray-600 text-gray-200'
																		: 'bg-gray-300 text-gray-700'
													}`}
												>
													{
														user.rank
													}
												</div>
												<div>
													<div
														className={`font-medium ${
															user.name ===
															userData.name
																? isDarkMode
																	? 'text-blue-300'
																	: 'text-blue-900'
																: themeClasses
																		.text
																		.primary
														}`}
													>
														{
															user.name
														}
													</div>
													<div
														className={`text-xs ${themeClasses.text.tertiary}`}
													>
														{
															user.streak
														}{' '}
														day
														streak
													</div>
												</div>
											</div>
											<div className='text-right'>
												<div
													className={`font-medium ${
														user.name ===
														userData.name
															? isDarkMode
																? 'text-blue-300'
																: 'text-blue-900'
															: themeClasses
																	.text
																	.primary
													}`}
												>
													{
														user.points
													}
												</div>
												<div
													className={`text-xs ${themeClasses.text.tertiary}`}
												>
													points
												</div>
											</div>
										</div>
									))}
							</div>
						</div>

						{/* Social Feed */}
						<div
							className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
						>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-10 h-10 ${
											isDarkMode
												? 'bg-pink-900'
												: 'bg-pink-100'
										} rounded-lg flex items-center justify-center`}
									>
										<Users className='w-5 h-5 text-pink-600' />
									</div>
									<h2
										className={`text-xl font-bold ${themeClasses.text.primary}`}
									>
										Community Feed
									</h2>
								</div>
								<button
									className={`p-2 ${themeClasses.hover.bg} rounded-lg transition-colors`}
								>
									<RefreshCw
										className={`w-4 h-4 ${themeClasses.text.secondary}`}
									/>
								</button>
							</div>

							<div className='space-y-4'>
								{socialPosts.map((post) => (
									<div
										key={post.id}
										className={`${themeClasses.border.primary} border rounded-lg p-4 transition-colors duration-300`}
									>
										<div className='flex items-center space-x-3 mb-3'>
											<div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
												<span className='text-white text-sm font-medium'>
													{post.user.charAt(
														0
													)}
												</span>
											</div>
											<div>
												<div
													className={`font-medium ${themeClasses.text.primary}`}
												>
													{
														post.user
													}
												</div>
												<div
													className={`text-xs ${themeClasses.text.tertiary}`}
												>
													{
														post.timestamp
													}
												</div>
											</div>
										</div>

										<p
											className={`${themeClasses.text.secondary} mb-3`}
										>
											{post.content}
										</p>

										{post.hasImage && (
											<div
												className={`w-full h-32 ${
													isDarkMode
														? 'bg-gray-700'
														: 'bg-gray-200'
												} rounded-lg mb-3 flex items-center justify-center`}
											>
												<Camera
													className={`w-8 h-8 ${themeClasses.text.tertiary}`}
												/>
											</div>
										)}

										<div className='flex items-center justify-between'>
											<div className='flex items-center space-x-4'>
												<button className='flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors'>
													<Heart className='w-4 h-4' />
													<span className='text-sm'>
														{
															post.likes
														}
													</span>
												</button>
												<button
													className={`flex items-center space-x-1 ${themeClasses.text.secondary} hover:text-blue-600 transition-colors`}
												>
													<MessageCircle className='w-4 h-4' />
													<span className='text-sm'>
														{
															post.comments
														}
													</span>
												</button>
											</div>
											<button
												className={`${themeClasses.text.secondary} hover:text-blue-600 transition-colors`}
											>
												<Share2 className='w-4 h-4' />
											</button>
										</div>
									</div>
								))}
							</div>

							{/* Personal Trainer Chat */}
							<div
								className={`mt-6 ${
									isDarkMode
										? 'bg-green-900/30 border-green-800'
										: 'bg-green-50'
								} rounded-lg p-4 border transition-colors duration-300`}
							>
								<div className='flex items-center space-x-3 mb-3'>
									<div
										className={`w-10 h-10 ${
											isDarkMode
												? 'bg-green-900'
												: 'bg-green-100'
										} rounded-full flex items-center justify-center`}
									>
										<MessageCircle className='w-5 h-5 text-green-600' />
									</div>
									<div>
										<div
											className={`font-medium ${
												isDarkMode
													? 'text-green-300'
													: 'text-green-900'
											}`}
										>
											Personal Trainer
										</div>
										<div
											className={`text-sm ${
												isDarkMode
													? 'text-green-400'
													: 'text-green-700'
											}`}
										>
											Available for
											guidance
										</div>
									</div>
								</div>
								<button className='w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors'>
									Chat with Trainer
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
