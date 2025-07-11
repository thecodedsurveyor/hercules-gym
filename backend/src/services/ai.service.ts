import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

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

interface MealRecommendation {
  id: string;
  name: string;
  type: string;
  calories: number;
  protein: number;
  description: string;
  ingredients: string[];
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface WorkoutRecommendation {
  id: string;
  name: string;
  duration: number;
  type: string;
  difficulty: string;
  description: string;
  exercises: string[];
  targetMuscles: string[];
}

@Injectable()
export class AIService {
  private readonly openRouterApiKey = process.env.OPENROUTER_API_KEY;
  private readonly openRouterBaseUrl =
    process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

  constructor() {
    if (!this.openRouterApiKey) {
      console.warn(
        'OPENROUTER_API_KEY not found in environment variables. AI features will use fallback data.',
      );
    }
  }

  async generatePersonalizedMeals(
    user: UserProfile,
  ): Promise<MealRecommendation[]> {
    if (!this.openRouterApiKey) {
      return this.getFallbackMeals(user);
    }

    try {
      const prompt = this.buildNutritionPrompt(user);
      const response = await this.callOpenRouter(prompt);

      if (response) {
        return this.parseMealResponse(response);
      }
    } catch (error) {
      console.error('Error generating AI meals:', error);
    }

    // Fallback to static data if AI fails
    return this.getFallbackMeals(user);
  }

  async generatePersonalizedWorkouts(
    user: UserProfile,
  ): Promise<WorkoutRecommendation[]> {
    if (!this.openRouterApiKey) {
      return this.getFallbackWorkouts(user);
    }

    try {
      const prompt = this.buildWorkoutPrompt(user);
      const response = await this.callOpenRouter(prompt);

      if (response) {
        return this.parseWorkoutResponse(response);
      }
    } catch (error) {
      console.error('Error generating AI workouts:', error);
    }

    // Fallback to static data if AI fails
    return this.getFallbackWorkouts(user);
  }

  async generateMotivationalQuote(goal?: string): Promise<string> {
    if (!this.openRouterApiKey) {
      return this.getFallbackQuote(goal);
    }

    try {
      const prompt = `Generate a motivational fitness quote specifically for someone with the goal: ${goal || 'general fitness'}. Make it inspiring, concise (under 50 words), and actionable. Return only the quote without additional text.`;
      const response = await this.callOpenRouter(prompt);

      if (response && response.trim().length > 0) {
        return response.trim();
      }
    } catch (error) {
      console.error('Error generating AI quote:', error);
    }

    return this.getFallbackQuote(goal);
  }

  private buildNutritionPrompt(user: UserProfile): string {
    const userInfo = this.formatUserInfo(user);

    return `As a certified nutritionist, create 3 personalized meal recommendations (breakfast, lunch, dinner) for this user:

${userInfo}

Requirements:
- Return ONLY a valid JSON array with exactly 3 meal objects
- Each meal must have: id, name, type, calories, protein, description, ingredients (array), macros (protein, carbs, fats in grams)
- Tailor to their fitness goals and dietary preferences
- Ensure proper macro distribution for their goals
- Consider their fitness level and activity

Format example:
[
  {
    "id": "ai-breakfast-1",
    "name": "Power Protein Bowl",
    "type": "breakfast",
    "calories": 350,
    "protein": 25,
    "description": "High-protein breakfast to fuel morning workouts",
    "ingredients": ["Greek yogurt", "berries", "protein powder", "almonds"],
    "macros": { "protein": 25, "carbs": 30, "fats": 12 }
  }
]`;
  }

  private buildWorkoutPrompt(user: UserProfile): string {
    const userInfo = this.formatUserInfo(user);

    return `As a certified personal trainer, create 2 personalized workout recommendations for this user:

${userInfo}

Requirements:
- Return ONLY a valid JSON array with exactly 2 workout objects
- Each workout must have: id, name, duration, type, difficulty, description, exercises (array), targetMuscles (array)
- Tailor to their fitness level and goals
- Appropriate duration based on their experience level
- Specific exercise names

Format example:
[
  {
    "id": "ai-workout-1",
    "name": "Upper Body Strength",
    "duration": 45,
    "type": "strength",
    "difficulty": "intermediate",
    "description": "Focus on building upper body muscle mass",
    "exercises": ["Push-ups", "Pull-ups", "Dumbbell rows", "Bench press"],
    "targetMuscles": ["chest", "back", "shoulders", "arms"]
  }
]`;
  }

  private formatUserInfo(user: UserProfile): string {
    return `
User Profile:
- Age: ${user.age || 'Not specified'}
- Gender: ${user.gender || 'Not specified'}
- Height: ${user.height ? `${user.height}cm` : 'Not specified'}
- Weight: ${user.weight ? `${user.weight}kg` : 'Not specified'}
- Primary Goal: ${user.primaryGoal || 'general fitness'}
- Additional Goals: ${user.fitnessGoals?.join(', ') || 'None specified'}
- Fitness Level: ${user.fitnessLevel || 'beginner'}
- Dietary Preferences: ${user.dietaryPreferences?.join(', ') || 'None specified'}
- Body Fat %: ${user.bodyFatPercentage || 'Not specified'}
- Weekly Workout Frequency: ${user.workoutFrequency || 3} times per week
    `.trim();
  }

  private async callOpenRouter(prompt: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${this.openRouterBaseUrl}/chat/completions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://hercules-gym.app',
            'X-Title': 'Hercules Gym AI',
          },
          body: JSON.stringify({
            model: 'mistralai/mixtral-8x7b-instruct',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            max_tokens: 1500,
            temperature: 0.7,
            top_p: 0.9,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `OpenRouter API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = (await response.json()) as any;
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error('OpenRouter API call failed:', error);
      return null;
    }
  }

  private parseMealResponse(response: string): MealRecommendation[] {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }

      const meals = JSON.parse(jsonMatch[0]);

      // Validate structure
      if (!Array.isArray(meals) || meals.length !== 3) {
        throw new Error('Invalid meal structure');
      }

      return meals.map((meal, index) => ({
        id: meal.id || `ai-meal-${index + 1}`,
        name: meal.name || 'AI Generated Meal',
        type: meal.type || ['breakfast', 'lunch', 'dinner'][index],
        calories: meal.calories || 400,
        protein: meal.protein || 20,
        description: meal.description || 'AI generated meal recommendation',
        ingredients: Array.isArray(meal.ingredients)
          ? meal.ingredients
          : ['Various ingredients'],
        macros: {
          protein: meal.macros?.protein || meal.protein || 20,
          carbs: meal.macros?.carbs || 40,
          fats: meal.macros?.fats || 15,
        },
      }));
    } catch (error) {
      console.error('Error parsing meal response:', error);
      throw error;
    }
  }

  private parseWorkoutResponse(response: string): WorkoutRecommendation[] {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }

      const workouts = JSON.parse(jsonMatch[0]);

      // Validate structure
      if (!Array.isArray(workouts) || workouts.length !== 2) {
        throw new Error('Invalid workout structure');
      }

      return workouts.map((workout, index) => ({
        id: workout.id || `ai-workout-${index + 1}`,
        name: workout.name || 'AI Generated Workout',
        duration: workout.duration || 45,
        type: workout.type || 'mixed',
        difficulty: workout.difficulty || 'intermediate',
        description:
          workout.description || 'AI generated workout recommendation',
        exercises: Array.isArray(workout.exercises)
          ? workout.exercises
          : ['Various exercises'],
        targetMuscles: Array.isArray(workout.targetMuscles)
          ? workout.targetMuscles
          : ['full body'],
      }));
    } catch (error) {
      console.error('Error parsing workout response:', error);
      throw error;
    }
  }

  private getFallbackMeals(user: UserProfile): MealRecommendation[] {
    const preferences = user.dietaryPreferences || [];
    const goals = user.fitnessGoals || [];

    const meals: MealRecommendation[] = [];

    // Breakfast
    if (preferences.includes('vegan')) {
      meals.push({
        id: 'fallback-vegan-breakfast',
        name: 'Vegan Power Bowl',
        type: 'breakfast',
        calories: 350,
        protein: 15,
        description: 'Quinoa, berries, nuts, and plant-based protein',
        ingredients: ['Quinoa', 'Mixed berries', 'Almonds', 'Chia seeds'],
        macros: { protein: 15, carbs: 45, fats: 12 },
      });
    } else if (preferences.includes('keto')) {
      meals.push({
        id: 'fallback-keto-breakfast',
        name: 'Keto Avocado Eggs',
        type: 'breakfast',
        calories: 400,
        protein: 20,
        description: 'Eggs cooked in avocado with cheese',
        ingredients: ['Avocado', 'Eggs', 'Cheese', 'Bacon'],
        macros: { protein: 20, carbs: 8, fats: 32 },
      });
    } else {
      meals.push({
        id: 'fallback-protein-breakfast',
        name: 'Protein Pancakes',
        type: 'breakfast',
        calories: 300,
        protein: 25,
        description: 'High-protein pancakes with berries',
        ingredients: ['Protein powder', 'Eggs', 'Oats', 'Berries'],
        macros: { protein: 25, carbs: 30, fats: 8 },
      });
    }

    // Lunch
    if (goals.includes('muscle-gain')) {
      meals.push({
        id: 'fallback-muscle-lunch',
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
        macros: { protein: 40, carbs: 50, fats: 12 },
      });
    } else {
      meals.push({
        id: 'fallback-balanced-lunch',
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
        macros: { protein: 20, carbs: 15, fats: 25 },
      });
    }

    // Dinner
    if (preferences.includes('vegetarian')) {
      meals.push({
        id: 'fallback-vegetarian-dinner',
        name: 'Veggie Stir Fry',
        type: 'dinner',
        calories: 400,
        protein: 18,
        description: 'Colorful vegetable stir-fry with tofu',
        ingredients: ['Tofu', 'Mixed vegetables', 'Brown rice', 'Soy sauce'],
        macros: { protein: 18, carbs: 45, fats: 15 },
      });
    } else {
      meals.push({
        id: 'fallback-balanced-dinner',
        name: 'Balanced Plate',
        type: 'dinner',
        calories: 450,
        protein: 30,
        description: 'Perfect balance of protein, carbs, and vegetables',
        ingredients: ['Salmon', 'Quinoa', 'Asparagus', 'Lemon'],
        macros: { protein: 30, carbs: 35, fats: 18 },
      });
    }

    return meals;
  }

  private getFallbackWorkouts(user: UserProfile): WorkoutRecommendation[] {
    const level = user.fitnessLevel || 'beginner';
    const goals = user.fitnessGoals || [];

    const workouts: WorkoutRecommendation[] = [];

    if (goals.includes('weight-loss')) {
      workouts.push({
        id: 'fallback-hiit-workout',
        name: 'Fat Burning HIIT',
        duration: level === 'beginner' ? 20 : level === 'advanced' ? 40 : 30,
        type: 'cardio',
        difficulty: level,
        description: 'High-intensity interval training to maximize fat burn',
        exercises: [
          'Burpees',
          'Mountain climbers',
          'Jump squats',
          'High knees',
        ],
        targetMuscles: ['full body', 'cardiovascular'],
      });
    } else if (goals.includes('muscle-gain')) {
      workouts.push({
        id: 'fallback-strength-workout',
        name: 'Muscle Building Strength',
        duration: level === 'beginner' ? 45 : level === 'advanced' ? 75 : 60,
        type: 'strength',
        difficulty: level,
        description: 'Compound movements for maximum muscle growth',
        exercises: ['Squats', 'Deadlifts', 'Bench press', 'Pull-ups'],
        targetMuscles: ['legs', 'back', 'chest', 'arms'],
      });
    } else {
      workouts.push({
        id: 'fallback-balanced-workout',
        name: 'Full Body Workout',
        duration: level === 'beginner' ? 30 : level === 'advanced' ? 60 : 45,
        type: 'mixed',
        difficulty: level,
        description: 'Balanced workout targeting all major muscle groups',
        exercises: ['Push-ups', 'Squats', 'Planks', 'Lunges'],
        targetMuscles: ['full body'],
      });
    }

    // Add a second workout
    workouts.push({
      id: 'fallback-cardio-workout',
      name: 'Cardio Endurance',
      duration: level === 'beginner' ? 25 : level === 'advanced' ? 45 : 35,
      type: 'cardio',
      difficulty: level,
      description: 'Improve cardiovascular health and endurance',
      exercises: ['Running', 'Cycling', 'Jump rope', 'Rowing'],
      targetMuscles: ['cardiovascular', 'legs'],
    });

    return workouts;
  }

  private getFallbackQuote(goal?: string): string {
    const quotes = {
      'weight-loss':
        "Every workout brings you closer to your goal. Your body can do it. It's your mind you need to convince.",
      'muscle-gain':
        "Strength doesn't come from what you can do. It comes from overcoming the things you thought you couldn't.",
      endurance:
        "The miracle isn't that you finished. The miracle is that you had the courage to start.",
      'general-fitness':
        "Success isn't given. It's earned. On the track, on the field, in every difficult decision.",
      default:
        'Great things never come from comfort zones. Push yourself today!',
    };

    return quotes[goal as keyof typeof quotes] || quotes.default;
  }
}
