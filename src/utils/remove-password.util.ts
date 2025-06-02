import { User } from 'src/user/entities/user.entity';

export function removePassword(user: User): Omit<User, 'password'> {
  const userCopy = { ...user };
  delete userCopy.password;
  return userCopy;
}
