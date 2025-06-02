import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'User',
  })
  login: string;

  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Timestamp of creation',
    type: 'number',
    example: 1630000000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of last update',
    type: 'number',
    example: 1630000000,
  })
  updatedAt: number;
}
