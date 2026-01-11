import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeysService } from '../../modules/api-keys/api-keys.service';

@Injectable()
// PASTIKAN NAMA CLASS-NYA INI:
export class ProductGuard extends AuthGuard('jwt') { 
  constructor(private apiKeyService: ApiKeysService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key']; // Cek header x-api-key

    // Skenario 1: Jika User membawa API Key
    if (apiKey) {
      const validKey = await this.apiKeyService.validateApiKey(apiKey);
      if (validKey) {
        request.user = validKey.user; // Tempel data user ke request
        return true; // Silakan masuk
      }
      throw new UnauthorizedException('API Key Invalid atau Kadaluarsa!');
    }

    // Skenario 2: Jika TIDAK bawa API Key, kita paksa cek JWT (Admin)
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (err) {
      throw new UnauthorizedException('Anda butuh API Key atau Login sebagai Admin!');
    }
  }
}