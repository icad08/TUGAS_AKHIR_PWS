import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductGuard } from '../../common/guards/product.guard'; // Pastikan path ini bener
import { ApiTags, ApiSecurity, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'; // <--- 1. IMPORT INI

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(ProductGuard)
  @ApiSecurity('x-api-key') // <--- 2. INI PENTING! Biar Swagger bawa API Key kamu
  @ApiBearerAuth()          // <--- Ini biar dia juga support Token (opsional)
  @ApiOperation({ summary: 'List Produk (Butuh API Key / Admin)' })
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(ProductGuard)
  @ApiBearerAuth() // Kalau create biasanya butuh Admin (Token)
  @ApiOperation({ summary: 'Tambah Produk (Khusus Admin)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  @UseGuards(ProductGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus Produk' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}