import { ApiProperty } from '@nestjs/swagger';

export class LoginType {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
