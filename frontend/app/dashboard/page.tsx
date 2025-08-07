'use client';

import React, {
	useState,
	useEffect,
	Suspense,
	lazy,
} from 'react';
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
} from '@/lib/icons';
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

// Lazy load heavy components for better performance
const AIContentDisplay = lazy(
	() => import('./components/AIContentDisplay')
);
const ChallengesSection = lazy(
	() => import('./components/ChallengesSection')
);
const CommunitySection = lazy(
	() => import('./components/CommunitySection')
);
const DailyActivities = lazy(
	() => import('./components/DailyActivities')
);
const GamificationSection = lazy(
	() => import('./components/GamificationSection')
);
const ProgressSummary = lazy(
	() => import('./components/ProgressSummary')
);
const WeeklyChallengeProgress = lazy(
	() => import('./components/WeeklyChallengeProgress')
);
const WelcomeSection = lazy(
	() => import('./components/WelcomeSection')
);

// Loading components
const LoadingSpinner = () => (
	<div className='flex items-center justify-center p-8'>
		<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand'></div>
	</div>
);

const LoadingCard = () => (
	<div className='bg-gray-800/50 rounded-xl p-6 animate-pulse'>
		<div className='h-4 bg-gray-700 rounded w-3/4 mb-4'></div>
		<div className='h-3 bg-gray-700 rounded w-1/2'></div>
	</div>
);

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

	// React Query hooks with optimized loading states
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

	// Error handling
	if (dashboardError || aiError) {
		return (
			<div className='min-h-screen bg-black text-white p-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='bg-red-900/20 border border-red-500/50 rounded-xl p-6'>
						<h2 className='text-xl font-bold text-red-400 mb-2'>
							Error Loading Dashboard
						</h2>
						<p className='text-red-300'>
							{dashboardError?.message ||
								aiError?.message ||
								'Failed to load dashboard data'}
						</p>
						<button
							onClick={() =>
								window.location.reload()
							}
							className='mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors'
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black text-white'>
			{/* Header */}
			<div className='bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-2xl font-bold text-white'>
								Welcome back,{' '}
								{userData?.name || 'User'}!
								👋
							</h1>
							<p className='text-gray-400 mt-1'>
								Ready to crush your fitness
								goals today?
							</p>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() =>
									setIsDarkMode(
										!isDarkMode
									)
								}
								className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'
							>
								{isDarkMode ? (
									<Sun className='w-5 h-5' />
								) : (
									<Moon className='w-5 h-5' />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{loading ? (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<div className='lg:col-span-2 space-y-8'>
							<LoadingCard />
							<LoadingCard />
							<LoadingCard />
						</div>
						<div className='space-y-8'>
							<LoadingCard />
							<LoadingCard />
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Main Content Area */}
						<div className='lg:col-span-2 space-y-8'>
							{/* Welcome Section */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<WelcomeSection
									userName={
										userData?.name ||
										'Fitness Warrior'
									}
									todayStats={{
										workouts:
											dailyStats
												.workouts
												.completed,
										mealsLogged:
											dailyStats.meals
												.logged,
										pointsEarned:
											dailyStats
												.points
												.earned,
									}}
									totalStats={{
										totalWorkouts:
											userData?.totalWorkouts ||
											0,
										totalCaloriesBurned:
											userData?.totalCaloriesBurned ||
											0,
										currentStreak:
											userData?.currentStreak ||
											0,
									}}
								/>
							</Suspense>

							{/* Progress Summary */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<ProgressSummary
									weeklyProgress={{
										workoutsCompleted:
											dailyStats
												.workouts
												.completed,
										workoutGoal:
											dailyStats
												.workouts
												.target,
										progressPercentage:
											Math.round(
												(dailyStats
													.workouts
													.completed /
													dailyStats
														.workouts
														.target) *
													100
											),
									}}
									fitnessGoals={{
										primaryGoal:
											userData?.primaryGoal ||
											'Build Strength',
										progressPercentage: 65,
									}}
									motivationalStats={{
										consistentDays:
											userData?.currentStreak ||
											0,
										workoutsToWeeklyGoal:
											Math.max(
												0,
												dailyStats
													.workouts
													.target -
													dailyStats
														.workouts
														.completed
											),
									}}
								/>
							</Suspense>

							{/* Daily Activities */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<DailyActivities
									todayActivities={
										activities
									}
								/>
							</Suspense>

							{/* AI Content Display */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<AIContentDisplay
									userId={
										userData?.id || ''
									}
								/>
							</Suspense>

							{/* Weekly Challenge Progress */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<WeeklyChallengeProgress
									progress={
										weeklyProgress
									}
									isLoading={
										isWeeklyProgressLoading
									}
								/>
							</Suspense>
						</div>

						{/* Sidebar */}
						<div className='space-y-8'>
							{/* Challenges Section */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<ChallengesSection
									availableChallenges={
										challenges
									}
									isLoading={
										isChallengesLoading
									}
									onJoinChallenge={
										joinChallenge
									}
									onCompleteChallenge={
										completeChallenge
									}
								/>
							</Suspense>

							{/* Gamification Section */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<GamificationSection
									userData={userData}
								/>
							</Suspense>

							{/* Community Section */}
							<Suspense
								fallback={<LoadingCard />}
							>
								<CommunitySection
									leaderboardData={
										leaderboard
									}
									isLoading={
										isLeaderboardLoading
									}
								/>
							</Suspense>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
