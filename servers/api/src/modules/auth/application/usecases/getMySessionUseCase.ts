import { Inject, Injectable } from '@nestjs/common';
import { ServerMessage, UseCase } from '../../../../shared/types.js';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import type SessionRepo from '../../domain/repositories/sessionRepo.js';
import getUser from '../../domain/service/getUser.js';

@Injectable()
export default class GetMyActiveSessionsUseCase implements UseCase<string> {
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    @Inject('SessionRepo')
    private readonly sessionRepo: SessionRepo,
  ) {}

  async handle(id: string): Promise<ServerMessage> {
    await getUser({
      repo: this.authRepo,
      unique: id,
    });

    const sessions = await this.sessionRepo.getAllActiveSessions(id);
    return {
      data: sessions,
      message: 'My sessions',
      status: 2000,
    };
  }
}
