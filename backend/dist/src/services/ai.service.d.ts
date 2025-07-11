interface UserProfile {
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    fitnessGoals?: string[];
    primaryGoal?: string;
    fitnessLevel?: string;
    dietaryPreferences?: string[];
    bodyFatPercentage?: number;
    workoutFrequency?: number;
}
interface MealRecommendation {
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
}
interface WorkoutRecommendation {
    id: string;
    name: string;
    duration: number;
    type: string;
    difficulty: string;
    description: string;
    exercises: string[];
    targetMuscles: string[];
}
export declare class AIService {
    private readonly openRouterApiKey;
    private readonly openRouterBaseUrl;
    constructor();
    generatePersonalizedMeals(user: UserProfile): Promise<MealRecommendation[]>;
    generatePersonalizedWorkouts(user: UserProfile): Promise<WorkoutRecommendation[]>;
    generateMotivationalQuote(goal?: string): Promise<string>;
    private buildNutritionPrompt;
    private buildWorkoutPrompt;
    private formatUserInfo;
    private callOpenRouter;
    private parseMealResponse;
    private parseWorkoutResponse;
    private getFallbackMeals;
    private getFallbackWorkouts;
    private getFallbackQuote;
}
export {};
