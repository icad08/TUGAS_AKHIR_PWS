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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const crypto = require("crypto");
let ApiKeysService = class ApiKeysService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateApiKey(apiKey) {
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const validKey = await this.prisma.apiKey.findFirst({
            where: {
                keyHash: keyHash,
                isActive: true,
            },
            include: { user: true }
        });
        return validKey;
    }
    async createKey(userId) {
        const apiKey = 'pk_live_' + crypto.randomBytes(24).toString('hex');
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const keyPrefix = apiKey.substring(0, 15);
        await this.prisma.apiKey.upsert({
            where: { userId: userId },
            update: {
                keyHash: keyHash,
                keyPrefix: keyPrefix,
                isActive: true,
            },
            create: {
                userId: userId,
                keyHash: keyHash,
                keyPrefix: keyPrefix,
                isActive: true,
            },
        });
        return { apiKey };
    }
    async getKeyStatus(userId) {
        const key = await this.prisma.apiKey.findUnique({
            where: { userId },
        });
        return {
            isActive: key ? key.isActive : false,
            prefix: key ? key.keyPrefix : null
        };
    }
    async revokeKey(userId) {
        return this.prisma.apiKey.update({
            where: { userId },
            data: { isActive: false },
        });
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiKeysService);
//# sourceMappingURL=api-keys.service.js.map