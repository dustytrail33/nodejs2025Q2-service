import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DB } from 'src/db/db.database';

@Injectable()
export class ArtistService {
  findAll(): Artist[] {
    return DB.artists;
  }

  findOne(id: string): Artist {
    const artist = DB.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException(`Artist with id=${id} not found`);
    return artist;
  }

  create(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    DB.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto): Artist {
    const index = DB.artists.findIndex((a) => a.id === id);
    if (index === -1)
      throw new NotFoundException(`Artist with id=${id} not found`);
    const artist = DB.artists[index];
    if (dto.name !== undefined) artist.name = dto.name;
    if (dto.grammy !== undefined) artist.grammy = dto.grammy;
    return artist;
  }

  remove(id: string): void {
    const index = DB.artists.findIndex((a) => a.id === id);
    if (index === -1)
      throw new NotFoundException(`Artist with id=${id} not found`);

    DB.artists.splice(index, 1);
  }
}
