import { PrismaService } from 'src/prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(userId: number): Promise<{
        totalRequest: number;
        totalShops: number;
        totalProducts: number;
        growth: string;
    }>;
}
