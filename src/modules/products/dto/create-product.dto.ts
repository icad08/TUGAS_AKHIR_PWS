import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Kopi Susu Gula Aren', description: 'Nama produk' })
  name: string;

  @ApiProperty({ example: 18000, description: 'Harga produk' })
  price: number;

  @ApiProperty({ example: 'Enak banget', description: 'Deskripsi' })
  description: string;
}