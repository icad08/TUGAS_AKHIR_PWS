import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
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
