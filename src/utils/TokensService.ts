import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface IPayload {
  userId: string;
  login: string;
}

@Injectable()
export class TokensService {
  private secretRefreshKey: string;
  private secretKey: string;
  private refreshExpireTime: string;
  private expireTime: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secretRefreshKey = this.configService.getOrThrow<string>(
      'JWT_SECRET_REFRESH_KEY',
    );
    this.secretKey = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
    this.refreshExpireTime = this.configService.getOrThrow<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    this.expireTime =
      this.configService.getOrThrow<string>('TOKEN_EXPIRE_TIME');
  }

  async getTokens(payload: IPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.expireTime,
      secret: this.secretKey,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshExpireTime,
      secret: this.secretRefreshKey,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getAccessPayload(accessToken: string): Promise<IPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<IPayload>(accessToken, {
        secret: this.secretKey,
      });
      return {
        login: payload.login,
        userId: payload.userId,
      };
    } catch {
      throw new ForbiddenException();
    }
  }

  async getRefreshPayload(refreshToken: string): Promise<IPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<IPayload>(
        refreshToken,
        {
          secret: this.secretRefreshKey,
        },
      );
      return {
        login: payload.login,
        userId: payload.userId,
      };
    } catch {
      throw new ForbiddenException();
    }
  }
}
