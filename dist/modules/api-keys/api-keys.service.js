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
const bcrypt = require("bcrypt");
let ApiKeysService = class ApiKeysService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateKey(userId) {
        const rawKey = 'pk_live_' + crypto.randomBytes(24).toString('hex');
        const hash = await bcrypt.hash(rawKey, 10);
        const prefix = rawKey.substring(0, 10);
        await this.prisma.apiKey.upsert({
            where: { userId },
            update: { keyHash: hash, keyPrefix: prefix, isActive: true },
            create: { userId, keyHash: hash, keyPrefix: prefix },
        });
        return { apiKey: rawKey };
    }
    async getKeyStatus(userId) {
        const key = await this.prisma.apiKey.findUnique({
            where: { userId },
        });
        if (!key)
            return null;
        return {
            prefix: key.keyPrefix,
            isActive: key.isActive,
            createdAt: key.createdAt,
        };
    }
    async revokeKey(userId) {
        return this.prisma.apiKey.update({
            where: { userId },
            data: { isActive: false },
        });
    }
    async validateApiKey(rawKey) {
        const prefix = rawKey.substring(0, 10);
        const apiKeyRecord = await this.prisma.apiKey.findUnique({
            where: { keyPrefix: prefix },
            include: { user: true },
        });
        if (!apiKeyRecord || !apiKeyRecord.isActive || !apiKeyRecord.user.isActive) {
            return null;
        }
        const isMatch = await bcrypt.compare(rawKey, apiKeyRecord.keyHash);
        if (isMatch) {
            return apiKeyRecord;
        }
        return null;
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiKeysService);
//# sourceMappingURL=api-keys.service.js.map