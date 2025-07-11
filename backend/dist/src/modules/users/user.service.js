"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.saveOnboarding = exports.getAllUsers = exports.getUserByEmail = exports.deleteUser = exports.updateUser = exports.getUser = exports.registerUser = exports.createUser = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = async (data) => {
    return prisma_1.default.user.create({ data });
};
exports.createUser = createUser;
const registerUser = async (registerData) => {
    const { email, password, name, fitnessGoal, experienceLevel, preferredTime } = registerData;
    const existingUser = await (0, exports.getUserByEmail)(email);
    if (existingUser) {
        throw new common_1.ConflictException('User with this email already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
        name,
        email,
        password: hashedPassword,
        fitnessGoal,
        experienceLevel,
        preferredTime,
        onboardingCompleted: false,
        onboardingStep: 0,
        fitnessGoals: [],
        goalPriority: [],
        dietaryPreferences: [],
    };
    return prisma_1.default.user.create({
        data: userData,
    });
};
exports.registerUser = registerUser;
const getUser = async (id) => {
    return prisma_1.default.user.findUnique({ where: { id } });
};
exports.getUser = getUser;
const updateUser = async (id, data) => {
    return prisma_1.default.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma_1.default.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
const getUserByEmail = async (email) => {
    return prisma_1.default.user.findUnique({ where: { email } });
};
exports.getUserByEmail = getUserByEmail;
const getAllUsers = async () => {
    return prisma_1.default.user.findMany();
};
exports.getAllUsers = getAllUsers;
const saveOnboarding = async (onboardingData) => {
    const { userId, ...data } = onboardingData;
    const existingUser = await (0, exports.getUser)(userId);
    if (!existingUser) {
        throw new common_1.NotFoundException('User not found');
    }
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            age: data.age,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            fitnessGoals: data.fitnessGoals,
            goalPriority: data.goalPriority,
            primaryGoal: data.primaryGoal,
            fitnessLevel: data.fitnessLevel,
            workoutFrequency: data.workoutFrequency,
            bodyFatPercentage: data.bodyFatPercentage,
            measurements: data.measurements,
            dietaryPreferences: data.dietaryPreferences || [],
            onboardingCompleted: data.onboardingCompleted,
            totalPoints: 50,
            currentStreak: 1,
            weeklyWorkoutGoal: data.workoutFrequency || 3,
            updatedAt: new Date(),
        },
    });
};
exports.saveOnboarding = saveOnboarding;
const loginUser = async (loginData) => {
    const { email, password } = loginData;
    const user = await (0, exports.getUserByEmail)(email);
    if (!user) {
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
    const now = new Date();
    const lastLogin = user.lastLogin
        ? new Date(user.lastLogin)
        : null;
    let currentStreak = user.currentStreak || 0;
    let longestStreak = user.longestStreak || 0;
    const achievements = [];
    if (lastLogin) {
        const timeDiff = now.getTime() - lastLogin.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        if (daysDiff === 1) {
            currentStreak += 1;
        }
        else if (daysDiff > 1) {
            currentStreak = 1;
        }
    }
    else {
        currentStreak = 1;
    }
    if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
    }
    if (currentStreak === 7) {
        achievements.push('Week Warrior');
    }
    else if (currentStreak === 14) {
        achievements.push('Two Week Champion');
    }
    else if (currentStreak === 30) {
        achievements.push('Monthly Master');
    }
    else if (currentStreak === 100) {
        achievements.push('Century Streak');
    }
    const updatedUser = await (0, exports.updateUser)(user.id, {
        lastActivityDate: now,
        currentStreak,
        longestStreak,
        totalPoints: (user.totalPoints || 0) + 5,
    });
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    const { password: userPassword, ...userWithoutPassword } = updatedUser;
    return {
        user: userWithoutPassword,
        token,
        streak: {
            current: currentStreak,
            longest: longestStreak,
            achievements,
        },
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.service.js.map