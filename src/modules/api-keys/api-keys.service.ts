import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  // --- 1. VALIDASI KEY (Gak berubah) ---
  async validateApiKey(apiKey: string) {
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

  // --- 2. GENERATE KEY (INI YANG KITA PERBAIKI) ---
  async createKey(userId: number) {
    // Generate ramuan kunci baru
    const apiKey = 'pk_live_' + crypto.randomBytes(24).toString('hex');
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    const keyPrefix = apiKey.substring(0, 15);

    // 🔥 PAKAI UPSERT (Update or Insert)
    // "Cari user ini. Kalau ada, update datanya. Kalau gak ada, bikin baru."
    await this.prisma.apiKey.upsert({
      where: { userId: userId }, // Kuncinya di sini (karena userId itu Unique)
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

    return { apiKey }; // Balikin kunci mentahnya
  }

  // --- 3. CEK STATUS (Gak berubah) ---
  async getKeyStatus(userId: number) {
    const key = await this.prisma.apiKey.findUnique({ // Ganti findFirst jadi findUnique biar lebih cepat
      where: { userId },
    });
    // Cek apakah key ada DAN aktif
    return { 
      isActive: key ? key.isActive : false, 
      prefix: key ? key.keyPrefix : null 
    };
  }

  // --- 4. CABUT KEY (Gak berubah) ---
  async revokeKey(userId: number) {
    return this.prisma.apiKey.update({
      where: { userId },
      data: { isActive: false },
    });
  }
}