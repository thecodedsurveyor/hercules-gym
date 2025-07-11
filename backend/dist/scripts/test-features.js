"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFeatures = testFeatures;
const prisma_1 = require("../src/lib/prisma");
async function testFeatures() {
    const testUserId = '686b98e2c85a50a018d39119';
    console.log('🧪 Testing Hercules Gym Features...\n');
    try {
        console.log('1️⃣ Testing Database Connection...');
        await prisma_1.default.$connect();
        console.log('✅ Database connected successfully\n');
        console.log('2️⃣ Testing User Data...');
        const user = await prisma_1.default.user.findUnique({
            where: { id: testUserId },
        });
        if (user) {
            console.log(`✅ Found user: ${user.name} (${user.email})`);
            console.log(`   Points: ${user.totalPoints}, Streak: ${user.currentStreak}\n`);
        }
        else {
            console.log('❌ User not found\n');
            return;
        }
        console.log('3️⃣ Testing Challenge Creation...');
        const existingWeekly = await prisma_1.default.weeklyChallenge.findFirst({
            where: {
                isActive: true,
                startDate: { lte: new Date() },
                endDate: { gte: new Date() },
            },
        });
        let weeklyChallenge = existingWeekly;
        if (!existingWeekly) {
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
            weeklyChallenge = await prisma_1.default.weeklyChallenge.create({
                data: {
                    title: 'Weekly Warrior Challenge',
                    description: 'Complete 4 workouts this week!',
                    points: 200,
                    type: 'workout',
                    targetValue: 4,
                    startDate: startOfWeek,
                    endDate: endOfWeek,
                    isActive: true,
                },
            });
            console.log('✅ Created new weekly challenge');
        }
        else {
            console.log('✅ Weekly challenge already exists');
        }
        if (!weeklyChallenge) {
            console.log('❌ Weekly challenge could not be created or found');
            return;
        }
        console.log(`   Challenge: ${weeklyChallenge.title}`);
        console.log(`   Target: ${weeklyChallenge.targetValue} ${weeklyChallenge.type}s\n`);
        console.log('4️⃣ Testing Challenge Join...');
        const existingEntry = await prisma_1.default.challengeEntry.findFirst({
            where: {
                userId: testUserId,
                weeklyChallengeId: weeklyChallenge.id,
            },
        });
        if (!existingEntry) {
            const challengeEntry = await prisma_1.default.challengeEntry.create({
                data: {
                    userId: testUserId,
                    weeklyChallengeId: weeklyChallenge.id,
                },
            });
            console.log('✅ User joined weekly challenge');
        }
        else {
            console.log('✅ User already joined weekly challenge');
        }
        console.log('\n5️⃣ Testing Workout Logging...');
        const workout = await prisma_1.default.workoutLog.create({
            data: {
                userId: testUserId,
                workoutName: 'Test HIIT Session',
                duration: 25,
                caloriesBurned: 180,
                exercises: ['Burpees', 'Mountain Climbers', 'High Knees'],
                notes: 'Great energy today!',
            },
        });
        console.log('✅ Workout logged successfully');
        console.log(`   Workout: ${workout.workoutName} (${workout.duration} min, ${workout.caloriesBurned} cal)\n`);
        console.log('6️⃣ Testing Challenge Progress...');
        const workouts = await prisma_1.default.workoutLog.findMany({
            where: {
                userId: testUserId,
                completedAt: {
                    gte: weeklyChallenge.startDate,
                    lte: weeklyChallenge.endDate,
                },
            },
        });
        const currentProgress = workouts.length;
        const progressPercentage = Math.min((currentProgress / weeklyChallenge.targetValue) * 100, 100);
        console.log(`✅ Current progress: ${currentProgress}/${weeklyChallenge.targetValue} workouts (${Math.round(progressPercentage)}%)`);
        if (currentProgress >= weeklyChallenge.targetValue) {
            console.log('🎉 Challenge completed!');
            await prisma_1.default.challengeEntry.updateMany({
                where: {
                    userId: testUserId,
                    weeklyChallengeId: weeklyChallenge.id,
                },
                data: {
                    completedAt: new Date(),
                    completed: true,
                },
            });
            await prisma_1.default.user.update({
                where: { id: testUserId },
                data: {
                    totalPoints: { increment: weeklyChallenge.points },
                },
            });
            console.log(`🏆 Awarded ${weeklyChallenge.points} points!`);
        }
        console.log('\n7️⃣ Testing Leaderboard...');
        const leaderboard = await prisma_1.default.user.findMany({
            where: { onboardingCompleted: true },
            select: {
                id: true,
                name: true,
                totalPoints: true,
                currentStreak: true,
            },
            orderBy: { totalPoints: 'desc' },
            take: 5,
        });
        console.log('✅ Top 5 Leaderboard:');
        leaderboard.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.name} - ${user.totalPoints} pts (${user.currentStreak} day streak)`);
        });
        console.log('\n8️⃣ Testing Daily Breakdown...');
        const breakdown = [];
        const currentDate = new Date(weeklyChallenge.startDate);
        while (currentDate <= weeklyChallenge.endDate) {
            const dayStart = new Date(currentDate);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(23, 59, 59, 999);
            const dayWorkouts = workouts.filter((workout) => {
                const workoutDate = new Date(workout.completedAt);
                return workoutDate >= dayStart && workoutDate <= dayEnd;
            });
            const dayName = currentDate.toLocaleDateString('en-US', {
                weekday: 'short',
            });
            const isToday = dayStart.toDateString() === new Date().toDateString();
            breakdown.push({
                day: dayName,
                workouts: dayWorkouts.length,
                isToday,
                status: dayWorkouts.length > 0 ? '✅' : isToday ? '📅' : '⏳',
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log('✅ Weekly Breakdown:');
        breakdown.forEach((day) => {
            const indicator = day.isToday ? ' (Today)' : '';
            console.log(`   ${day.status} ${day.day}: ${day.workouts} workout(s)${indicator}`);
        });
        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 Final Summary:');
        console.log(`   • Database: Connected ✅`);
        console.log(`   • User Data: Loaded ✅`);
        console.log(`   • Challenges: Active ✅`);
        console.log(`   • Progress Tracking: Working ✅`);
        console.log(`   • Leaderboard: Updated ✅`);
        console.log(`   • Weekly Breakdown: Generated ✅`);
    }
    catch (error) {
        console.error('❌ Test failed:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
if (require.main === module) {
    testFeatures().catch((e) => {
        console.error('❌ Test suite failed:', e);
        process.exit(1);
    });
}
//# sourceMappingURL=test-features.js.map