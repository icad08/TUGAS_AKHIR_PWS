import { Controller, Post, Get, Put, UseGuards, Request } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('ApiKeys')
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate API Key Baru (Perlu Login)' })
  async generateKey(@Request() req) {
    // FIX: Pakai userId (sesuai output JWT Strategy standar)
    const userId = req.user.userId || req.user.id; 
    return this.apiKeysService.createKey(userId);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cek Status API Key User' })
  async getStatus(@Request() req) {
    const userId = req.user.userId || req.user.id;
    return this.apiKeysService.getKeyStatus(userId);
  }

  @Put('revoke')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Matikan API Key' })
  async revokeKey(@Request() req) {
    const userId = req.user.userId || req.user.id;
    return this.apiKeysService.revokeKey(userId);
  }
}