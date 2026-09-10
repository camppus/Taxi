import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    type: [String],
    format: 'uuid',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    ],
  })
  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  sessionsId: string[];
}
