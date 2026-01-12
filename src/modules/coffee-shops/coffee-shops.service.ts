import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';

@Injectable()
export class CoffeeShopsService {
  constructor(private prisma: PrismaService) {}

  // Create Toko
  create(data: CreateCoffeeShopDto) {
    return this.prisma.coffeeShop.create({ data });
  }

  // Get All (Include Menu)
  findAll() {
    return this.prisma.coffeeShop.findMany({
      include: { products: true } 
    });
  }

  // Get One (Include Menu)
  findOne(id: number) {
    return this.prisma.coffeeShop.findUnique({
      where: { id },
      include: { products: true }
    });
  }
}