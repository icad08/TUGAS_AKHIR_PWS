import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductGuard } from '../../common/guards/product.guard';

@Controller('products')
@UseGuards(ProductGuard) 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; price: number; description?: string }) {
    return this.productsService.create({
      name: body.name,
      price: body.price,
      description: body.description,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id); // Convert string to number
  }
}
