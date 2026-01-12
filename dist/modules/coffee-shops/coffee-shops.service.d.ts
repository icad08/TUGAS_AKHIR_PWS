import { PrismaService } from '../../prisma/prisma.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
export declare class CoffeeShopsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCoffeeShopDto): import(".prisma/client").Prisma.Prisma__CoffeeShopClient<{
        name: string;
        address: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            coffeeShopId: number | null;
        }[];
    } & {
        name: string;
        address: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CoffeeShopClient<{
        products: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            coffeeShopId: number | null;
        }[];
    } & {
        name: string;
        address: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
