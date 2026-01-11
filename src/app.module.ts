import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module'; 
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule,
    ApiKeysModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}