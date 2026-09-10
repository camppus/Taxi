import { ServerMessage, UseCase } from '../../../../shared/types.js';
import { LogoutDto } from '../dto/logoutDto.js';
import { Inject, Injectable } from '@nestjs/common';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import getUser from '../../domain/service/getUser.js';
import type { CacheProvider } from '../../../../infra/caching/CacheProvider.js';
import type SessionRepo from '../../domain/repositories/sessionRepo.js';
import revokeSession from '../../domain/service/sessionRevocation.js';

@Injectable()
export default class LogoutUseCase implements UseCase<{
  dto: LogoutDto;
  userId: string;
}> {
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    @Inject('CacheProvider')
    private readonly chacheProvider: CacheProvider,
    @Inject('SessionRepo')
    private readonly sessionRepo: SessionRepo,
  ) {}

  async handle(data: {
    dto: LogoutDto;
    userId: string;
  }): Promise<ServerMessage> {
    const { dto, userId } = data;
    const user = await getUser({
      repo: this.authRepo,
      unique: userId,
    });
    const sessionsIds = dto.sessionsId;
    for (const id of sessionsIds) {
      await revokeSession({
        cacheProvider: this.chacheProvider,
        repo: this.sessionRepo,
        rules: {
          id,
          userId: user.getId(),
        },
      });
    }
    return {
      data: {
        sessionsIds,
      },
      message: 'Sessions Ended sucessly',
      status: 200,
    };
  }
}
