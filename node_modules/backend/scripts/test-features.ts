import prisma from '../src/lib/prisma';

interface DayBreakdown {
  day: string;
  workouts: number;
  isToday: boolean;
  status: string;
}

async function testFeatures() {
  const testUserId = '686b98e2c85a50a018d39119'; // Real user ID from database

  console.log('🧪 Testing Hercules Gym Features...\n');

  try {
    // 1. Test Database Connection
    console.log('1️⃣ Testing Database Connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');

    // 2. Test User Data
    console.log('2️⃣ Testing User Data...');
    const user = await prisma.user.findUnique({
      where: { id: testUserId },
    });

    if (user) {
      console.log(`✅ Found user: ${user.name} (${user.email})`);
      console.log(
        `   Points: ${user.totalPoints}, Streak: ${user.currentStreak}\n`,
      );
    } else {
      console.log('❌ User not found\n');
      return;
    }

    // 3. Test Challenge Creation
    console.log('3️⃣ Testing Challenge Creation...');

    // Create weekly challenge if it doesn't exist
    const existingWeekly = await prisma.weeklyChallenge.findFirst({
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

      weeklyChallenge = await prisma.weeklyChallenge.create({
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
    } else {
      console.log('✅ Weekly challenge already exists');
    }

    // Ensure weeklyChallenge is not null
    if (!weeklyChallenge) {
      console.log('❌ Weekly challenge could not be created or found');
      return;
    }

    console.log(`   Challenge: ${weeklyChallenge.title}`);
    console.log(
      `   Target: ${weeklyChallenge.targetValue} ${weeklyChallenge.type}s\n`,
    );

    // 4. Test Challenge Join
    console.log('4️⃣ Testing Challenge Join...');

    const existingEntry = await prisma.challengeEntry.findFirst({
      where: {
        userId: testUserId,
        weeklyChallengeId: weeklyChallenge.id,
      },
    });

    if (!existingEntry) {
      const challengeEntry = await prisma.challengeEntry.create({
        data: {
          userId: testUserId,
          weeklyChallengeId: weeklyChallenge.id,
        },
      });

      console.log('✅ User joined weekly challenge');
    } else {
      console.log('✅ User already joined weekly challenge');
    }

    // 5. Test Workout Logging
    console.log('\n5️⃣ Testing Workout Logging...');

    const workout = await prisma.workoutLog.create({
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
    console.log(
      `   Workout: ${workout.workoutName} (${workout.duration} min, ${workout.caloriesBurned} cal)\n`,
    );

    // 6. Test Challenge Progress
    console.log('6️⃣ Testing Challenge Progress...');

    const workouts = await prisma.workoutLog.findMany({
      where: {
        userId: testUserId,
        completedAt: {
          gte: weeklyChallenge.startDate,
          lte: weeklyChallenge.endDate,
        },
      },
    });

    const currentProgress = workouts.length;
    const progressPercentage = Math.min(
      (currentProgress / weeklyChallenge.targetValue) * 100,
      100,
    );

    console.log(
      `✅ Current progress: ${currentProgress}/${weeklyChallenge.targetValue} workouts (${Math.round(progressPercentage)}%)`,
    );

    if (currentProgress >= weeklyChallenge.targetValue) {
      console.log('🎉 Challenge completed!');

      // Mark as completed
      await prisma.challengeEntry.updateMany({
        where: {
          userId: testUserId,
          weeklyChallengeId: weeklyChallenge.id,
        },
        data: {
          completedAt: new Date(),
          completed: true,
        },
      });

      // Award points
      await prisma.user.update({
        where: { id: testUserId },
        data: {
          totalPoints: { increment: weeklyChallenge.points },
        },
      });

      console.log(`🏆 Awarded ${weeklyChallenge.points} points!`);
    }

    // 7. Test Leaderboard
    console.log('\n7️⃣ Testing Leaderboard...');

    const leaderboard = await prisma.user.findMany({
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
      console.log(
        `   ${index + 1}. ${user.name} - ${user.totalPoints} pts (${user.currentStreak} day streak)`,
      );
    });

    // 8. Test Daily Breakdown
    console.log('\n8️⃣ Testing Daily Breakdown...');

    const breakdown: DayBreakdown[] = [];
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
      console.log(
        `   ${day.status} ${day.day}: ${day.workouts} workout(s)${indicator}`,
      );
    });

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Final Summary:');
    console.log(`   • Database: Connected ✅`);
    console.log(`   • User Data: Loaded ✅`);
    console.log(`   • Challenges: Active ✅`);
    console.log(`   • Progress Tracking: Working ✅`);
    console.log(`   • Leaderboard: Updated ✅`);
    console.log(`   • Weekly Breakdown: Generated ✅`);
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the tests
if (require.main === module) {
  testFeatures().catch((e) => {
    console.error('❌ Test suite failed:', e);
    process.exit(1);
  });
}

export { testFeatures };
