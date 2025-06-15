import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from 'src/utils/PasswordServic';
import { TokensService } from 'src/utils/TokensService';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokensService,
  ) {}

  async signup(dto: SignupDto) {
    return this.userService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findUserByLogin(dto.login);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordIsValid = await this.passwordService.passwordIsValid(
      dto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    return this.tokenService.getTokens(payload);
  }
}
