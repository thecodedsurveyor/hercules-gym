import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  Min,
  Max,
  IsObject,
} from 'class-validator';

export class OnboardingDto {
  @IsString()
  userId: string;

  // Basic Information
  @IsNumber()
  @Min(13)
  @Max(120)
  age: number;

  @IsString()
  gender: string;

  @IsNumber()
  @Min(100)
  @Max(250)
  height: number;

  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;

  // Fitness Goals
  @IsArray()
  @IsString({ each: true })
  fitnessGoals: string[];

  @IsArray()
  @IsString({ each: true })
  goalPriority: string[];

  @IsString()
  primaryGoal: string;

  // Activity Level
  @IsString()
  fitnessLevel: string;

  @IsOptional()
  @IsString()
  activityLevel: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  workoutFrequency: number;

  // Body Composition (Optional)
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  bodyFatPercentage?: number;

  @IsOptional()
  @IsObject()
  measurements?: {
    waist?: number;
    chest?: number;
    arms?: number;
    thighs?: number;
  };

  // Dietary Preferences
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryPreferences?: string[];

  @IsBoolean()
  onboardingCompleted: boolean;
}
