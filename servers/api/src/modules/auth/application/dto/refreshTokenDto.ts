import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export default class RefreshTokenDto {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  refreshtoken: string;

  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  acessToken: string;
}
