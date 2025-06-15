import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(dto: SignupDto) {
    return this.userService.create(dto);
  }
}
