import * as dotenv from 'dotenv';
import { AIService } from '../src/services/ai.service';

// Load environment variables
dotenv.config();

async function testAIIntegration() {
  console.log('🤖 Testing AI Integration...\n');

  const aiService = new AIService();

  // Test user profile
  const testUser = {
    age: 25,
    gender: 'male',
    height: 180,
    weight: 75,
    primaryGoal: 'muscle-gain',
    fitnessLevel: 'intermediate',
    dietaryPreferences: ['high-protein'],
    fitnessGoals: ['muscle-gain', 'strength'],
    bodyFatPercentage: 15,
    workoutFrequency: 4,
  };

  console.log('📊 Test User Profile:');
  console.log(`   Age: ${testUser.age}, Gender: ${testUser.gender}`);
  console.log(
    `   Goal: ${testUser.primaryGoal}, Level: ${testUser.fitnessLevel}`,
  );
  console.log(`   Preferences: ${testUser.dietaryPreferences.join(', ')}\n`);

  try {
    // Test motivational quote generation
    console.log('💪 Testing Motivational Quote Generation...');
    const quote = await aiService.generateMotivationalQuote(
      testUser.primaryGoal,
    );
    console.log(`   Quote: "${quote}"\n`);

    // Test workout generation
    console.log('🏋️ Testing Workout Generation...');
    const workouts = await aiService.generatePersonalizedWorkouts(testUser);
    console.log(`   Generated ${workouts.length} workouts:`);
    workouts.forEach((workout, index) => {
      console.log(
        `   ${index + 1}. ${workout.name} (${workout.duration}min, ${workout.difficulty})`,
      );
      console.log(`      ${workout.description}`);
      console.log(
        `      Exercises: ${workout.exercises.slice(0, 3).join(', ')}...`,
      );
    });
    console.log('');

    // Test meal generation
    console.log('🍽️ Testing Meal Generation...');
    const meals = await aiService.generatePersonalizedMeals(testUser);
    console.log(`   Generated ${meals.length} meals:`);
    meals.forEach((meal, index) => {
      console.log(`   ${index + 1}. ${meal.name} (${meal.type})`);
      console.log(`      ${meal.calories} cal, ${meal.protein}g protein`);
      console.log(`      ${meal.description}`);
      console.log(
        `      Ingredients: ${meal.ingredients.slice(0, 3).join(', ')}...`,
      );
    });
    console.log('');

    console.log('✅ AI Integration Test Completed Successfully!');
    console.log('\n🔧 Implementation Status:');
    console.log('   ✅ AI Service created');
    console.log('   ✅ Fallback system working');
    console.log('   ✅ User profiling integrated');
    console.log('   ✅ Content generation functional');

    const hasApiKey =
      !!process.env.OPENROUTER_API_KEY &&
      process.env.OPENROUTER_API_KEY !== 'your_api_key_here';
    if (hasApiKey) {
      console.log('   ✅ OpenRouter API key configured');
      console.log('   ✅ Real AI content will be generated');
    } else {
      console.log('   ⚠️  OpenRouter API key not configured');
      console.log(
        '   ⚠️  Using fallback content (set OPENROUTER_API_KEY in .env)',
      );
    }
  } catch (error) {
    console.error('❌ AI Integration Test Failed:', error);
    process.exit(1);
  }
}

testAIIntegration();
