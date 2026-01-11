import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }[]>;
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        updatedAt: Date;
    }>;
}
