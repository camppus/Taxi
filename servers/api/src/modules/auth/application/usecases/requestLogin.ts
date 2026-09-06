import { Inject } from '@nestjs/common';
import Phone from '../../../../shared/entities/phone.js';
import { ServerMessage, UseCase } from '../../../../shared/types.js';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import type { SmsProvider } from '../../../../infra/sms/smsModule.js';
import Challenge, {
  ChallengeContext,
} from '../../domain/entities/challenge.js';
import type { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import type ChallengeRepo from '../../domain/repositories/challengeRepo.js';
import getUser from '../../domain/service/getUser.js';

export default class RequestLoginUseCase implements UseCase<
  Phone,
  ServerMessage
> {
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    @Inject('ChallengeRepo')
    private readonly challengeRepo: ChallengeRepo,
    @Inject('SmsProvider')
    private readonly smsProvider: SmsProvider,
    @Inject('EncriptProvider')
    private readonly encriptProvider: EncriptProvider,
  ) {}
  async handle(data: Phone): Promise<ServerMessage> {
    const user = await getUser({
      repo: this.authRepo,
      unique: data.toString(),
    });

    const challengeCode = Challenge.generateChallengeCode();
    const hashChallangCode = this.encriptProvider.hash(challengeCode);
    const challangeId = crypto.randomUUID();
    const expiration = Challenge.getExpirationTime();
    const challange = new Challenge({
      attempts: 0,
      channel: 'SMS',
      context: ChallengeContext.LOGIN,
      createdAt: new Date(),
      expiresAt: expiration,
      hash: hashChallangCode,
      id: challangeId,
      target: user.getId(),
      used: false,
      userId: user.getId(),
    });

    await this.challengeRepo.save(challange);
    await this.smsProvider.send({
      message: `Seu código de verificação é: ${challengeCode}. Este código expira em ${expiration.getMinutes()} minutos. Não compartilhe este código com ninguém.`,
      to: user.getPhone(),
    });
    return {
      data: {
        challangeId,
        expiration,
      },
      message: `Foi enviado um código de acesso para ${user.getPhone()}`,
      status: 200,
    };
  }
}
