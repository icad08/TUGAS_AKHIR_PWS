import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // Kita export supaya AuthModule nanti bisa pakai
})
export class UsersModule {}
