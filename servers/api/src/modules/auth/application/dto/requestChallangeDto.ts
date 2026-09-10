import { ApiProperty } from '@nestjs/swagger';
import { ChallengeContext } from '../../domain/entities/challenge.js';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export default class SendChallengeDto {
  @ApiProperty({
    description: 'Número de telefone do usuário que receberá o código OTP.',
    example: '+244923456789',
  })
  @IsPhoneNumber('AO')
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description:
      'Contexto para o qual o desafio de verificação está sendo criado.',
    enum: ChallengeContext,
    example: ChallengeContext.LOGIN,
  })
  context: ChallengeContext;
}
