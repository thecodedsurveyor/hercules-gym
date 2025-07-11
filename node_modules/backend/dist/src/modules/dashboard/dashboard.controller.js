"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    get service() {
        return this.dashboardService;
    }
    async getDashboardOverview(userId) {
        return await this.service.getDashboardOverview(userId);
    }
    async getUserDashboardData(userId) {
        return await this.service.getUserDashboardData(userId);
    }
    async getUserStats(userId) {
        return await this.service.getUserStats(userId);
    }
    async getAIContent(userId) {
        return await this.service.getAIContent(userId);
    }
    async getUserAchievements(userId) {
        return await this.service.getUserAchievements(userId);
    }
    async getLeaderboard() {
        return await this.service.getLeaderboard();
    }
    async logWorkout(workoutData) {
        return await this.service.logWorkout(workoutData);
    }
    async logMeal(mealData) {
        return await this.service.logMeal(mealData);
    }
    async joinChallenge(data) {
        return await this.service.joinChallenge(data.userId, data.challengeId, data.challengeType);
    }
    async completeChallenge(data) {
        return await this.service.completeChallenge(data.userId, data.challengeEntryId);
    }
    async createSampleChallenges() {
        return await this.service.createSampleChallenges();
    }
    async getChallenges() {
        return await this.service.getChallenges();
    }
    async getWeeklyChallengeProgress(userId) {
        return await this.service.getWeeklyChallengeProgress(userId);
    }
    async updateWeeklyChallengeProgress(data) {
        return await this.service.updateWeeklyChallengeProgress(data.userId, data.activityType, data.activityData);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('overview/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardOverview", null);
__decorate([
    (0, common_1.Get)('user-data/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUserDashboardData", null);
__decorate([
    (0, common_1.Get)('stats/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)('ai-content/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAIContent", null);
__decorate([
    (0, common_1.Get)('achievements/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUserAchievements", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Post)('log-workout'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "logWorkout", null);
__decorate([
    (0, common_1.Post)('log-meal'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "logMeal", null);
__decorate([
    (0, common_1.Post)('join-challenge'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "joinChallenge", null);
__decorate([
    (0, common_1.Post)('complete-challenge'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "completeChallenge", null);
__decorate([
    (0, common_1.Post)('create-sample-challenges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "createSampleChallenges", null);
__decorate([
    (0, common_1.Get)('challenges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getChallenges", null);
__decorate([
    (0, common_1.Get)('weekly-challenge-progress/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getWeeklyChallengeProgress", null);
__decorate([
    (0, common_1.Post)('update-weekly-progress'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "updateWeeklyChallengeProgress", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map