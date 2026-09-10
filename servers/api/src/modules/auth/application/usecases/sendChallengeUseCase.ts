import { Inject, Injectable } from '@nestjs/common';
import { ServerMessage, UseCase } from '../../../../shared/types.js';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import type { SmsProvider } from '../../../../infra/sms/smsModule.js';
import Challenge from '../../domain/entities/challenge.js';
import type { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import type ChallengeRepo from '../../domain/repositories/challengeRepo.js';
import getUser from '../../domain/service/getUser.js';
import SendChallengeDto from '../dto/requestChallangeDto.js';

@Injectable()
export default class RequestChallangeUseCase implements UseCase<SendChallengeDto> {
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
  async handle(data: SendChallengeDto): Promise<ServerMessage> {
    const user = await getUser({
      repo: this.authRepo,
      unique: data.to.toString(),
    });

    const challengeCode = Challenge.generateChallengeCode();
    const hashChallangCode = this.encriptProvider.hash(challengeCode);
    const challangeId = crypto.randomUUID();
    const expiration = Challenge.getExpirationTime();
    const challange = new Challenge({
      attempts: 0,
      channel: 'SMS',
      context: data.context,
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
      message: `Seu código de verificação é: ${challengeCode}. Este código expira em ${expiration.getMinutes()} minutos. Não compartilhe este código com ninguém. Caso não foi você quem requisitou ignore essa mesnagem`,
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
