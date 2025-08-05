"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_1 = require("./lib/prisma");
async function bootstrap() {
    console.log('🚀 Starting Hercules Gym Backend...');
    console.log('📊 Environment Check:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- PORT:', process.env.PORT ?? 3002);
    console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('- DATABASE_URL preview:', process.env.DATABASE_URL
        ? process.env.DATABASE_URL.substring(0, 50) + '...'
        : 'NOT FOUND');
    console.log('🔌 Testing MongoDB connection...');
    try {
        await prisma_1.default.$connect();
        console.log('✅ MongoDB connection successful!');
        const userCount = await prisma_1.default.user.count();
        console.log(`📊 Database connected! Found ${userCount} users in database.`);
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.error('📝 Full error:', error);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
    });
    await app.listen(process.env.PORT ?? 3002);
    console.log(`🎯 Backend server running on http://localhost:${process.env.PORT ?? 3002}`);
}
bootstrap().catch((err) => console.error('Failed to start server:', err));
//# sourceMappingURL=main.js.map