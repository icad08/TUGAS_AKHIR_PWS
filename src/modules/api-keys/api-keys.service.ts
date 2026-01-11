import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  // 1. Generate Key Baru
  async generateKey(userId: number) {
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

  // 2. Cek Status Key
  async getKeyStatus(userId: number) {
    const key = await this.prisma.apiKey.findUnique({
      where: { userId },
    });

    if (!key) return null;

    return {
      prefix: key.keyPrefix,
      isActive: key.isActive,
      createdAt: key.createdAt,
    };
  }

  // 3. Revoke Key
  async revokeKey(userId: number) {
    return this.prisma.apiKey.update({
      where: { userId },
      data: { isActive: false },
    });
  }

  // 4. Validasi API Key 
  async validateApiKey(rawKey: string) {
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
}