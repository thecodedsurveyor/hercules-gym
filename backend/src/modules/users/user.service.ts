import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import prisma from '../../lib/prisma';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { OnboardingDto } from './dto/onboarding.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

// User service functions
export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<User> => {
  return prisma.user.create({ data });
};

export const registerUser = async (
  registerData: RegisterUserDto,
): Promise<User> => {
  const { email, password, name, fitnessGoal, experienceLevel, preferredTime } =
    registerData;

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user with all required fields
  const userData: Prisma.UserCreateInput = {
    name,
    email,
    password: hashedPassword,
    fitnessGoal,
    experienceLevel,
    preferredTime,
    onboardingCompleted: false,
    onboardingStep: 0,
    fitnessGoals: [],
    goalPriority: [],
    dietaryPreferences: [],
  };

  return prisma.user.create({
    data: userData,
  });
};

export const getUser = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const saveOnboarding = async (
  onboardingData: OnboardingDto,
): Promise<User> => {
  const { userId, ...data } = onboardingData;

  // Check if user exists
  const existingUser = await getUser(userId);
  if (!existingUser) {
    throw new NotFoundException('User not found');
  }

  // Update user with complete onboarding data
  return prisma.user.update({
    where: { id: userId },
    data: {
      // Basic Information
      age: data.age,
      gender: data.gender,
      height: data.height,
      weight: data.weight,

      // Fitness Goals
      fitnessGoals: data.fitnessGoals,
      goalPriority: data.goalPriority,
      primaryGoal: data.primaryGoal,

      // Activity Level
      fitnessLevel: data.fitnessLevel,
      workoutFrequency: data.workoutFrequency,

      // Body Composition (Optional)
      bodyFatPercentage: data.bodyFatPercentage,
      measurements: data.measurements,

      // Dietary Preferences
      dietaryPreferences: data.dietaryPreferences || [],

      // Onboarding completion
      onboardingCompleted: data.onboardingCompleted,

      // Set initial gamification values
      totalPoints: 50, // Welcome bonus
      currentStreak: 1, // First login
      weeklyWorkoutGoal: data.workoutFrequency || 3,

      updatedAt: new Date(),
    },
  });
};

export const loginUser = async (loginData: LoginDto) => {
  const { email, password } = loginData;

  // Find user by email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Update login streak and last login
  const now = new Date();
  const lastLogin = (user as any).lastLogin
    ? new Date((user as any).lastLogin)
    : null;
  let currentStreak = user.currentStreak || 0;
  let longestStreak = user.longestStreak || 0;
  const achievements: string[] = [];

  // Calculate streak
  if (lastLogin) {
    const timeDiff = now.getTime() - lastLogin.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 1) {
      // Consecutive day
      currentStreak += 1;
    } else if (daysDiff > 1) {
      // Streak broken
      currentStreak = 1;
    }
    // Same day login doesn't change streak
  } else {
    // First login
    currentStreak = 1;
  }

  // Update longest streak
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  // Check for achievements
  if (currentStreak === 7) {
    achievements.push('Week Warrior');
  } else if (currentStreak === 14) {
    achievements.push('Two Week Champion');
  } else if (currentStreak === 30) {
    achievements.push('Monthly Master');
  } else if (currentStreak === 100) {
    achievements.push('Century Streak');
  }

  // Update user data
  const updatedUser = await updateUser(user.id, {
    lastActivityDate: now, // Use existing field for now
    currentStreak,
    longestStreak,
    totalPoints: (user.totalPoints || 0) + 5, // Add login points
  } as any);

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' },
  );

  // Return user data and token (excluding password)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: userPassword, ...userWithoutPassword } = updatedUser;
  return {
    user: userWithoutPassword,
    token,
    streak: {
      current: currentStreak,
      longest: longestStreak,
      achievements,
    },
  };
};
