import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginType } from './entities/LoginType';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User', description: 'User pass' })
  @ApiResponse({
    status: 201,
    description: 'If user has been signed up',
    type: User,
  })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'If user has been logged in',
    type: LoginType,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
