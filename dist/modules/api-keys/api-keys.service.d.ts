import { PrismaService } from '../../prisma/prisma.service';
export declare class ApiKeysService {
    private prisma;
    constructor(prisma: PrismaService);
    validateApiKey(apiKey: string): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        isActive: boolean;
        createdAt: Date;
        keyPrefix: string;
        keyHash: string;
        userId: number;
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
        isActive: boolean;
        createdAt: Date;
        keyPrefix: string;
        keyHash: string;
        userId: number;
    }>;
}
