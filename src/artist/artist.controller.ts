import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidValidationPipe } from 'src/utils/uuid-validation.pipe';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists', description: 'Gets all artists' })
  @ApiResponse({
    status: 200,
    description: 'Returns all artists records',
    isArray: true,
    type: Artist,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @ApiOperation({
    summary: 'Get artist by id',
    description: 'Get artist by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if artist record exists',
    type: Artist,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({ summary: 'Add new artist', description: 'Add new artist' })
  @ApiResponse({
    status: 201,
    description: 'Returns if artist has been created',
    type: Artist,
  })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @ApiOperation({
    summary: 'Update artist ',
    description: 'Update artist by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if artist has been updated',
    type: Artist,
  })
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if artist has been removed',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', UuidValidationPipe) id: string) {
    const removedArtist = await this.artistService.remove(id);
    if (!removedArtist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
