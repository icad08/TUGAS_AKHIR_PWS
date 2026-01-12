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
exports.CoffeeShopsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const coffee_shops_service_1 = require("./coffee-shops.service");
const create_coffee_shop_dto_1 = require("./dto/create-coffee-shop.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let CoffeeShopsController = class CoffeeShopsController {
    constructor(coffeeShopsService) {
        this.coffeeShopsService = coffeeShopsService;
    }
    create(createCoffeeShopDto) {
        return this.coffeeShopsService.create(createCoffeeShopDto);
    }
    findAll() {
        return this.coffeeShopsService.findAll();
    }
    findOne(id) {
        return this.coffeeShopsService.findOne(+id);
    }
};
exports.CoffeeShopsController = CoffeeShopsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah Toko (ADMIN ONLY)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_shop_dto_1.CreateCoffeeShopDto]),
    __metadata("design:returntype", void 0)
], CoffeeShopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List Semua Toko & Menunya' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoffeeShopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detail Satu Toko' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeeShopsController.prototype, "findOne", null);
exports.CoffeeShopsController = CoffeeShopsController = __decorate([
    (0, swagger_1.ApiTags)('Coffee Shops'),
    (0, common_1.Controller)('coffee-shops'),
    __metadata("design:paramtypes", [coffee_shops_service_1.CoffeeShopsService])
], CoffeeShopsController);
//# sourceMappingURL=coffee-shops.controller.js.map