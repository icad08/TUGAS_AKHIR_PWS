import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiSecurity, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

// --- IMPORT SECURITY ---
import { Role } from '@prisma/client'; 
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'; 
import { ProductGuard } from '../../common/guards/product.guard'; 
import { RolesGuard } from '../../common/guards/roles.guard'; 
import { Roles } from '../../common/decorators/roles.decorator'; 

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. GET: Tetap pakai API Key (Biar User/Apps lain bisa baca data)
  @Get()
  @UseGuards(ProductGuard) 
  @ApiSecurity('x-api-key') 
  @ApiOperation({ summary: 'List Produk (Public - Butuh API Key)' })
  findAll() {
    return this.productsService.findAll();
  }

  // 2. POST: Dijaga Satpam ADMIN (Harus Login & Role = ADMIN)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.ADMIN)                  
  @ApiBearerAuth()                   
  @ApiOperation({ summary: 'Tambah Produk (ADMIN ONLY)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // 3. DELETE: Dijaga Satpam ADMIN juga
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)                   
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus Produk (ADMIN ONLY)' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}