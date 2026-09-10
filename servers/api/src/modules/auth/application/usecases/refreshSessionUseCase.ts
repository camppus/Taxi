import { ServerMessage, UseCase } from '../../../../shared/types.js';
import RefreshTokenDto from '../dto/refreshTokenDto.js';
import { Inject } from '@nestjs/common';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import type { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import getUser from '../../domain/service/getUser.js';
import type SessionRepo from '../../domain/repositories/sessionRepo.js';
import JwtService from '../../../../infra/security/jwt/jwtService.js';

export default class RefreshTokenUseCase implements UseCase<RefreshTokenDto> {
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    @Inject('SessionRepo')
    private readonly sessionRepo: SessionRepo,
    @Inject('EncriptProvider')
    private readonly encripter: EncriptProvider,
    private readonly jwtService: JwtService,
  ) {}

  async handle(data: RefreshTokenDto): Promise<ServerMessage> {
    const { acessToken, refreshtoken } = data;

    const decoded = this.jwtService.decode(acessToken);

    if (!decoded) {
      throw new Error('Invalid jwt');
    }

    const { isAdmin, sessionId, sub } = decoded;
    const user = await getUser({
      repo: this.authRepo,
      unique: sub,
    });

    const session = await this.sessionRepo.getById(sessionId);

    if (!session) {
      throw new Error('Session not found');
    }

    const matchRefresh = this.encripter.macth({
      hash: session.refreshHash,
      plainText: refreshtoken,
    });

    if (!matchRefresh) {
      throw new Error('Refresh token does not match');
    }

    if (!session.canUse()) {
      throw new Error('This session has been expired');
    }
    const token = this.jwtService.generate({
      sessionId: session.getId(),
      sub: user.getId(),
      isAdmin: user.isAdmin(),
    });

    return {
      data: {
        accessToken: token,
        refreshToken: refreshtoken,
      },
      message: 'Refresh successfully',
      status: 200,
    };
  }
}
