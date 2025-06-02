import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidValidationPipe } from 'src/utils/uuid-validation.pipe';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    isArray: true,
    type: User,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if user record exists',
    type: User,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'Returns if user has been created',
    type: User,
  })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if user has been updated',
    type: User,
  })
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, dto);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if user has been removed',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UuidValidationPipe) id: string) {
    this.userService.remove(id);
  }
}
