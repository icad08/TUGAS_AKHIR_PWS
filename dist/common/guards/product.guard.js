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
exports.ProductGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const api_keys_service_1 = require("../../modules/api-keys/api-keys.service");
let ProductGuard = class ProductGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(apiKeyService) {
        super();
        this.apiKeyService = apiKeyService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if (apiKey) {
            const validKey = await this.apiKeyService.validateApiKey(apiKey);
            if (validKey) {
                request.user = validKey.user;
                return true;
            }
            throw new common_1.UnauthorizedException('API Key Invalid atau Kadaluarsa!');
        }
        try {
            return (await super.canActivate(context));
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Anda butuh API Key atau Login sebagai Admin!');
        }
    }
};
exports.ProductGuard = ProductGuard;
exports.ProductGuard = ProductGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_keys_service_1.ApiKeysService])
], ProductGuard);
//# sourceMappingURL=product.guard.js.map