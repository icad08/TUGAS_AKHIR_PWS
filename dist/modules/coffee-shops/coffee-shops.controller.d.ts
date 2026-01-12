import { CoffeeShopsService } from './coffee-shops.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
export declare class CoffeeShopsController {
    private readonly coffeeShopsService;
    constructor(coffeeShopsService: CoffeeShopsService);
    create(createCoffeeShopDto: CreateCoffeeShopDto): import(".prisma/client").Prisma.Prisma__CoffeeShopClient<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CoffeeShopClient<{
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
