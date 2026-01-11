import { PrismaService } from '../../prisma/prisma.service';
export declare class ApiKeysService {
    private prisma;
    constructor(prisma: PrismaService);
    validateApiKey(apiKey: string): Promise<{
        user: {
            id: number;
            isActive: boolean;
            createdAt: Date;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: number;
        keyPrefix: string;
        keyHash: string;
        userId: number;
        isActive: boolean;
        createdAt: Date;
    }>;
    createKey(userId: number): Promise<{
        apiKey: string;
    }>;
    getKeyStatus(userId: number): Promise<{
        isActive: boolean;
        prefix: string;
    }>;
    revokeKey(userId: number): Promise<{
        id: number;
        keyPrefix: string;
        keyHash: string;
        userId: number;
        isActive: boolean;
        createdAt: Date;
    }>;
}
