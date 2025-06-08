import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track ${id} not found`);
    return track;
  }

  async create(dto: CreateTrackDto) {
    if (dto.artistId) {
      const artistExists = await this.prisma.artist.findUnique({
        where: { id: dto.artistId },
      });
      if (!artistExists)
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} not found`,
        );
    }

    if (dto.albumId) {
      const albumExists = await this.prisma.album.findUnique({
        where: { id: dto.albumId },
      });
      if (!albumExists)
        throw new UnprocessableEntityException(
          `Album ${dto.albumId} not found`,
        );
    }

    return this.prisma.track.create({
      data: {
        name: dto.name,
        artistId: dto.artistId ?? null,
        albumId: dto.albumId ?? null,
        duration: dto.duration,
      },
    });
  }

  async update(id: string, dto: Partial<Track>) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track ${id} not found`);

    if (dto.artistId !== undefined && dto.artistId !== null) {
      const artistExists = await this.prisma.artist.findUnique({
        where: { id: dto.artistId },
      });
      if (!artistExists)
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} not found`,
        );
    }

    if (dto.albumId !== undefined && dto.albumId !== null) {
      const albumExists = await this.prisma.album.findUnique({
        where: { id: dto.albumId },
      });
      if (!albumExists)
        throw new UnprocessableEntityException(
          `Album ${dto.albumId} not found`,
        );
    }

    return this.prisma.track.update({
      where: { id },
      data: {
        name: dto.name,
        artistId: dto.artistId ?? null,
        albumId: dto.albumId ?? null,
        duration: dto.duration,
        favoriteId: dto.favoriteId ?? null,
      },
    });
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track) {
      return null;
    }
    return this.prisma.track.delete({ where: { id } });
  }
}
