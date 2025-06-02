import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DB } from 'src/db/db.database';

@Injectable()
export class TrackService {
  findAll(): Track[] {
    return DB.tracks;
  }

  findOne(id: string): Track {
    const track = DB.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException(`Track ${id} not found`);
    return track;
  }

  update(id: string, dto: UpdateTrackDto): Track {
    const index = DB.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException(`Track ${id} not found`);

    if (dto.artistId !== undefined && dto.artistId !== null) {
      const artist = DB.artists.some((artist) => artist.id === dto.artistId);
      if (!artist)
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} not found`,
        );
    }
    if (dto.albumId !== undefined && dto.albumId !== null) {
      const album = DB.albums.some((album) => album.id === dto.albumId);
      if (!album)
        throw new UnprocessableEntityException(
          `Album ${dto.albumId} not found`,
        );
    }

    const track = DB.tracks[index];
    if (dto.name !== undefined) track.name = dto.name;
    if ('artistId' in dto) track.artistId = dto.artistId ?? null;
    if ('albumId' in dto) track.albumId = dto.albumId ?? null;
    if (dto.duration !== undefined) track.duration = dto.duration;

    return track;
  }

  create(dto: CreateTrackDto): Track {
    if (dto.artistId) {
      const artist = DB.artists.some((artist) => artist.id === dto.artistId);
      if (!artist)
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} not found`,
        );
    }
    if (dto.albumId) {
      const album = DB.albums.some((album) => album.id === dto.albumId);
      if (!album)
        throw new UnprocessableEntityException(
          `Album ${dto.albumId} not found`,
        );
    }
    const newTrack: Track = {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };
    DB.tracks.push(newTrack);
    return newTrack;
  }

  remove(id: string): void {
    const index = DB.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException(`Track ${id} not found`);

    DB.tracks.splice(index, 1);
  }
}
