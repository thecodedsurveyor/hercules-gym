import prisma from '../src/lib/prisma';

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');

  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Test basic query
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);

    // Test challenge queries
    const dailyChallenges = await prisma.dailyChallenge.count();
    const weeklyChallenges = await prisma.weeklyChallenge.count();
    console.log(
      `🎯 Found ${dailyChallenges} daily challenges and ${weeklyChallenges} weekly challenges`,
    );

    // Initialize challenges if needed
    await initializeChallenges();

    console.log('🎉 Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function initializeChallenges() {
  console.log('🎯 Initializing challenges...');

  // Create daily challenge for today
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
        title: '15-Minute HIIT Challenge',
        description:
          'Complete a 15-minute high-intensity interval training session',
        points: 50,
        type: 'workout',
        targetValue: 1,
        date: today,
        isActive: true,
      },
    });
    console.log('✅ Created daily challenge');
  } else {
    console.log('ℹ️ Daily challenge already exists');
  }

  // Create weekly challenge for this week
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
  } else {
    console.log('ℹ️ Weekly challenge already exists');
  }

  // Create sample users for leaderboard if they don't exist
  const userCount = await prisma.user.count();

  if (userCount < 3) {
    const sampleUsers = [
      {
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        password: '$2b$12$hashedpassword', // Using bcrypt format
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
        password: '$2b$12$hashedpassword',
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
        password: '$2b$12$hashedpassword',
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
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!existingUser) {
        await prisma.user.create({ data: userData });
        console.log(`✅ Created sample user: ${userData.name}`);
      }
    }
  } else {
    console.log('ℹ️ Sample users already exist');
  }

  console.log('🎉 Challenge initialization complete!');
}

// Run the test
if (require.main === module) {
  testDatabaseConnection().catch((e) => {
    console.error('❌ Database test failed:', e);
    process.exit(1);
  });
}

export { testDatabaseConnection, initializeChallenges };
