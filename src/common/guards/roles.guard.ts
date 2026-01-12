import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Cek endpoint ini butuh role apa?
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Kalau gak ada label role, berarti bebas akses
    if (!requiredRoles) {
      return true;
    }

    // 2. Ambil data user yang lagi login (dari JWT)
    const { user } = context.switchToHttp().getRequest();

    // 3. Cek apakah role user cocok dengan yang diminta
    if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Maaf, Anda bukan Admin! Akses ditolak 🚫');
    }

    return true;
  }
}