/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '../../lib/prisma';
import { getUser } from '../users/user.service';
import { AIService } from '../../services/ai.service';

// Import the interfaces from AI service to fix export issues
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

// Removed unused interfaces - MealRecommendation and WorkoutRecommendation
// These were replaced by inline types in the methods that use them

interface DayBreakdown {
  date: Date;
  dayName: string;
  value: number;
  activities: { id: any; name: any; value: any; time: any }[];
  isToday: boolean;
  isCompleted: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  earnedAt: Date;
}

@Injectable()
export class DashboardService {
  constructor(private readonly aiService: AIService) {}

  async getUserDashboardData(userId: string): Promise<any> {
    // Get user data
    const user = await getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get today's date
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay()),
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6),
    );

    // Get recent workout logs
    const recentWorkouts = await prisma.workoutLog.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 5,
    });

    // Get this week's workout count
    const weeklyWorkouts = await prisma.workoutLog.count({
      where: {
        userId,
        completedAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    // Get recent meal logs
    const recentMeals = await prisma.mealLog.findMany({
      where: { userId },
      orderBy: { loggedAt: 'desc' },
      take: 5,
    });

    // Get active challenges
    const activeChallenges = await prisma.challengeEntry.findMany({
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

    // Get recent achievements
    const recentAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { earnedAt: 'desc' },
      take: 3,
    });

    // Transform user object to match UserProfile interface
    const userProfile: UserProfile = {
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

    // Generate personalized workouts using AI service
    const personalizedWorkouts =
      await this.aiService.generatePersonalizedWorkouts(userProfile);

    // Generate personalized meals using AI service
    const personalizedMeals =
      await this.aiService.generatePersonalizedMeals(userProfile);

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
        description:
          entry.dailyChallenge?.description ||
          entry.weeklyChallenge?.description,
        progress: entry.progress,
        target:
          entry.dailyChallenge?.targetValue ||
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

  private generatePersonalWorkouts(user: any) {
    const workouts: Array<{
      id: string;
      name: string;
      duration: number;
      type: string;
      difficulty: string;
      description: string;
      exercises: string[];
    }> = [];
    const goals = user.fitnessGoals || [];
    const level = user.fitnessLevel || 'beginner';

    if (goals.includes('weight-loss') || goals.includes('fat-loss')) {
      workouts.push({
        id: 'hiit-cardio',
        name: 'HIIT Fat Burn',
        duration:
          level === 'beginner' ? 15 : level === 'intermediate' ? 25 : 35,
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
        duration:
          level === 'beginner' ? 30 : level === 'intermediate' ? 45 : 60,
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
        duration:
          level === 'beginner' ? 20 : level === 'intermediate' ? 35 : 50,
        type: 'cardio',
        difficulty: level,
        description: 'Improve cardiovascular endurance and stamina',
        exercises: ['Jogging', 'Cycling', 'Rowing', 'Step-ups'],
      });
    }

    // Default workout if no specific goals
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

  async joinChallenge(
    userId: string,
    challengeId: string,
    challengeType: 'daily' | 'weekly',
  ) {
    // Check if user already joined this challenge
    const existingEntry = await prisma.challengeEntry.findFirst({
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

    // Create challenge entry
    const challengeEntry = await prisma.challengeEntry.create({
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

  async completeChallenge(userId: string, challengeEntryId: string) {
    // Get challenge entry
    const entry = await prisma.challengeEntry.findUnique({
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

    // Mark as completed
    const points =
      entry.dailyChallenge?.points || entry.weeklyChallenge?.points || 0;

    const updatedEntry = await prisma.challengeEntry.update({
      where: { id: challengeEntryId },
      data: {
        completed: true,
        completedAt: new Date(),
        progress:
          entry.dailyChallenge?.targetValue ||
          entry.weeklyChallenge?.targetValue ||
          1,
        pointsEarned: points,
      },
    });

    // Update user's total points
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: (entry.user.totalPoints || 0) + points,
      },
    });

    return updatedEntry;
  }

  async getLeaderboard() {
    const users = await prisma.user.findMany({
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
    // Create daily challenges if they don't exist
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingDaily = await prisma.dailyChallenge.findFirst({
      where: {
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (!existingDaily) {
      await prisma.dailyChallenge.create({
        data: {
          title: '15-Minute HIIT',
          description:
            'Complete a 15-minute high-intensity interval training session',
          points: 50,
          type: 'workout',
          targetValue: 1,
          date: today,
          isActive: true,
        },
      });
    }

    // Create weekly challenge if it doesn't exist
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const existingWeekly = await prisma.weeklyChallenge.findFirst({
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
      await prisma.weeklyChallenge.create({
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
    const dailyChallenges = await prisma.dailyChallenge.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' },
    });

    const weeklyChallenges = await prisma.weeklyChallenge.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'desc' },
    });

    return {
      daily: dailyChallenges,
      weekly: weeklyChallenges,
    };
  }

  private generatePersonalizedMeals(user: any) {
    const meals: Array<{
      id: string;
      name: string;
      type: string;
      calories: number;
      protein: number;
      description: string;
      ingredients: string[];
    }> = [];
    const preferences = user.dietaryPreferences || [];
    const goals = user.fitnessGoals || [];

    // Breakfast options
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
    } else if (preferences.includes('keto')) {
      meals.push({
        id: 'keto-breakfast',
        name: 'Keto Avocado Eggs',
        type: 'breakfast',
        calories: 400,
        protein: 20,
        description: 'Eggs cooked in avocado with cheese',
        ingredients: ['Avocado', 'Eggs', 'Cheese', 'Bacon'],
      });
    } else {
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

    // Lunch options based on goals
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
    } else if (goals.includes('weight-loss')) {
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

    // Dinner options
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
    } else {
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

  // Placeholder methods for controller compatibility
  async getDashboardOverview(userId: string) {
    return this.getUserDashboardData(userId);
  }

  async getUserStats(userId: string) {
    const user = await getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      totalWorkouts: user.totalWorkouts || 0,
      totalCaloriesBurned: user.totalCaloriesBurned || 0,
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,
      totalPoints: user.totalPoints || 0,
    };
  }

  async getAIContent(userId: string): Promise<any> {
    const user = await getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Transform user object to match UserProfile interface
    const userProfile: UserProfile = {
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

    const personalizedWorkouts =
      await this.aiService.generatePersonalizedWorkouts(userProfile);
    const personalizedMeals =
      await this.aiService.generatePersonalizedMeals(userProfile);
    const motivationalQuote = await this.aiService.generateMotivationalQuote(
      user.primaryGoal ?? undefined,
    );

    return {
      workouts: personalizedWorkouts,
      meals: personalizedMeals,
      motivationalQuote,
    };
  }

  async getUserAchievements(userId: string) {
    const achievements = await prisma.userAchievement.findMany({
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

  async logWorkout(workoutData: any) {
    const { userId, workoutName, duration, caloriesBurned } = workoutData;

    const workoutLog = await prisma.workoutLog.create({
      data: {
        userId,
        workoutName,
        duration,
        caloriesBurned,
        exercises: workoutData.exercises || [],
        notes: workoutData.notes,
      },
    });

    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalWorkouts: { increment: 1 },
        totalCaloriesBurned: { increment: caloriesBurned || 0 },
        totalPoints: { increment: 25 }, // Points for completing workout
      },
    });

    return workoutLog;
  }

  async logMeal(mealData: any) {
    const { userId, mealName, mealType, calories } = mealData;

    const mealLog = await prisma.mealLog.create({
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

  private getMotivationalQuote(goal?: string) {
    const quotes = {
      'weight-loss': 'Every step counts towards your weight loss goal!',
      'muscle-gain':
        "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
      endurance:
        "The miracle isn't that I finished. The miracle is that I had the courage to start.",
      default: 'Your only limit is your mind. Push beyond it!',
    };

    return quotes[goal as keyof typeof quotes] || quotes.default;
  }

  // Weekly Challenge Progress Tracking
  async getWeeklyChallengeProgress(userId: string) {
    const user = await getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get active weekly challenge
    const activeWeeklyChallenge = await prisma.weeklyChallenge.findFirst({
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

    // Get user's challenge entry
    const challengeEntry = await prisma.challengeEntry.findFirst({
      where: {
        userId,
        weeklyChallengeId: activeWeeklyChallenge.id,
      },
    });

    // Calculate progress based on challenge type
    let currentProgress = 0;
    let dailyBreakdown: any[] = [];

    if (challengeEntry) {
      if (activeWeeklyChallenge.type === 'workout') {
        // Count workouts in the challenge period
        const workouts = await prisma.workoutLog.findMany({
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

        // Create daily breakdown
        dailyBreakdown = this.generateWeeklyBreakdown(
          activeWeeklyChallenge.startDate,
          activeWeeklyChallenge.endDate,
          workouts,
          'workout',
        );
      } else if (activeWeeklyChallenge.type === 'calories') {
        // Calculate total calories burned in the challenge period
        const workouts = await prisma.workoutLog.findMany({
          where: {
            userId,
            completedAt: {
              gte: activeWeeklyChallenge.startDate,
              lte: activeWeeklyChallenge.endDate,
            },
          },
        });

        currentProgress = workouts.reduce(
          (total, workout) => total + (workout.caloriesBurned || 0),
          0,
        );

        dailyBreakdown = this.generateWeeklyBreakdown(
          activeWeeklyChallenge.startDate,
          activeWeeklyChallenge.endDate,
          workouts,
          'calories',
        );
      }
    }

    const progressPercentage = Math.min(
      (currentProgress / activeWeeklyChallenge.targetValue) * 100,
      100,
    );
    const isCompleted = currentProgress >= activeWeeklyChallenge.targetValue;
    const daysRemaining = Math.max(
      0,
      Math.ceil(
        (activeWeeklyChallenge.endDate.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );

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

  private generateWeeklyBreakdown(
    startDate: Date,
    endDate: Date,
    activities: any[],
    type: 'workout' | 'calories',
  ): DayBreakdown[] {
    const breakdown: DayBreakdown[] = [];
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
      } else if (type === 'calories') {
        dayValue = dayActivities.reduce(
          (total, activity) => total + (activity.caloriesBurned || 0),
          0,
        );
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

  async updateWeeklyChallengeProgress(
    userId: string,
    activityType: 'workout' | 'meal',
  ) {
    // Get active weekly challenge
    const activeWeeklyChallenge = await prisma.weeklyChallenge.findFirst({
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

    // Check if user has joined the challenge
    const challengeEntry = await prisma.challengeEntry.findFirst({
      where: {
        userId,
        weeklyChallengeId: activeWeeklyChallenge.id,
      },
    });

    if (!challengeEntry) {
      return { message: 'User has not joined this challenge' };
    }

    // Get updated progress
    const progressData = await this.getWeeklyChallengeProgress(userId);

    if (!progressData.progress) {
      return { message: 'Could not calculate progress' };
    }

    // Check if challenge is now completed
    if (progressData.progress.isCompleted && !challengeEntry.completedAt) {
      // Mark challenge as completed and award points
      await prisma.challengeEntry.update({
        where: { id: challengeEntry.id },
        data: {
          completedAt: new Date(),
          completed: true,
        },
      });

      // Award points to user
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalPoints: { increment: activeWeeklyChallenge.points },
        },
      });

      // Check for achievements
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

  private async checkWeeklyChallengeAchievements(
    userId: string,
  ): Promise<Achievement[]> {
    const achievements: Achievement[] = [];

    // Check for "First Weekly Challenge" achievement
    const completedWeeklyChallenges = await prisma.challengeEntry.count({
      where: {
        userId,
        completed: true,
        weeklyChallengeId: { not: null },
      },
    });

    if (completedWeeklyChallenges === 1) {
      // First weekly challenge completion
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
    } else if (completedWeeklyChallenges === 5) {
      // Fifth weekly challenge completion
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

  private async awardAchievement(
    userId: string,
    achievementData: {
      name: string;
      description: string;
      points: number;
      badgeIcon: string;
      category: string;
    },
  ): Promise<Achievement | null> {
    try {
      // Check if achievement already exists
      const existingAchievement = await prisma.achievement.findFirst({
        where: {
          name: achievementData.name,
        },
      });

      let achievementId: string;

      if (existingAchievement) {
        achievementId = existingAchievement.id;
      } else {
        // Create new achievement
        const newAchievement = await prisma.achievement.create({
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

      // Check if user already has this achievement
      const existingUserAchievement = await prisma.userAchievement.findFirst({
        where: {
          userId,
          achievementId,
        },
      });

      if (existingUserAchievement) {
        return null; // Already awarded
      }

      // Award achievement to user
      const userAchievement = await prisma.userAchievement.create({
        data: {
          userId,
          achievementId,
        },
        include: {
          achievement: true,
        },
      });

      // Update user points
      await prisma.user.update({
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
    } catch (error) {
      console.error('Error awarding achievement:', error);
      return null;
    }
  }
}
