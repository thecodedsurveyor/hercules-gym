import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as UserService from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { OnboardingDto } from './dto/onboarding.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(@Body() registerData: RegisterUserDto): Promise<User> {
    return UserService.registerUser(registerData);
  }

  @Post('onboarding')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveOnboarding(@Body() onboardingData: OnboardingDto): Promise<User> {
    return UserService.saveOnboarding(onboardingData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() loginData: LoginDto) {
    return UserService.loginUser(loginData);
  }

  @Post()
  async createUser(@Body() userData: any): Promise<User> {
    return UserService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return UserService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: any,
  ): Promise<User> {
    return UserService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return UserService.deleteUser(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return UserService.getAllUsers();
  }
}
