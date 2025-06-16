import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'artist name',
  })
  name: string;

  @ApiProperty({
    example: false,
  })
  grammy: boolean;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    format: 'uuid',
  })
  favoriteId: string | null;
}
