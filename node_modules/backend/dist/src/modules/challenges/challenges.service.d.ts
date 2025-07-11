export declare class ChallengesService {
    getDailyChallenges(userId: string): Promise<{
        userEntry: {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        };
        isJoined: boolean;
        isCompleted: boolean;
        challengeEntries: {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        }[];
        id: string;
        title: string;
        description: string;
        points: number;
        type: string;
        targetValue: number | null;
        date: Date;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    getWeeklyChallenges(userId: string): Promise<{
        userEntry: {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        };
        isJoined: boolean;
        isCompleted: boolean;
        progress: number;
        progressPercentage: number;
        challengeEntries: {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        }[];
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
    }[]>;
    joinChallenge(challengeData: any): Promise<{
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
    completeChallenge(completionData: any): Promise<{
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
    getUserChallenges(userId: string): Promise<{
        active: ({
            dailyChallenge: {
                id: string;
                title: string;
                description: string;
                points: number;
                type: string;
                targetValue: number | null;
                date: Date;
                isActive: boolean;
                createdAt: Date;
            } | null;
            weeklyChallenge: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        })[];
        completed: ({
            dailyChallenge: {
                id: string;
                title: string;
                description: string;
                points: number;
                type: string;
                targetValue: number | null;
                date: Date;
                isActive: boolean;
                createdAt: Date;
            } | null;
            weeklyChallenge: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            completed: boolean;
            completedAt: Date | null;
            progress: number;
            pointsEarned: number;
            userId: string;
            dailyChallengeId: string | null;
            weeklyChallengeId: string | null;
        })[];
        totalPointsEarned: number;
    }>;
    createDailyChallenge(challengeData: any): Promise<{
        id: string;
        title: string;
        description: string;
        points: number;
        type: string;
        targetValue: number | null;
        date: Date;
        isActive: boolean;
        createdAt: Date;
    }>;
    createWeeklyChallenge(challengeData: any): Promise<{
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
    }>;
}
