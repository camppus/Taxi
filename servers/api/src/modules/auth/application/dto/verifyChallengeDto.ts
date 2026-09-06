import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export default class VerifyChallengeDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  challengeId: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  @ApiProperty()
  challengeCode: string;

  @ApiProperty({
    description: 'Unique identifier of the device',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  deviceKey: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  pushToken: string;

  @ApiProperty({
    description: 'Device platform',
    example: 'android',
    maxLength: 30,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  platform: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  platformVersion: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  deviceType: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  deviceModel: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  manufacturer: string;

  @ApiPropertyOptional({
    description: 'Browser name',
    example: 'Chrome',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  browser?: string;

  @ApiPropertyOptional({
    description: 'Browser version',
    example: '128.0.6613.88',
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  browserVersion?: string;

  @ApiPropertyOptional({
    description: 'User agent',
    example: 'Mozilla/5.0 ...',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty()
  @IsIP()
  @IsNotEmpty()
  ipAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  appVersion: string;
}
