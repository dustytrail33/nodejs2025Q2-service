import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TrackService, PrismaService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
