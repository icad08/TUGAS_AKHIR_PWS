import { ExecutionContext } from '@nestjs/common';
import { ApiKeysService } from '../../modules/api-keys/api-keys.service';
declare const ProductGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class ProductGuard extends ProductGuard_base {
    private apiKeyService;
    constructor(apiKeyService: ApiKeysService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
