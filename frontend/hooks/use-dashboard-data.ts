'use client';

import {
	useQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

// API base URL
const API_BASE =
	process.env.NEXT_PUBLIC_API_URL ||
	'http://localhost:3002';

// Types
interface UserStats {
	totalWorkouts: number;
	weeklyWorkouts: number;
	totalCaloriesBurned: number;
	averageWorkoutDuration: number;
	longestStreak: number;
	currentStreak: number;
}

interface WorkoutLog {
	id: string;
	name: string;
	duration: number;
	calories: number;
	completedAt: string;
}

interface MealLog {
	id: string;
	name: string;
	calories: number;
	protein: number;
	completedAt: string;
}

interface Achievement {
	id: string;
	name: string;
	description: string;
	points: number;
	earnedAt: string;
}

interface Challenge {
	id: string | number;
	name?: string;
	title?: string;
	description: string;
	points: number;
	difficulty?: string;
	type: string;
	progress?: number;
	completed?: boolean;
	reward?: string;
	status?: string;
	target?: number;
}

interface AIContent {
	workouts: Array<{
		id: string;
		name: string;
		duration: number;
		type: string;
		difficulty: string;
		description: string;
		exercises: string[];
		targetMuscles: string[];
	}>;
	meals: Array<{
		id: string;
		name: string;
		type: string;
		calories: number;
		protein: number;
		description: string;
		ingredients: string[];
		macros: {
			protein: number;
			carbs: number;
			fats: number;
		};
	}>;
	motivationalQuote: string;
}

interface DashboardData {
	user: {
		id: string;
		name: string;
		email: string;
		totalPoints: number;
		currentStreak: number;
		weeklyWorkoutGoal?: number;
		fitnessGoals?: string[];
		fitnessLevel?: string;
		dietaryPreferences?: string[];
		longestStreak?: number;
	};
	stats: UserStats;
	recentWorkouts: WorkoutLog[];
	recentMeals: MealLog[];
	achievements: Achievement[];
	aiContent: AIContent;
}

interface WeeklyChallengeProgress {
	weeklyChallenge: Challenge;
	progress: {
		percentage: number;
		completedDays: number;
		totalDays: number;
		weeklyBreakdown: Array<{
			date: Date;
			dayName: string;
			value: number;
			activities: Array<{
				id: string;
				name: string;
				value: number;
				time: string;
			}>;
			isToday: boolean;
			isCompleted: boolean;
		}>;
	};
}

// Query keys for better cache management
const queryKeys = {
	dashboard: (userId: string) => ['dashboard', userId],
	aiContent: (userId: string) => ['aiContent', userId],
	userStats: (userId: string) => ['userStats', userId],
	achievements: (userId: string) => [
		'achievements',
		userId,
	],
	challenges: () => ['challenges'],
	leaderboard: () => ['leaderboard'],
	weeklyProgress: (userId: string) => [
		'weeklyProgress',
		userId,
	],
};

// Optimized fetch functions with error handling
async function fetchDashboardData(
	userId: string
): Promise<DashboardData> {
	const response = await fetch(
		`${API_BASE}/api/dashboard/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch dashboard data');
	}
	return response.json();
}

async function fetchAIContent(
	userId: string
): Promise<AIContent> {
	const response = await fetch(
		`${API_BASE}/api/ai-content/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch AI content');
	}
	return response.json();
}

async function fetchUserStats(
	userId: string
): Promise<UserStats> {
	const response = await fetch(
		`${API_BASE}/api/user-stats/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch user stats');
	}
	return response.json();
}

async function fetchAchievements(
	userId: string
): Promise<Achievement[]> {
	const response = await fetch(
		`${API_BASE}/api/achievements/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch achievements');
	}
	return response.json();
}

async function fetchChallenges(): Promise<Challenge[]> {
	const response = await fetch(
		`${API_BASE}/api/challenges`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch challenges');
	}
	return response.json();
}

async function fetchLeaderboard() {
	const response = await fetch(
		`${API_BASE}/api/leaderboard`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch leaderboard');
	}
	return response.json();
}

async function fetchWeeklyChallengeProgress(
	userId: string
): Promise<WeeklyChallengeProgress> {
	const response = await fetch(
		`${API_BASE}/api/weekly-progress/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch weekly progress');
	}
	return response.json();
}

async function joinChallenge(data: {
	userId: string;
	challengeId: string;
	challengeType: 'daily' | 'weekly';
}) {
	const response = await fetch(
		`${API_BASE}/api/challenges/join`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to join challenge');
	}

	return response.json();
}

async function completeChallenge(data: {
	userId: string;
	challengeEntryId: string;
}) {
	const response = await fetch(
		`${API_BASE}/api/challenges/complete`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to complete challenge');
	}

	return response.json();
}

async function logWorkout(workoutData: any) {
	const response = await fetch(
		`${API_BASE}/api/workouts/log`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(workoutData),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to log workout');
	}

	return response.json();
}

async function logMeal(mealData: any) {
	const response = await fetch(
		`${API_BASE}/api/meals/log`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mealData),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to log meal');
	}

	return response.json();
}

// Optimized React Query Hooks with better caching
export function useDashboardData(userId: string) {
	return useQuery({
		queryKey: queryKeys.dashboard(userId),
		queryFn: () => fetchDashboardData(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
		retry: 3,
		retryDelay: (attemptIndex) =>
			Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}

export function useAIContent(userId: string) {
	return useQuery({
		queryKey: queryKeys.aiContent(userId),
		queryFn: () => fetchAIContent(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 10, // 10 minutes
		gcTime: 1000 * 60 * 60, // 1 hour
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
		retry: 2,
	});
}

export function useUserStats(userId: string) {
	return useQuery({
		queryKey: queryKeys.userStats(userId),
		queryFn: () => fetchUserStats(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 2, // 2 minutes
		gcTime: 1000 * 60 * 15, // 15 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function useAchievements(userId: string) {
	return useQuery({
		queryKey: queryKeys.achievements(userId),
		queryFn: () => fetchAchievements(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 30, // 30 minutes
		gcTime: 1000 * 60 * 60 * 2, // 2 hours
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function useChallenges() {
	return useQuery({
		queryKey: queryKeys.challenges(),
		queryFn: fetchChallenges,
		staleTime: 1000 * 60 * 15, // 15 minutes
		gcTime: 1000 * 60 * 60, // 1 hour
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function useLeaderboard() {
	return useQuery({
		queryKey: queryKeys.leaderboard(),
		queryFn: fetchLeaderboard,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function useWeeklyChallengeProgress(userId: string) {
	return useQuery({
		queryKey: queryKeys.weeklyProgress(userId),
		queryFn: () => fetchWeeklyChallengeProgress(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 2, // 2 minutes
		gcTime: 1000 * 60 * 15, // 15 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function useJoinChallenge() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: joinChallenge,
		onSuccess: (data, variables) => {
			// Invalidate and refetch related queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.challenges(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.weeklyProgress(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard(
					variables.userId
				),
			});

			toast.success('Successfully joined challenge!');
		},
		onError: (error) => {
			toast.error(
				error.message || 'Failed to join challenge'
			);
		},
	});
}

export function useCompleteChallenge() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: completeChallenge,
		onSuccess: (data, variables) => {
			// Invalidate and refetch related queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.challenges(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.weeklyProgress(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.achievements(
					variables.userId
				),
			});

			toast.success('Challenge completed!');
		},
		onError: (error) => {
			toast.error(
				error.message ||
					'Failed to complete challenge'
			);
		},
	});
}

export function useLogWorkout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logWorkout,
		onSuccess: (data, variables) => {
			// Invalidate and refetch related queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.userStats(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.weeklyProgress(
					variables.userId
				),
			});

			toast.success('Workout logged successfully!');
		},
		onError: (error) => {
			toast.error(
				error.message || 'Failed to log workout'
			);
		},
	});
}

export function useLogMeal() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logMeal,
		onSuccess: (data, variables) => {
			// Invalidate and refetch related queries
			queryClient.invalidateQueries({
				queryKey: queryKeys.dashboard(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.userStats(
					variables.userId
				),
			});

			toast.success('Meal logged successfully!');
		},
		onError: (error) => {
			toast.error(
				error.message || 'Failed to log meal'
			);
		},
	});
}
