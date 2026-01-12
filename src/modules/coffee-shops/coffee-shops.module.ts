import { Module } from '@nestjs/common';
import { CoffeeShopsService } from './coffee-shops.service';
import { CoffeeShopsController } from './coffee-shops.controller';
import { PrismaModule } from '../../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  controllers: [CoffeeShopsController],
  providers: [CoffeeShopsService],
})
export class CoffeeShopsModule {}