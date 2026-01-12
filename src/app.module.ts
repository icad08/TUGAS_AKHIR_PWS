import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module'; 
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ProductsModule } from './modules/products/products.module';
import { CoffeeShopsModule } from './modules/coffee-shops/coffee-shops.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule,
    ApiKeysModule,
    ProductsModule,
    CoffeeShopsModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}