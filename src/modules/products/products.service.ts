import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // 1. Lihat Semua Produk
  async findAll() {
    return this.prisma.product.findMany();
  }

  // 2. Tambah Produk (Admin Only nanti)
  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  // 3. Hapus Produk
  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}