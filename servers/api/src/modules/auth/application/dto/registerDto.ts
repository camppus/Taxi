import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export default class RegisterDto {
  @ApiProperty({
    description: 'Número de telefone do usuário que receberá o código OTP.',
    example: '+244923456789',
  })
  @IsPhoneNumber('AO')
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
