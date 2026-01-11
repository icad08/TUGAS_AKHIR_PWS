import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Logika Register
  async register(registerDto: RegisterDto) {
    // Cek apakah email sudah ada?
    const existingUser = await this.usersService.findOne(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar!');
    }

    // Enkripsi Password (Hashing)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Simpan ke Database
    const newUser = await this.usersService.createUser({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: 'USER', // Default user biasa
    });

    // Hapus password dari return response agar aman
    const { password, ...result } = newUser;
    return result;
  }

  // 2. Logika Login
  async login(loginDto: LoginDto) {
    // Cari user by email
    const user = await this.usersService.findOne(loginDto.email);
    
    // Jika user gak ada ATAU password salah
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email atau Password salah!');
    }

    // Jika sukses, buatkan Token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      message: 'Login berhasil!',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      }
    };
  }
}