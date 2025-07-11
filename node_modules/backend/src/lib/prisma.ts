import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma client
const prisma = new PrismaClient();

export default prisma;
