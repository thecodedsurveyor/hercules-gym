import { AIService } from '../../services/ai.service';
interface Achievement {
    id: string;
    name: string;
    description: string;
    points: number;
    earnedAt: Date;
}
export declare class DashboardService {
    private readonly aiService;
    constructor(aiService: AIService);
    getUserDashboardData(userId: string): Promise<any>;
    private generatePersonalWorkouts;
    joinChallenge(userId: string, challengeId: string, challengeType: 'daily' | 'weekly'): Promise<{
        id: string;
        createdAt: Date;
        completed: boolean;
        completedAt: Date | null;
        progress: number;
        pointsEarned: number;
        userId: string;
        dailyChallengeId: string | null;
        weeklyChallengeId: string | null;
    }>;
    completeChallenge(userId: string, challengeEntryId: string): Promise<{
        id: string;
        createdAt: Date;
        completed: boolean;
        completedAt: Date | null;
        progress: number;
        pointsEarned: number;
        userId: string;
        dailyChallengeId: string | null;
        weeklyChallengeId: string | null;
    }>;
    getLeaderboard(): Promise<{
        rank: number;
        name: string;
        points: number;
        streak: number;
    }[]>;
    createSampleChallenges(): Promise<{
        message: string;
    }>;
    getChallenges(): Promise<{
        daily: {
            id: string;
            title: string;
            description: string;
            points: number;
            type: string;
            targetValue: number | null;
            date: Date;
            isActive: boolean;
            createdAt: Date;
        }[];
        weekly: {
            id: string;
            title: string;
            description: string;
            points: number;
            type: string;
            targetValue: number;
            isActive: boolean;
            createdAt: Date;
            startDate: Date;
            endDate: Date;
        }[];
    }>;
    private generatePersonalizedMeals;
    getDashboardOverview(userId: string): Promise<any>;
    getUserStats(userId: string): Promise<{
        totalWorkouts: number;
        totalCaloriesBurned: number;
        currentStreak: number;
        longestStreak: number;
        totalPoints: number;
    }>;
    getAIContent(userId: string): Promise<any>;
    getUserAchievements(userId: string): Promise<{
        id: string;
        name: string;
        description: string;
        points: number;
        earnedAt: Date;
    }[]>;
    logWorkout(workoutData: any): Promise<{
        id: string;
        completedAt: Date;
        userId: string;
        workoutName: string;
        duration: number;
        caloriesBurned: number | null;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        notes: string | null;
        workoutPlanId: string | null;
    }>;
    logMeal(mealData: any): Promise<{
        id: string;
        userId: string;
        notes: string | null;
        calories: number;
        mealName: string;
        mealType: string;
        protein: number | null;
        carbs: number | null;
        fats: number | null;
        loggedAt: Date;
        mealId: string | null;
    }>;
    private getMotivationalQuote;
    getWeeklyChallengeProgress(userId: string): Promise<{
        hasActiveChallenge: boolean;
        challenge: null;
        progress: null;
    } | {
        hasActiveChallenge: boolean;
        challenge: {
            id: string;
            title: string;
            description: string;
            type: string;
            targetValue: number;
            points: number;
            startDate: Date;
            endDate: Date;
        };
        progress: {
            current: number;
            target: number;
            percentage: number;
            isCompleted: boolean;
            daysRemaining: number;
            isJoined: boolean;
            completedAt: Date | null | undefined;
            dailyBreakdown: any[];
        };
    }>;
    private generateWeeklyBreakdown;
    updateWeeklyChallengeProgress(userId: string, activityType: 'workout' | 'meal'): Promise<{
        message: string;
        challengeCompleted?: undefined;
        pointsAwarded?: undefined;
        progress?: undefined;
        achievements?: undefined;
    } | {
        message: string;
        challengeCompleted: boolean;
        pointsAwarded: number;
        progress: {
            current: number;
            target: number;
            percentage: number;
            isCompleted: boolean;
            daysRemaining: number;
            isJoined: boolean;
            completedAt: Date | null | undefined;
            dailyBreakdown: any[];
        };
        achievements: Achievement[];
    } | {
        message: string;
        challengeCompleted: boolean;
        progress: {
            current: number;
            target: number;
            percentage: number;
            isCompleted: boolean;
            daysRemaining: number;
            isJoined: boolean;
            completedAt: Date | null | undefined;
            dailyBreakdown: any[];
        };
        pointsAwarded?: undefined;
        achievements?: undefined;
    }>;
    private checkWeeklyChallengeAchievements;
    private awardAchievement;
}
export {};
