import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ArtistService, PrismaService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
