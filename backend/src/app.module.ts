import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ChallengesModule } from './modules/challenges/challenges.module';

@Module({
  imports: [UserModule, DashboardModule, ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
