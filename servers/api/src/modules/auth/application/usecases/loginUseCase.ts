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
import Session from '../../domain/entities/session.js';
import type { CacheProvider } from '../../../../infra/caching/CacheProvider.js';
import type SessionRepo from '../../domain/repositories/sessionRepo.js';

export default class LoginUseCase implements UseCase<
  VerifyChallengeDto,
  ServerMessage
> {
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
    const challenge = await this.challengeRepo.getById(data.challengeId);

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    if (challenge.context != ChallengeContext.LOGIN) {
      throw new Error('Wrong challenge Context');
    }

    if (!challenge.canUse()) {
      throw new Error('This challenge can´t be used');
    }

    const isMatch = this.encriptProvider.macth({
      hash: challenge.hash,
      plainText: data.challengeCode,
    });

    if (!isMatch) {
      challenge.updateAttempts();
      await this.challengeRepo.save(challenge);
      throw new Error('Wrong challenge code');
    }

    challenge.use();
    await this.challengeRepo.save(challenge);

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

    const refreshToken = Session.generateRefreshToken();
    const refreshHash = this.encriptProvider.hash(refreshToken);
    const session = new Session({
      id: crypto.randomUUID(),
      userId: user.getId(),
      userDeviceId: userDevice.getId(),
      isActive: true,
      refreshHash,
      expiresAt: Session.getExpirationTime(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.sessionRepo.save(session);
    const token = this.jwtService.generate({
      sessionId: session.getId(),
      sub: user.getId(),
    });

    this.chacheProvider.add(
      {
        expiresAt: session.expiresAt,
        isActive: true,
      },
      `session.${session.getId()}`,
    );

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
