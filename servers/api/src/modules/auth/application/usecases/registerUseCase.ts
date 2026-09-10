import { ServerMessage, UseCase } from '../../../../shared/types.js';
import { AuthUser } from '../../domain/entities/authUser.js';
import RegisterDto from '../dto/registerDto.js';
import { Inject, Logger } from '@nestjs/common';
import type AuthRepo from '../../domain/repositories/authRepo.js';
import { ChallengeContext } from '../../domain/entities/challenge.js';
import getUser from '../../domain/service/getUser.js';
import Phone from '../../../../shared/entities/phone.js';
import FullName from '../../../../shared/entities/fullName.js';
import RequestChallangeUseCase from './sendChallengeUseCase.js';

export default class RegisterUseCase implements UseCase<RegisterDto> {
  private readonly logger = new Logger(RegisterUseCase.name);
  constructor(
    @Inject('AuthRepo')
    private readonly authRepo: AuthRepo,
    private readonly requestChallangeUseCase: RequestChallangeUseCase,
  ) {}

  async handle(data: RegisterDto): Promise<ServerMessage> {
    let existingUser: AuthUser | null = null;
    try {
      existingUser = await getUser({
        repo: this.authRepo,
        unique: data.phone,
      });
    } catch (error) {
      this.logger.debug(error);
    } finally {
      if (existingUser) {
        throw new Error('AlreadyExist account');
      }
    }

    const phone = new Phone(data.phone);
    const name = new FullName(data.name);
    const newUser = new AuthUser({
      createdAt: new Date(),
      id: crypto.randomUUID(),
      isActive: true,
      name,
      phone,
      updateAt: new Date(),
      isAdmin: false,
    });
    await this.authRepo.registerUser(newUser);
    const response = await this.requestChallangeUseCase.handle({
      context: ChallengeContext.LOGIN,
      to: phone.toString(),
    });
    return response;
  }
}
