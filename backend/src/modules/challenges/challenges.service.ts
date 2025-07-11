import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import prisma from '../../lib/prisma';

@Injectable()
export class ChallengesService {
  async getDailyChallenges(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailyChallenges = await prisma.dailyChallenge.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
        isActive: true,
      },
      include: {
        challengeEntries: {
          where: { userId },
        },
      },
    });

    return dailyChallenges.map((challenge) => ({
      ...challenge,
      userEntry: challenge.challengeEntries[0] || null,
      isJoined: challenge.challengeEntries.length > 0,
      isCompleted: challenge.challengeEntries[0]?.completed || false,
    }));
  }

  async getWeeklyChallenges(userId: string) {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weeklyChallenges = await prisma.weeklyChallenge.findMany({
      where: {
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
        isActive: true,
      },
      include: {
        challengeEntries: {
          where: { userId },
        },
      },
    });

    return weeklyChallenges.map((challenge) => ({
      ...challenge,
      userEntry: challenge.challengeEntries[0] || null,
      isJoined: challenge.challengeEntries.length > 0,
      isCompleted: challenge.challengeEntries[0]?.completed || false,
      progress: challenge.challengeEntries[0]?.progress || 0,
      progressPercentage: challenge.challengeEntries[0]
        ? Math.min(
            (challenge.challengeEntries[0].progress / challenge.targetValue) *
              100,
            100,
          )
        : 0,
    }));
  }

  async joinChallenge(challengeData: any) {
    const { userId, challengeId, challengeType } = challengeData;

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
      throw new BadRequestException('User already joined this challenge');
    }

    // Create challenge entry
    const challengeEntry = await prisma.challengeEntry.create({
      data: {
        userId,
        ...(challengeType === 'daily'
          ? { dailyChallengeId: challengeId }
          : { weeklyChallengeId: challengeId }),
      },
    });

    return challengeEntry;
  }

  async completeChallenge(completionData: any) {
    const { userId, challengeId, challengeType, progress } = completionData;

    const challengeEntry = await prisma.challengeEntry.findFirst({
      where: {
        userId,
        ...(challengeType === 'daily'
          ? { dailyChallengeId: challengeId }
          : { weeklyChallengeId: challengeId }),
      },
      include: {
        dailyChallenge: challengeType === 'daily',
        weeklyChallenge: challengeType === 'weekly',
      },
    });

    if (!challengeEntry) {
      throw new NotFoundException('Challenge entry not found');
    }

    const challenge =
      challengeEntry.dailyChallenge || challengeEntry.weeklyChallenge;
    const targetValue = challenge?.targetValue || 1;
    const newProgress = progress || targetValue;
    const isCompleted = newProgress >= targetValue;

    // Update challenge entry
    const updatedEntry = await prisma.challengeEntry.update({
      where: { id: challengeEntry.id },
      data: {
        progress: newProgress,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
        pointsEarned: isCompleted ? challenge?.points || 0 : 0,
      },
    });

    // If completed, award points to user
    if (isCompleted && challenge) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalPoints: { increment: challenge.points },
        },
      });
    }

    return updatedEntry;
  }

  async getUserChallenges(userId: string) {
    const entries = await prisma.challengeEntry.findMany({
      where: { userId },
      include: {
        dailyChallenge: true,
        weeklyChallenge: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const activeChallenges = entries.filter((entry) => !entry.completed);
    const completedChallenges = entries.filter((entry) => entry.completed);

    return {
      active: activeChallenges,
      completed: completedChallenges,
      totalPointsEarned: completedChallenges.reduce(
        (sum, entry) => sum + entry.pointsEarned,
        0,
      ),
    };
  }

  // Admin functions to create challenges
  async createDailyChallenge(challengeData: any) {
    return prisma.dailyChallenge.create({
      data: challengeData,
    });
  }

  async createWeeklyChallenge(challengeData: any) {
    return prisma.weeklyChallenge.create({
      data: challengeData,
    });
  }
}
