import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
// import { randomUUID } from 'crypto';
import { User as PrismaUser } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// import { DB } from 'src/db/db.database';
import { removePassword } from 'src/utils/remove-password.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) =>
      removePassword(this.convertPrismaUserToUser(user)),
    );
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return removePassword(this.convertPrismaUserToUser(user));
  }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        version: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    return removePassword(this.convertPrismaUserToUser(user));
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(`Old password is incorrect`);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    return removePassword(this.convertPrismaUserToUser(updatedUser));
  }

  async remove(id: string): Promise<User> {
    // const user = await this.prisma.user.findUnique({ where: { id } });
    // if (!user) throw new NotFoundException(`User ${id} not found`);

    // await this.prisma.user.delete({ where: { id } });
    // return user
    const removedUser = await this.findOne(id);
    if (!removedUser) {
      return null;
    }
    await this.prisma.user.deleteMany({ where: { id } });
    return removedUser as User;
  }

  private convertPrismaUserToUser(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      login: prismaUser.login,
      password: prismaUser.password,
      version: prismaUser.version,
      updatedAt: prismaUser.updatedAt.getTime(),
      createdAt: prismaUser.createdAt.getTime(),
    };
  }
}
