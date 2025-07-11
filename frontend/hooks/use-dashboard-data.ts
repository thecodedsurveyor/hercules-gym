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
		primaryGoal?: string;
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

// Query Keys
export const dashboardKeys = {
	all: ['dashboard'] as const,
	user: (userId: string) =>
		[...dashboardKeys.all, 'user', userId] as const,
	stats: (userId: string) =>
		[...dashboardKeys.all, 'stats', userId] as const,
	aiContent: (userId: string) =>
		[
			...dashboardKeys.all,
			'ai-content',
			userId,
		] as const,
	achievements: (userId: string) =>
		[
			...dashboardKeys.all,
			'achievements',
			userId,
		] as const,
	challenges: () =>
		[...dashboardKeys.all, 'challenges'] as const,
	leaderboard: () =>
		[...dashboardKeys.all, 'leaderboard'] as const,
	weeklyProgress: (userId: string) =>
		[
			...dashboardKeys.all,
			'weekly-progress',
			userId,
		] as const,
};

// API Functions
async function fetchDashboardData(
	userId: string
): Promise<DashboardData> {
	const response = await fetch(
		`${API_BASE}/dashboard/user-data/${userId}`
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
		`${API_BASE}/dashboard/ai-content/${userId}`
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
		`${API_BASE}/dashboard/stats/${userId}`
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
		`${API_BASE}/dashboard/achievements/${userId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch achievements');
	}
	return response.json();
}

async function fetchChallenges(): Promise<Challenge[]> {
	const response = await fetch(
		`${API_BASE}/dashboard/challenges`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch challenges');
	}
	return response.json();
}

async function fetchLeaderboard() {
	const response = await fetch(
		`${API_BASE}/dashboard/leaderboard`
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
		`${API_BASE}/dashboard/weekly-challenge-progress/${userId}`
	);
	if (!response.ok) {
		throw new Error(
			'Failed to fetch weekly challenge progress'
		);
	}
	return response.json();
}

async function joinChallenge(data: {
	userId: string;
	challengeId: string;
	challengeType: 'daily' | 'weekly';
}) {
	const response = await fetch(
		`${API_BASE}/dashboard/join-challenge`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(
			error || 'Failed to join challenge'
		);
	}

	return response.json();
}

async function completeChallenge(data: {
	userId: string;
	challengeEntryId: string;
}) {
	const response = await fetch(
		`${API_BASE}/dashboard/complete-challenge`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(
			error || 'Failed to complete challenge'
		);
	}

	return response.json();
}

async function logWorkout(workoutData: any) {
	const response = await fetch(
		`${API_BASE}/dashboard/log-workout`,
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
		`${API_BASE}/dashboard/log-meal`,
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

// React Query Hooks
export function useDashboardData(userId: string) {
	return useQuery({
		queryKey: dashboardKeys.user(userId),
		queryFn: () => fetchDashboardData(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
}

export function useAIContent(userId: string) {
	return useQuery({
		queryKey: dashboardKeys.aiContent(userId),
		queryFn: () => fetchAIContent(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 10, // 10 minutes (AI content doesn't change often)
	});
}

export function useUserStats(userId: string) {
	return useQuery({
		queryKey: dashboardKeys.stats(userId),
		queryFn: () => fetchUserStats(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 1, // 1 minute
	});
}

export function useAchievements(userId: string) {
	return useQuery({
		queryKey: dashboardKeys.achievements(userId),
		queryFn: () => fetchAchievements(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}

export function useChallenges() {
	return useQuery({
		queryKey: dashboardKeys.challenges(),
		queryFn: fetchChallenges,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}

export function useLeaderboard() {
	return useQuery({
		queryKey: dashboardKeys.leaderboard(),
		queryFn: fetchLeaderboard,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
}

export function useWeeklyChallengeProgress(userId: string) {
	return useQuery({
		queryKey: dashboardKeys.weeklyProgress(userId),
		queryFn: () => fetchWeeklyChallengeProgress(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 1, // 1 minute
	});
}

// Mutation Hooks
export function useJoinChallenge() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: joinChallenge,
		onSuccess: (_, variables) => {
			toast.success(
				'Challenge joined successfully!',
				{
					description:
						'You can now start tracking your progress.',
				}
			);

			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.challenges(),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.user(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.weeklyProgress(
					variables.userId
				),
			});
		},
		onError: (error: Error) => {
			toast.error('Failed to join challenge', {
				description:
					error.message ||
					'Please try again later.',
			});
		},
	});
}

export function useCompleteChallenge() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: completeChallenge,
		onSuccess: (data, variables) => {
			toast.success('Challenge completed!', {
				description: `You earned ${data.pointsEarned || 0} points! 🎉`,
			});

			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.challenges(),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.user(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.stats(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.achievements(
					variables.userId
				),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.leaderboard(),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.weeklyProgress(
					variables.userId
				),
			});
		},
		onError: (error: Error) => {
			toast.error('Failed to complete challenge', {
				description:
					error.message ||
					'Please try again later.',
			});
		},
	});
}

export function useLogWorkout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logWorkout,
		onSuccess: (_, variables) => {
			toast.success('Workout logged successfully!', {
				description:
					'Your progress has been updated.',
			});

			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.all,
			});
		},
		onError: (error: Error) => {
			toast.error('Failed to log workout', {
				description:
					error.message ||
					'Please try again later.',
			});
		},
	});
}

export function useLogMeal() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logMeal,
		onSuccess: () => {
			toast.success('Meal logged successfully!', {
				description:
					'Your nutrition tracking has been updated.',
			});

			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: dashboardKeys.all,
			});
		},
		onError: (error: Error) => {
			toast.error('Failed to log meal', {
				description:
					error.message ||
					'Please try again later.',
			});
		},
	});
}
