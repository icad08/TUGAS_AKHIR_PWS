import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(req: any): Promise<{
        totalRequest: number;
        totalShops: number;
        totalProducts: number;
        growth: string;
    }>;
}
