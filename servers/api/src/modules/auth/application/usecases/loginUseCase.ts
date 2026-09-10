import { ServerMessage, UseCase } from '../../../../shared/types.js';
import VerifyChallengeDto from '../dto/verifyChallengeDto.js';
import { Inject } from '@nestjs/common';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import { ChallengeContext } from '../../domain/entities/challenge.js';
import type { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import type ChallengeRepo from '../../domain/repositories/challengeRepo.js';
import getUser from '../../domain/service/getUser.js';
import type DeviceRepo from '../../domain/repositories/deviceRepo.js';
import { registerDevice } from '../../domain/service/registerDevice.js';
import JwtService from '../../../../infra/security/jwt/jwtService.js';
import { registerUserDevice } from '../../domain/service/registerUserDevice.js';
import type { CacheProvider } from '../../../../infra/caching/CacheProvider.js';
import type SessionRepo from '../../domain/repositories/sessionRepo.js';
import challengeResolve from '../../domain/service/challengeResolve.js';
import generateSession from '../../domain/service/genarateSession.js';

export default class LoginUseCase implements UseCase<VerifyChallengeDto> {
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    @Inject('ChallengeRepo')
    private readonly challengeRepo: ChallengeRepo,
    @Inject('DeviceRepo')
    private readonly deviceRepo: DeviceRepo,
    @Inject('EncriptProvider')
    private readonly encriptProvider: EncriptProvider,
    @Inject('CacheProvider')
    private readonly chacheProvider: CacheProvider,
    @Inject('SessionRepo')
    private readonly sessionRepo: SessionRepo,
    private readonly jwtService: JwtService,
  ) {}

  async handle(data: VerifyChallengeDto): Promise<ServerMessage> {
    const challenge = await challengeResolve({
      encriptProvider: this.encriptProvider,
      id: data.challengeId,
      repo: this.challengeRepo,
      rule: {
        code: data.challengeCode,
        context: ChallengeContext.LOGIN,
      },
    });

    const user = await getUser({
      repo: this.authRepo,
      unique: challenge.userId,
    });

    const { challengeId, ...deviceData } = data;
    const device = await registerDevice({
      device: deviceData,
      repo: this.deviceRepo,
    });

    const userDevice = await registerUserDevice({
      device: {
        deviceId: device.getId(),
        pushToken: data.pushToken,
      },
      repo: this.deviceRepo,
      userId: user.getId(),
    });

    const { session, token, refreshToken } = await generateSession({
      chacheProvider: this.chacheProvider,
      encriptProvider: this.encriptProvider,
      jwtService: this.jwtService,
      repo: this.sessionRepo,
      session: {
        userDeviceId: userDevice.getId(),
        userId: user.getId(),
        isAdmin: user.isAdmin(),
      },
    });

    return {
      data: {
        accessToken: token,
        refreshToken,
      },
      message: 'Login successfully',
      status: 200,
    };
  }
}
