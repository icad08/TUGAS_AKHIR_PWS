import { ApiKeysService } from './api-keys.service';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    generateKey(req: any): Promise<{
        apiKey: string;
    }>;
    getStatus(req: any): Promise<{
        isActive: boolean;
        prefix: string;
    }>;
    revokeKey(req: any): Promise<{
        id: number;
        keyPrefix: string;
        keyHash: string;
        userId: number;
        isActive: boolean;
        createdAt: Date;
    }>;
}
