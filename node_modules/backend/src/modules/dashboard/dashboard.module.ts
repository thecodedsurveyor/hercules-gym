import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AIService } from '../../services/ai.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, AIService],
})
export class DashboardModule {}
