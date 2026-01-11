import { Controller, Post, Get, Put, UseGuards, Request } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api-keys')
@UseGuards(JwtAuthGuard) // wajib login pakai JWT
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  // 1. Generate API Key Baru
  @Post('generate')
  async generate(@Request() req) {
    // req.user.userId didapat dari JWT Token yang sudah diterjemahkan
    return this.apiKeysService.generateKey(req.user.userId);
  }

  // 2. Cek Status Key
  @Get('status')
  async getStatus(@Request() req) {
    return this.apiKeysService.getKeyStatus(req.user.userId);
  }

  // 3. Matikan Key (Revoke)
  @Put('revoke')
  async revoke(@Request() req) {
    return this.apiKeysService.revokeKey(req.user.userId);
  }
}