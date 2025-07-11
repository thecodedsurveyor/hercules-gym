import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    private get service();
    getDashboardOverview(userId: string): Promise<any>;
    getUserDashboardData(userId: string): Promise<any>;
    getUserStats(userId: string): Promise<any>;
    getAIContent(userId: string): Promise<any>;
    getUserAchievements(userId: string): Promise<any>;
    getLeaderboard(): Promise<any>;
    logWorkout(workoutData: any): Promise<any>;
    logMeal(mealData: any): Promise<any>;
    joinChallenge(data: {
        userId: string;
        challengeId: string;
        challengeType: 'daily' | 'weekly';
    }): Promise<any>;
    completeChallenge(data: {
        userId: string;
        challengeEntryId: string;
    }): Promise<any>;
    createSampleChallenges(): Promise<any>;
    getChallenges(): Promise<any>;
    getWeeklyChallengeProgress(userId: string): Promise<any>;
    updateWeeklyChallengeProgress(data: {
        userId: string;
        activityType: 'workout' | 'meal';
        activityData: any;
    }): Promise<any>;
}
