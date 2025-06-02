import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DB } from 'src/db/db.database';

@Injectable()
export class AlbumService {
  findAll(): Album[] {
    return DB.albums;
  }

  findOne(id: string): Album {
    const album = DB.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  create(dto: CreateAlbumDto): Album {
    if (dto.artistId) {
      const artist = DB.artists.some((artist) => artist.id === dto.artistId);
      if (!artist) {
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} does not exist`,
        );
      }
    }
    const newAlbum: Album = {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    DB.albums.push(newAlbum);
    return newAlbum;
  }

  remove(id: string): void {
    const index = DB.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException(`Album ${id} not found`);

    DB.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    const favIndex = DB.favs.albums.indexOf(id);
    if (favIndex !== -1) DB.favs.albums.splice(favIndex, 1);

    DB.albums.splice(index, 1);
  }

  update(id: string, dto: UpdateAlbumDto): Album {
    const index = DB.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException(`Album ${id} not found`);

    if (dto.artistId !== undefined && dto.artistId !== null) {
      const artist = DB.artists.some((artist) => artist.id === dto.artistId);
      if (!artist) {
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} does not exist`,
        );
      }
    }

    const album = DB.albums[index];
    if (dto.name !== undefined) album.name = dto.name;
    if (dto.year !== undefined) album.year = dto.year;

    if ('artistId' in dto) album.artistId = dto.artistId ?? null;

    return album;
  }
}
