import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: number) {
    // 1. Hitung Berapa Toko yang ada
    const totalShops = await this.prisma.coffeeShop.count();

    // 2. Hitung Berapa Produk yang ada
    const totalProducts = await this.prisma.product.count();

    // 3. (Opsional) Anggaplah "Total Request" = Total Data yang dikelola
    const totalActivity = totalShops + totalProducts;

    return {
      totalRequest: totalActivity,
      totalShops: totalShops,
      totalProducts: totalProducts,
      growth: '+5%' // Hardcode dikit gapapa buat pemanis
    };
  }
}