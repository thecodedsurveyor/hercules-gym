import { Prisma } from '@prisma/client';
export type CreateUserDto = Omit<Prisma.UserCreateInput, 'createdAt' | 'updatedAt'>;
export type UpdateUserDto = Partial<Omit<CreateUserDto, 'email' | 'password'>>;
export type UserResponse = Omit<CreateUserDto, 'password'> & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
