import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'trackName',
  })
  name: string;

  @ApiProperty({
    description: 'Artist id',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    format: 'uuid',
  })
  favoriteId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'Duration',
    example: 400,
  })
  duration: number;
}
