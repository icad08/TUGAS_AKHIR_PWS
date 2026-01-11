import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }[]>;
    create(body: {
        name: string;
        price: number;
        description?: string;
    }): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }>;
}
