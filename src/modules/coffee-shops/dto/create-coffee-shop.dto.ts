import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeShopDto {
  @ApiProperty({ example: 'Kopi Kenangan Mantan', description: 'Nama Toko' })
  name: string;

  @ApiProperty({ example: 'Jl. Malioboro No. 1, Yogyakarta', description: 'Alamat Toko' })
  address: string;

  @ApiProperty({ example: 'Tempat nongkrong asik', description: 'Deskripsi singkat' })
  description?: string;
}