import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Album',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 2000,
  })
  year: number;

  @ApiProperty({
    description: 'Artist id',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;
}
