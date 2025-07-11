import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get('daily/:userId')
  async getDailyChallenges(@Param('userId') userId: string) {
    return this.challengesService.getDailyChallenges(userId);
  }

  @Get('weekly/:userId')
  async getWeeklyChallenges(@Param('userId') userId: string) {
    return this.challengesService.getWeeklyChallenges(userId);
  }

  @Post('join')
  @UsePipes(new ValidationPipe({ transform: true }))
  async joinChallenge(@Body() challengeData: any) {
    return this.challengesService.joinChallenge(challengeData);
  }

  @Post('complete')
  @UsePipes(new ValidationPipe({ transform: true }))
  async completeChallenge(@Body() completionData: any) {
    return this.challengesService.completeChallenge(completionData);
  }

  @Get('user-challenges/:userId')
  async getUserChallenges(@Param('userId') userId: string) {
    return this.challengesService.getUserChallenges(userId);
  }
}
