import { PrismaService } from '../../prisma/prisma.service';
export declare class ApiKeysService {
    private prisma;
    constructor(prisma: PrismaService);
    generateKey(userId: number): Promise<{
        apiKey: string;
    }>;
    getKeyStatus(userId: number): Promise<{
        prefix: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    revokeKey(userId: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        keyPrefix: string;
        keyHash: string;
        userId: number;
    }>;
    validateApiKey(rawKey: string): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            createdAt: Date;
        };
    } & {
        id: number;
        isActive: boolean;
        createdAt: Date;
        keyPrefix: string;
        keyHash: string;
        userId: number;
    }>;
}
