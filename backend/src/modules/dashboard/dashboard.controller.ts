/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  private get service(): any {
    return this.dashboardService as any;
  }

  @Get('overview/:userId')
  async getDashboardOverview(@Param('userId') userId: string): Promise<any> {
    return await this.service.getDashboardOverview(userId);
  }

  @Get('user-data/:userId')
  async getUserDashboardData(@Param('userId') userId: string): Promise<any> {
    return await this.service.getUserDashboardData(userId);
  }

  @Get('stats/:userId')
  async getUserStats(@Param('userId') userId: string): Promise<any> {
    return await this.service.getUserStats(userId);
  }

  @Get('ai-content/:userId')
  async getAIContent(@Param('userId') userId: string): Promise<any> {
    return await this.service.getAIContent(userId);
  }

  @Get('achievements/:userId')
  async getUserAchievements(@Param('userId') userId: string): Promise<any> {
    return await this.service.getUserAchievements(userId);
  }

  @Get('leaderboard')
  async getLeaderboard(): Promise<any> {
    return await this.service.getLeaderboard();
  }

  @Post('log-workout')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logWorkout(@Body() workoutData: any): Promise<any> {
    return await this.service.logWorkout(workoutData);
  }

  @Post('log-meal')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logMeal(@Body() mealData: any): Promise<any> {
    return await this.service.logMeal(mealData);
  }

  @Post('join-challenge')
  @UsePipes(new ValidationPipe({ transform: true }))
  async joinChallenge(
    @Body()
    data: {
      userId: string;
      challengeId: string;
      challengeType: 'daily' | 'weekly';
    },
  ): Promise<any> {
    return await this.service.joinChallenge(
      data.userId,
      data.challengeId,
      data.challengeType,
    );
  }

  @Post('complete-challenge')
  @UsePipes(new ValidationPipe({ transform: true }))
  async completeChallenge(
    @Body() data: { userId: string; challengeEntryId: string },
  ): Promise<any> {
    return await this.service.completeChallenge(
      data.userId,
      data.challengeEntryId,
    );
  }

  @Post('create-sample-challenges')
  async createSampleChallenges(): Promise<any> {
    return await this.service.createSampleChallenges();
  }

  @Get('challenges')
  async getChallenges(): Promise<any> {
    return await this.service.getChallenges();
  }

  @Get('weekly-challenge-progress/:userId')
  async getWeeklyChallengeProgress(
    @Param('userId') userId: string,
  ): Promise<any> {
    return await this.service.getWeeklyChallengeProgress(userId);
  }

  @Post('update-weekly-progress')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateWeeklyChallengeProgress(
    @Body()
    data: {
      userId: string;
      activityType: 'workout' | 'meal';
      activityData: any;
    },
  ): Promise<any> {
    return await this.service.updateWeeklyChallengeProgress(
      data.userId,
      data.activityType,
      data.activityData,
    );
  }
}
