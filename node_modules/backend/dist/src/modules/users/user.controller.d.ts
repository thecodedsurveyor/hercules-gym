import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import { OnboardingDto } from './dto/onboarding.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    registerUser(registerData: RegisterUserDto): Promise<User>;
    saveOnboarding(onboardingData: OnboardingDto): Promise<User>;
    loginUser(loginData: LoginDto): Promise<{
        user: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            fitnessGoal: string | null;
            experienceLevel: string | null;
            preferredTime: string | null;
            onboardingCompleted: boolean;
            onboardingStep: number;
            updatedAt: Date;
            age: number | null;
            gender: string | null;
            height: number | null;
            weight: number | null;
            fitnessGoals: string[];
            goalPriority: string[];
            primaryGoal: string | null;
            fitnessLevel: string | null;
            workoutFrequency: number | null;
            bodyFatPercentage: number | null;
            measurements: import("@prisma/client/runtime/library").JsonValue | null;
            dietaryPreferences: string[];
            totalPoints: number;
            currentStreak: number;
            longestStreak: number;
            totalWorkouts: number;
            totalCaloriesBurned: number;
            weeklyWorkoutGoal: number;
            lastActivityDate: Date | null;
            lastLogin: Date | null;
            totalLogins: number;
        };
        token: string;
        streak: {
            current: number;
            longest: number;
            achievements: string[];
        };
    }>;
    createUser(userData: any): Promise<User>;
    getUser(id: string): Promise<User | null>;
    updateUser(id: string, userData: any): Promise<User>;
    deleteUser(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
