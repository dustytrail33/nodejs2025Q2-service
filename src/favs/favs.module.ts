import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [TrackModule],
  providers: [FavsService, PrismaService],
  controllers: [FavsController],
})
export class FavsModule {}
