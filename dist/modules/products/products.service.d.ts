import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: Prisma.Decimal;
        stock: number;
        coffeeShopId: number | null;
    }[]>;
    create(data: Prisma.ProductCreateInput): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: Prisma.Decimal;
        stock: number;
        coffeeShopId: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: Prisma.Decimal;
        stock: number;
        coffeeShopId: number | null;
    }>;
}
