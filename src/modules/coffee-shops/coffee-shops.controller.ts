import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CoffeeShopsService } from './coffee-shops.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'; 
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Coffee Shops')
@Controller('coffee-shops')
export class CoffeeShopsController {
  constructor(private readonly coffeeShopsService: CoffeeShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah Toko (ADMIN ONLY)' })
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeeShopsService.create(createCoffeeShopDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Semua Toko & Menunya' })
  findAll() {
    return this.coffeeShopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail Satu Toko' })
  findOne(@Param('id') id: string) {
    return this.coffeeShopsService.findOne(+id);
  }
}