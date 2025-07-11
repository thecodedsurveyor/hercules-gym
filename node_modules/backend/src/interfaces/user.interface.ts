import { Prisma } from '@prisma/client';

// Use Prisma's generated types as base
export type CreateUserDto = Omit<
  Prisma.UserCreateInput,
  'createdAt' | 'updatedAt'
>;

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'email' | 'password'>>;

// Additional type for response (excluding sensitive data)
export type UserResponse = Omit<CreateUserDto, 'password'> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
