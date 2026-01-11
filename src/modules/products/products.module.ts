import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ApiKeysModule } from '../api-keys/api-keys.module';

@Module({
  imports: [ApiKeysModule], // Agar ProductGuard bisa baca Database API Key
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}