import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import prisma from './lib/prisma';

async function bootstrap() {
  console.log('🚀 Starting Hercules Gym Backend...');

  // Test environment variables
  console.log('📊 Environment Check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- PORT:', process.env.PORT ?? 3002);
  console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log(
    '- DATABASE_URL preview:',
    process.env.DATABASE_URL
      ? process.env.DATABASE_URL.substring(0, 50) + '...'
      : 'NOT FOUND',
  );

  // Test MongoDB connection
  console.log('🔌 Testing MongoDB connection...');
  try {
    await prisma.$connect();
    console.log('✅ MongoDB connection successful!');

    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Database connected! Found ${userCount} users in database.`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('📝 Full error:', error);
  }

  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 3002);
  console.log(
    `🎯 Backend server running on http://localhost:${process.env.PORT ?? 3002}`,
  );
}
bootstrap().catch((err) => console.error('Failed to start server:', err));
