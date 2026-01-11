import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Ambil token dari Header
      ignoreExpiration: false, // Tolak jika token kadaluarsa
      secretOrKey: process.env.JWT_SECRET || 'rahasia_default', // Kunci rahasia yang sama
    });
  }

  async validate(payload: any) {
    // Ini data yang akan nempel di request.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}