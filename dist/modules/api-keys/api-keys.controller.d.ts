import { ApiKeysService } from './api-keys.service';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    generate(req: any): Promise<{
        apiKey: string;
    }>;
    getStatus(req: any): Promise<{
        prefix: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    revoke(req: any): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        keyPrefix: string;
        keyHash: string;
        userId: number;
    }>;
}
