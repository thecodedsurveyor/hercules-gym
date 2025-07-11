"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../lib/prisma");
let ChallengesService = class ChallengesService {
    async getDailyChallenges(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dailyChallenges = await prisma_1.default.dailyChallenge.findMany({
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
    async getWeeklyChallenges(userId) {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        const weeklyChallenges = await prisma_1.default.weeklyChallenge.findMany({
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
                ? Math.min((challenge.challengeEntries[0].progress / challenge.targetValue) *
                    100, 100)
                : 0,
        }));
    }
    async joinChallenge(challengeData) {
        const { userId, challengeId, challengeType } = challengeData;
        const existingEntry = await prisma_1.default.challengeEntry.findFirst({
            where: {
                userId,
                ...(challengeType === 'daily'
                    ? { dailyChallengeId: challengeId }
                    : { weeklyChallengeId: challengeId }),
            },
        });
        if (existingEntry) {
            throw new common_1.BadRequestException('User already joined this challenge');
        }
        const challengeEntry = await prisma_1.default.challengeEntry.create({
            data: {
                userId,
                ...(challengeType === 'daily'
                    ? { dailyChallengeId: challengeId }
                    : { weeklyChallengeId: challengeId }),
            },
        });
        return challengeEntry;
    }
    async completeChallenge(completionData) {
        const { userId, challengeId, challengeType, progress } = completionData;
        const challengeEntry = await prisma_1.default.challengeEntry.findFirst({
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
            throw new common_1.NotFoundException('Challenge entry not found');
        }
        const challenge = challengeEntry.dailyChallenge || challengeEntry.weeklyChallenge;
        const targetValue = challenge?.targetValue || 1;
        const newProgress = progress || targetValue;
        const isCompleted = newProgress >= targetValue;
        const updatedEntry = await prisma_1.default.challengeEntry.update({
            where: { id: challengeEntry.id },
            data: {
                progress: newProgress,
                completed: isCompleted,
                completedAt: isCompleted ? new Date() : null,
                pointsEarned: isCompleted ? challenge?.points || 0 : 0,
            },
        });
        if (isCompleted && challenge) {
            await prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    totalPoints: { increment: challenge.points },
                },
            });
        }
        return updatedEntry;
    }
    async getUserChallenges(userId) {
        const entries = await prisma_1.default.challengeEntry.findMany({
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
            totalPointsEarned: completedChallenges.reduce((sum, entry) => sum + entry.pointsEarned, 0),
        };
    }
    async createDailyChallenge(challengeData) {
        return prisma_1.default.dailyChallenge.create({
            data: challengeData,
        });
    }
    async createWeeklyChallenge(challengeData) {
        return prisma_1.default.weeklyChallenge.create({
            data: challengeData,
        });
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)()
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map