"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
async function initializeChallenges() {
    console.log('🎯 Initializing challenges...');
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
                title: '15-Minute HIIT Challenge',
                description: 'Complete a 15-minute high-intensity interval training session',
                points: 50,
                type: 'workout',
                targetValue: 1,
                date: today,
                isActive: true,
            },
        });
        console.log('✅ Created daily challenge');
    }
    else {
        console.log('ℹ️ Daily challenge already exists');
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
                title: 'Week Warrior Challenge',
                description: 'Complete 4 workouts this week to become a Week Warrior!',
                points: 200,
                type: 'workout',
                targetValue: 4,
                startDate: startOfWeek,
                endDate: endOfWeek,
                isActive: true,
            },
        });
        console.log('✅ Created weekly challenge');
    }
    else {
        console.log('ℹ️ Weekly challenge already exists');
    }
    const userCount = await prisma_1.default.user.count();
    if (userCount < 3) {
        const sampleUsers = [
            {
                name: 'Sarah Chen',
                email: 'sarah@example.com',
                password: 'hashed-password',
                onboardingCompleted: true,
                totalPoints: 1180,
                currentStreak: 12,
                longestStreak: 15,
                totalWorkouts: 24,
                fitnessGoals: ['weight-loss'],
                primaryGoal: 'weight-loss',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Mike Rodriguez',
                email: 'mike@example.com',
                password: 'hashed-password',
                onboardingCompleted: true,
                totalPoints: 1095,
                currentStreak: 8,
                longestStreak: 12,
                totalWorkouts: 18,
                fitnessGoals: ['muscle-gain'],
                primaryGoal: 'muscle-gain',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Emma Davis',
                email: 'emma@example.com',
                password: 'hashed-password',
                onboardingCompleted: true,
                totalPoints: 875,
                currentStreak: 6,
                longestStreak: 8,
                totalWorkouts: 15,
                fitnessGoals: ['endurance'],
                primaryGoal: 'endurance',
                fitnessLevel: 'beginner',
            },
        ];
        for (const userData of sampleUsers) {
            const existingUser = await prisma_1.default.user.findUnique({
                where: { email: userData.email },
            });
            if (!existingUser) {
                await prisma_1.default.user.create({ data: userData });
                console.log(`✅ Created sample user: ${userData.name}`);
            }
        }
    }
    else {
        console.log('ℹ️ Sample users already exist');
    }
    console.log('🎉 Challenge initialization complete!');
}
initializeChallenges()
    .catch((e) => {
    console.error('❌ Error initializing challenges:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
//# sourceMappingURL=init-challenges.js.map