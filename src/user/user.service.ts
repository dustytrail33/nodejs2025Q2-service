import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { removePassword } from 'src/utils/remove-password.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/utils/PasswordServic';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

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

  async findUserByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { login } });
    if (!user) return null;
    return this.convertPrismaUserToUser(user);
  }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { login, password } = dto;

    if (!login || !password) {
      throw new ForbiddenException(`login and password required`);
    }
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: hashedPassword,
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
    // if (user.password !== dto.oldPassword)
    //   throw new ForbiddenException(`Old password is incorrect`);

    const passwordIsValid = await this.passwordService.passwordIsValid(
      dto.oldPassword,
      user.password,
    );

    if (!passwordIsValid) {
      throw new ForbiddenException('Wrong old password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      dto.newPassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    return removePassword(this.convertPrismaUserToUser(updatedUser));
  }

  async remove(id: string): Promise<User> {
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
