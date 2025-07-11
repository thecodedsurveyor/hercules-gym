"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../lib/prisma");
const user_service_1 = require("../users/user.service");
const ai_service_1 = require("../../services/ai.service");
let DashboardService = class DashboardService {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async getUserDashboardData(userId) {
        const user = await (0, user_service_1.getUser)(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        const recentWorkouts = await prisma_1.default.workoutLog.findMany({
            where: { userId },
            orderBy: { completedAt: 'desc' },
            take: 5,
        });
        const weeklyWorkouts = await prisma_1.default.workoutLog.count({
            where: {
                userId,
                completedAt: {
                    gte: startOfWeek,
                    lte: endOfWeek,
                },
            },
        });
        const recentMeals = await prisma_1.default.mealLog.findMany({
            where: { userId },
            orderBy: { loggedAt: 'desc' },
            take: 5,
        });
        const activeChallenges = await prisma_1.default.challengeEntry.findMany({
            where: {
                userId,
                completed: false,
            },
            include: {
                dailyChallenge: true,
                weeklyChallenge: true,
            },
            take: 3,
        });
        const recentAchievements = await prisma_1.default.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { earnedAt: 'desc' },
            take: 3,
        });
        const userProfile = {
            age: user.age ?? undefined,
            gender: user.gender ?? undefined,
            height: user.height ?? undefined,
            weight: user.weight ?? undefined,
            fitnessGoals: user.fitnessGoals || [],
            primaryGoal: user.primaryGoal ?? undefined,
            fitnessLevel: user.fitnessLevel ?? undefined,
            dietaryPreferences: user.dietaryPreferences || [],
            bodyFatPercentage: user.bodyFatPercentage ?? undefined,
            workoutFrequency: user.weeklyWorkoutGoal ?? undefined,
        };
        const personalizedWorkouts = await this.aiService.generatePersonalizedWorkouts(userProfile);
        const personalizedMeals = await this.aiService.generatePersonalizedMeals(userProfile);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                fitnessGoals: user.fitnessGoals,
                primaryGoal: user.primaryGoal,
                fitnessLevel: user.fitnessLevel,
                dietaryPreferences: user.dietaryPreferences,
                totalPoints: user.totalPoints,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
                weeklyWorkoutGoal: user.weeklyWorkoutGoal,
            },
            stats: {
                weeklyWorkouts,
                totalWorkouts: user.totalWorkouts,
                totalCaloriesBurned: user.totalCaloriesBurned,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
                totalPoints: user.totalPoints,
            },
            recentWorkouts: recentWorkouts.map((workout) => ({
                id: workout.id,
                name: workout.workoutName,
                duration: workout.duration,
                calories: workout.caloriesBurned,
                completedAt: workout.completedAt,
            })),
            recentMeals: recentMeals.map((meal) => ({
                id: meal.id,
                name: meal.mealName,
                type: meal.mealType,
                calories: meal.calories,
                loggedAt: meal.loggedAt,
            })),
            activeChallenges: activeChallenges.map((entry) => ({
                id: entry.id,
                title: entry.dailyChallenge?.title || entry.weeklyChallenge?.title,
                description: entry.dailyChallenge?.description ||
                    entry.weeklyChallenge?.description,
                progress: entry.progress,
                target: entry.dailyChallenge?.targetValue ||
                    entry.weeklyChallenge?.targetValue,
                points: entry.dailyChallenge?.points || entry.weeklyChallenge?.points,
                type: entry.dailyChallenge ? 'daily' : 'weekly',
            })),
            recentAchievements: recentAchievements.map((userAch) => ({
                id: userAch.id,
                name: userAch.achievement.name,
                description: userAch.achievement.description,
                points: userAch.achievement.points,
                earnedAt: userAch.earnedAt,
            })),
            recommendations: {
                workouts: personalizedWorkouts,
                meals: personalizedMeals,
            },
        };
    }
    generatePersonalWorkouts(user) {
        const workouts = [];
        const goals = user.fitnessGoals || [];
        const level = user.fitnessLevel || 'beginner';
        if (goals.includes('weight-loss') || goals.includes('fat-loss')) {
            workouts.push({
                id: 'hiit-cardio',
                name: 'HIIT Fat Burn',
                duration: level === 'beginner' ? 15 : level === 'intermediate' ? 25 : 35,
                type: 'cardio',
                difficulty: level,
                description: 'High-intensity interval training to maximize fat burn',
                exercises: [
                    'Jump squats',
                    'Burpees',
                    'Mountain climbers',
                    'High knees',
                ],
            });
        }
        if (goals.includes('muscle-gain') || goals.includes('strength')) {
            workouts.push({
                id: 'strength-upper',
                name: 'Upper Body Strength',
                duration: level === 'beginner' ? 30 : level === 'intermediate' ? 45 : 60,
                type: 'strength',
                difficulty: level,
                description: 'Build upper body muscle and strength',
                exercises: ['Push-ups', 'Pull-ups', 'Dumbbell rows', 'Shoulder press'],
            });
        }
        if (goals.includes('endurance') || goals.includes('cardiovascular')) {
            workouts.push({
                id: 'cardio-endurance',
                name: 'Endurance Builder',
                duration: level === 'beginner' ? 20 : level === 'intermediate' ? 35 : 50,
                type: 'cardio',
                difficulty: level,
                description: 'Improve cardiovascular endurance and stamina',
                exercises: ['Jogging', 'Cycling', 'Rowing', 'Step-ups'],
            });
        }
        if (workouts.length === 0) {
            workouts.push({
                id: 'full-body',
                name: 'Full Body Workout',
                duration: 30,
                type: 'mixed',
                difficulty: level,
                description: 'Complete full-body workout for overall fitness',
                exercises: ['Squats', 'Push-ups', 'Planks', 'Lunges'],
            });
        }
        return workouts;
    }
    async joinChallenge(userId, challengeId, challengeType) {
        const existingEntry = await prisma_1.default.challengeEntry.findFirst({
            where: {
                userId,
                ...(challengeType === 'daily'
                    ? { dailyChallengeId: challengeId }
                    : { weeklyChallengeId: challengeId }),
            },
        });
        if (existingEntry) {
            throw new Error('Already joined this challenge');
        }
        const challengeEntry = await prisma_1.default.challengeEntry.create({
            data: {
                userId,
                ...(challengeType === 'daily'
                    ? { dailyChallengeId: challengeId }
                    : { weeklyChallengeId: challengeId }),
                progress: 0,
                completed: false,
            },
        });
        return challengeEntry;
    }
    async completeChallenge(userId, challengeEntryId) {
        const entry = await prisma_1.default.challengeEntry.findUnique({
            where: { id: challengeEntryId },
            include: {
                dailyChallenge: true,
                weeklyChallenge: true,
                user: true,
            },
        });
        if (!entry || entry.userId !== userId) {
            throw new Error('Challenge entry not found');
        }
        if (entry.completed) {
            throw new Error('Challenge already completed');
        }
        const points = entry.dailyChallenge?.points || entry.weeklyChallenge?.points || 0;
        const updatedEntry = await prisma_1.default.challengeEntry.update({
            where: { id: challengeEntryId },
            data: {
                completed: true,
                completedAt: new Date(),
                progress: entry.dailyChallenge?.targetValue ||
                    entry.weeklyChallenge?.targetValue ||
                    1,
                pointsEarned: points,
            },
        });
        await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                totalPoints: (entry.user.totalPoints || 0) + points,
            },
        });
        return updatedEntry;
    }
    async getLeaderboard() {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                totalPoints: true,
                currentStreak: true,
            },
            where: {
                onboardingCompleted: true,
            },
            orderBy: {
                totalPoints: 'desc',
            },
            take: 10,
        });
        return users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            points: user.totalPoints || 0,
            streak: user.currentStreak || 0,
        }));
    }
    async createSampleChallenges() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingDaily = await prisma_1.default.dailyChallenge.findFirst({
            where: {
                date: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                },
            },
        });
        if (!existingDaily) {
            await prisma_1.default.dailyChallenge.create({
                data: {
                    title: '15-Minute HIIT',
                    description: 'Complete a 15-minute high-intensity interval training session',
                    points: 50,
                    type: 'workout',
                    targetValue: 1,
                    date: today,
                    isActive: true,
                },
            });
        }
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const existingWeekly = await prisma_1.default.weeklyChallenge.findFirst({
            where: {
                startDate: {
                    lte: today,
                },
                endDate: {
                    gte: today,
                },
            },
        });
        if (!existingWeekly) {
            await prisma_1.default.weeklyChallenge.create({
                data: {
                    title: 'Week Warrior',
                    description: 'Complete 4 workouts this week',
                    points: 200,
                    type: 'workout',
                    targetValue: 4,
                    startDate: startOfWeek,
                    endDate: endOfWeek,
                    isActive: true,
                },
            });
        }
        return { message: 'Sample challenges created successfully' };
    }
    async getChallenges() {
        const dailyChallenges = await prisma_1.default.dailyChallenge.findMany({
            where: { isActive: true },
            orderBy: { date: 'desc' },
        });
        const weeklyChallenges = await prisma_1.default.weeklyChallenge.findMany({
            where: { isActive: true },
            orderBy: { startDate: 'desc' },
        });
        return {
            daily: dailyChallenges,
            weekly: weeklyChallenges,
        };
    }
    generatePersonalizedMeals(user) {
        const meals = [];
        const preferences = user.dietaryPreferences || [];
        const goals = user.fitnessGoals || [];
        if (preferences.includes('vegan')) {
            meals.push({
                id: 'vegan-breakfast',
                name: 'Vegan Power Bowl',
                type: 'breakfast',
                calories: 350,
                protein: 15,
                description: 'Quinoa, berries, nuts, and plant-based protein',
                ingredients: ['Quinoa', 'Mixed berries', 'Almonds', 'Chia seeds'],
            });
        }
        else if (preferences.includes('keto')) {
            meals.push({
                id: 'keto-breakfast',
                name: 'Keto Avocado Eggs',
                type: 'breakfast',
                calories: 400,
                protein: 20,
                description: 'Eggs cooked in avocado with cheese',
                ingredients: ['Avocado', 'Eggs', 'Cheese', 'Bacon'],
            });
        }
        else {
            meals.push({
                id: 'protein-breakfast',
                name: 'Protein Pancakes',
                type: 'breakfast',
                calories: 300,
                protein: 25,
                description: 'High-protein pancakes with berries',
                ingredients: ['Protein powder', 'Eggs', 'Oats', 'Berries'],
            });
        }
        if (goals.includes('muscle-gain')) {
            meals.push({
                id: 'muscle-lunch',
                name: 'Lean Muscle Bowl',
                type: 'lunch',
                calories: 500,
                protein: 40,
                description: 'Chicken, rice, and vegetables for muscle growth',
                ingredients: [
                    'Chicken breast',
                    'Brown rice',
                    'Broccoli',
                    'Sweet potato',
                ],
            });
        }
        else if (goals.includes('weight-loss')) {
            meals.push({
                id: 'weightloss-lunch',
                name: 'Mediterranean Salad',
                type: 'lunch',
                calories: 350,
                protein: 20,
                description: 'Fresh salad with lean protein and healthy fats',
                ingredients: [
                    'Mixed greens',
                    'Grilled chicken',
                    'Olive oil',
                    'Feta cheese',
                ],
            });
        }
        if (preferences.includes('vegetarian')) {
            meals.push({
                id: 'vegetarian-dinner',
                name: 'Veggie Stir Fry',
                type: 'dinner',
                calories: 400,
                protein: 18,
                description: 'Colorful vegetable stir-fry with tofu',
                ingredients: ['Tofu', 'Mixed vegetables', 'Brown rice', 'Soy sauce'],
            });
        }
        else {
            meals.push({
                id: 'balanced-dinner',
                name: 'Balanced Plate',
                type: 'dinner',
                calories: 450,
                protein: 30,
                description: 'Perfect balance of protein, carbs, and vegetables',
                ingredients: ['Salmon', 'Quinoa', 'Asparagus', 'Lemon'],
            });
        }
        return meals;
    }
    async getDashboardOverview(userId) {
        return this.getUserDashboardData(userId);
    }
    async getUserStats(userId) {
        const user = await (0, user_service_1.getUser)(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            totalWorkouts: user.totalWorkouts || 0,
            totalCaloriesBurned: user.totalCaloriesBurned || 0,
            currentStreak: user.currentStreak || 0,
            longestStreak: user.longestStreak || 0,
            totalPoints: user.totalPoints || 0,
        };
    }
    async getAIContent(userId) {
        const user = await (0, user_service_1.getUser)(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userProfile = {
            age: user.age ?? undefined,
            gender: user.gender ?? undefined,
            height: user.height ?? undefined,
            weight: user.weight ?? undefined,
            fitnessGoals: user.fitnessGoals || [],
            primaryGoal: user.primaryGoal ?? undefined,
            fitnessLevel: user.fitnessLevel ?? undefined,
            dietaryPreferences: user.dietaryPreferences || [],
            bodyFatPercentage: user.bodyFatPercentage ?? undefined,
            workoutFrequency: user.weeklyWorkoutGoal ?? undefined,
        };
        const personalizedWorkouts = await this.aiService.generatePersonalizedWorkouts(userProfile);
        const personalizedMeals = await this.aiService.generatePersonalizedMeals(userProfile);
        const motivationalQuote = await this.aiService.generateMotivationalQuote(user.primaryGoal ?? undefined);
        return {
            workouts: personalizedWorkouts,
            meals: personalizedMeals,
            motivationalQuote,
        };
    }
    async getUserAchievements(userId) {
        const achievements = await prisma_1.default.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { earnedAt: 'desc' },
        });
        return achievements.map((userAch) => ({
            id: userAch.id,
            name: userAch.achievement.name,
            description: userAch.achievement.description,
            points: userAch.achievement.points,
            earnedAt: userAch.earnedAt,
        }));
    }
    async logWorkout(workoutData) {
        const { userId, workoutName, duration, caloriesBurned } = workoutData;
        const workoutLog = await prisma_1.default.workoutLog.create({
            data: {
                userId,
                workoutName,
                duration,
                caloriesBurned,
                exercises: workoutData.exercises || [],
                notes: workoutData.notes,
            },
        });
        await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                totalWorkouts: { increment: 1 },
                totalCaloriesBurned: { increment: caloriesBurned || 0 },
                totalPoints: { increment: 25 },
            },
        });
        return workoutLog;
    }
    async logMeal(mealData) {
        const { userId, mealName, mealType, calories } = mealData;
        const mealLog = await prisma_1.default.mealLog.create({
            data: {
                userId,
                mealName,
                mealType,
                calories,
                protein: mealData.protein,
                carbs: mealData.carbs,
                fats: mealData.fats,
                notes: mealData.notes,
            },
        });
        return mealLog;
    }
    getMotivationalQuote(goal) {
        const quotes = {
            'weight-loss': 'Every step counts towards your weight loss goal!',
            'muscle-gain': "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
            endurance: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
            default: 'Your only limit is your mind. Push beyond it!',
        };
        return quotes[goal] || quotes.default;
    }
    async getWeeklyChallengeProgress(userId) {
        const user = await (0, user_service_1.getUser)(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const activeWeeklyChallenge = await prisma_1.default.weeklyChallenge.findFirst({
            where: {
                isActive: true,
                startDate: { lte: new Date() },
                endDate: { gte: new Date() },
            },
        });
        if (!activeWeeklyChallenge) {
            return {
                hasActiveChallenge: false,
                challenge: null,
                progress: null,
            };
        }
        const challengeEntry = await prisma_1.default.challengeEntry.findFirst({
            where: {
                userId,
                weeklyChallengeId: activeWeeklyChallenge.id,
            },
        });
        let currentProgress = 0;
        let dailyBreakdown = [];
        if (challengeEntry) {
            if (activeWeeklyChallenge.type === 'workout') {
                const workouts = await prisma_1.default.workoutLog.findMany({
                    where: {
                        userId,
                        completedAt: {
                            gte: activeWeeklyChallenge.startDate,
                            lte: activeWeeklyChallenge.endDate,
                        },
                    },
                    orderBy: { completedAt: 'asc' },
                });
                currentProgress = workouts.length;
                dailyBreakdown = this.generateWeeklyBreakdown(activeWeeklyChallenge.startDate, activeWeeklyChallenge.endDate, workouts, 'workout');
            }
            else if (activeWeeklyChallenge.type === 'calories') {
                const workouts = await prisma_1.default.workoutLog.findMany({
                    where: {
                        userId,
                        completedAt: {
                            gte: activeWeeklyChallenge.startDate,
                            lte: activeWeeklyChallenge.endDate,
                        },
                    },
                });
                currentProgress = workouts.reduce((total, workout) => total + (workout.caloriesBurned || 0), 0);
                dailyBreakdown = this.generateWeeklyBreakdown(activeWeeklyChallenge.startDate, activeWeeklyChallenge.endDate, workouts, 'calories');
            }
        }
        const progressPercentage = Math.min((currentProgress / activeWeeklyChallenge.targetValue) * 100, 100);
        const isCompleted = currentProgress >= activeWeeklyChallenge.targetValue;
        const daysRemaining = Math.max(0, Math.ceil((activeWeeklyChallenge.endDate.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)));
        return {
            hasActiveChallenge: true,
            challenge: {
                id: activeWeeklyChallenge.id,
                title: activeWeeklyChallenge.title,
                description: activeWeeklyChallenge.description,
                type: activeWeeklyChallenge.type,
                targetValue: activeWeeklyChallenge.targetValue,
                points: activeWeeklyChallenge.points,
                startDate: activeWeeklyChallenge.startDate,
                endDate: activeWeeklyChallenge.endDate,
            },
            progress: {
                current: currentProgress,
                target: activeWeeklyChallenge.targetValue,
                percentage: Math.round(progressPercentage),
                isCompleted,
                daysRemaining,
                isJoined: !!challengeEntry,
                completedAt: challengeEntry?.completedAt,
                dailyBreakdown,
            },
        };
    }
    generateWeeklyBreakdown(startDate, endDate, activities, type) {
        const breakdown = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayStart = new Date(currentDate);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(23, 59, 59, 999);
            const dayActivities = activities.filter((activity) => {
                const activityDate = activity.createdAt
                    ? new Date(activity.createdAt)
                    : new Date();
                return activityDate >= dayStart && activityDate <= dayEnd;
            });
            let dayValue = 0;
            if (type === 'workout') {
                dayValue = dayActivities.length;
            }
            else if (type === 'calories') {
                dayValue = dayActivities.reduce((total, activity) => total + (activity.caloriesBurned || 0), 0);
            }
            breakdown.push({
                date: new Date(currentDate),
                dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
                value: dayValue,
                activities: dayActivities.map((activity) => ({
                    id: activity.id,
                    name: activity.workoutName || 'Activity',
                    value: type === 'workout' ? 1 : activity.caloriesBurned || 0,
                    time: activity.createdAt,
                })),
                isToday: dayStart.toDateString() === new Date().toDateString(),
                isCompleted: dayValue > 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return breakdown;
    }
    async updateWeeklyChallengeProgress(userId, activityType) {
        const activeWeeklyChallenge = await prisma_1.default.weeklyChallenge.findFirst({
            where: {
                isActive: true,
                startDate: { lte: new Date() },
                endDate: { gte: new Date() },
                type: activityType === 'workout' ? 'workout' : 'calories',
            },
        });
        if (!activeWeeklyChallenge) {
            return { message: 'No active weekly challenge found' };
        }
        const challengeEntry = await prisma_1.default.challengeEntry.findFirst({
            where: {
                userId,
                weeklyChallengeId: activeWeeklyChallenge.id,
            },
        });
        if (!challengeEntry) {
            return { message: 'User has not joined this challenge' };
        }
        const progressData = await this.getWeeklyChallengeProgress(userId);
        if (!progressData.progress) {
            return { message: 'Could not calculate progress' };
        }
        if (progressData.progress.isCompleted && !challengeEntry.completedAt) {
            await prisma_1.default.challengeEntry.update({
                where: { id: challengeEntry.id },
                data: {
                    completedAt: new Date(),
                    completed: true,
                },
            });
            await prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    totalPoints: { increment: activeWeeklyChallenge.points },
                },
            });
            const achievements = await this.checkWeeklyChallengeAchievements(userId);
            return {
                message: 'Weekly challenge completed!',
                challengeCompleted: true,
                pointsAwarded: activeWeeklyChallenge.points,
                progress: progressData.progress,
                achievements,
            };
        }
        return {
            message: 'Progress updated',
            challengeCompleted: false,
            progress: progressData.progress,
        };
    }
    async checkWeeklyChallengeAchievements(userId) {
        const achievements = [];
        const completedWeeklyChallenges = await prisma_1.default.challengeEntry.count({
            where: {
                userId,
                completed: true,
                weeklyChallengeId: { not: null },
            },
        });
        if (completedWeeklyChallenges === 1) {
            const achievement = await this.awardAchievement(userId, {
                name: 'Weekly Warrior',
                description: 'Complete your first weekly challenge',
                points: 100,
                badgeIcon: '🏆',
                category: 'challenge',
            });
            if (achievement) {
                achievements.push(achievement);
            }
        }
        else if (completedWeeklyChallenges === 5) {
            const achievement = await this.awardAchievement(userId, {
                name: 'Challenge Master',
                description: 'Complete 5 weekly challenges',
                points: 500,
                badgeIcon: '👑',
                category: 'challenge',
            });
            if (achievement) {
                achievements.push(achievement);
            }
        }
        return achievements;
    }
    async awardAchievement(userId, achievementData) {
        try {
            const existingAchievement = await prisma_1.default.achievement.findFirst({
                where: {
                    name: achievementData.name,
                },
            });
            let achievementId;
            if (existingAchievement) {
                achievementId = existingAchievement.id;
            }
            else {
                const newAchievement = await prisma_1.default.achievement.create({
                    data: {
                        name: achievementData.name,
                        description: achievementData.description,
                        points: achievementData.points,
                        badgeIcon: achievementData.badgeIcon,
                        category: achievementData.category,
                    },
                });
                achievementId = newAchievement.id;
            }
            const existingUserAchievement = await prisma_1.default.userAchievement.findFirst({
                where: {
                    userId,
                    achievementId,
                },
            });
            if (existingUserAchievement) {
                return null;
            }
            const userAchievement = await prisma_1.default.userAchievement.create({
                data: {
                    userId,
                    achievementId,
                },
                include: {
                    achievement: true,
                },
            });
            await prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    totalPoints: { increment: achievementData.points },
                },
            });
            return {
                id: userAchievement.id,
                name: userAchievement.achievement.name,
                description: userAchievement.achievement.description,
                points: userAchievement.achievement.points,
                earnedAt: userAchievement.earnedAt,
            };
        }
        catch (error) {
            console.error('Error awarding achievement:', error);
            return null;
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map