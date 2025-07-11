export declare class OnboardingDto {
    userId: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    fitnessGoals: string[];
    goalPriority: string[];
    primaryGoal: string;
    fitnessLevel: string;
    activityLevel: string;
    workoutFrequency: number;
    bodyFatPercentage?: number;
    measurements?: {
        waist?: number;
        chest?: number;
        arms?: number;
        thighs?: number;
    };
    dietaryPreferences?: string[];
    onboardingCompleted: boolean;
}
