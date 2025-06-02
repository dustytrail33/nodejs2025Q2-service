import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DB } from 'src/db/db.database';
import { removePassword } from 'src/utils/remove-password.util';

@Injectable()
export class UserService {
  findAll(): Omit<User, 'password'>[] {
    return DB.users.map((u) => removePassword(u));
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = DB.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return removePassword(user);
  }

  create(dto: CreateUserDto): Omit<User, 'password'> {
    const now = Date.now();
    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    DB.users.push(newUser);
    return removePassword(newUser);
  }

  updatePassword(id: string, dto: UpdatePasswordDto): Omit<User, 'password'> {
    const userIndex = DB.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException(`User ${id} not found`);

    const user = DB.users[userIndex];
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return removePassword(user);
  }

  remove(id: string): void {
    const userIndex = DB.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException(`User ${id} not found`);
    DB.users.splice(userIndex, 1);
  }
}
