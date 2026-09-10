import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import RegisterUseCase from '../../../../application/usecases/registerUseCase.js';
import LoginUseCase from '../../../../application/usecases/loginUseCase.js';
import RequestChallangeUseCase from '../../../../application/usecases/sendChallengeUseCase.js';
import GetMyActiveSessionsUseCase from '../../../../application/usecases/getMySessionUseCase.js';
import LogoutUseCase from '../../../../application/usecases/logoutUseCase.js';
import RegisterDto from '../../../../application/dto/registerDto.js';
import VerifyChallengeDto from '../../../../application/dto/verifyChallengeDto.js';
import SendChallengeDto from '../../../../application/dto/requestChallangeDto.js';
import { LogoutDto } from '../../../../application/dto/logoutDto.js';
import { Current } from '../../../../../../infra/http/decorators/CurrentContext.js';
import RefreshTokenDto from '../../../../application/dto/refreshTokenDto.js';
import RefreshTokenUseCase from '../../../../application/usecases/refreshSessionUseCase.js';
import { ChallengeContext } from '../../../../domain/entities/challenge.js';

@ApiTags('Auth controller v1')
@Controller({
  version: 'v1',
  path: 'auth/v1',
})
export default class AuthControllerV1 {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly requestChallengeUseCase: RequestChallangeUseCase,
    private readonly getMyActiveSessionsUseCase: GetMyActiveSessionsUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Generates a new access token using a valid refresh token and session.',
  })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid JWT or refresh token' })
  @ApiResponse({ status: 401, description: 'Invalid or expired session' })
  async refresh(@Body() data: RefreshTokenDto) {
    return await this.refreshTokenUseCase.handle(data);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
  })
  async register(@Body() dto: RegisterDto) {
    return await this.registerUseCase.handle(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login request processed successfully',
  })
  async login(@Body() dto: VerifyChallengeDto) {
    return await this.loginUseCase.handle(dto);
  }

  @Post('request-challenge')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Request an authentication challenge',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Challenge requested successfully',
  })
  async requestChallenge(@Body() dto: SendChallengeDto) {
    return await this.requestChallengeUseCase.handle({
      context: ChallengeContext.LOGIN,
      to: dto.to,
    });
  }

  @Get('sessions')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get my active sessions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Active sessions retrieved successfully',
  })
  async getMyActiveSessions(@Current('userId') userId: string) {
    return await this.getMyActiveSessionsUseCase.handle(userId);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout  sessions',
  })
  async logout(@Body() dto: LogoutDto, @Current('userId') userId: string) {
    return await this.logoutUseCase.handle({
      dto,
      userId,
    });
  }
}
