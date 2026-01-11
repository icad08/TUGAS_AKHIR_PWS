import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        name: string;
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        createdAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
