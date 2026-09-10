import { Module } from '@nestjs/common';
import RegisterUseCase from '../../application/usecases/registerUseCase.js';
import RequestChallangeUseCase from '../../application/usecases/sendChallengeUseCase.js';
import LoginUseCase from '../../application/usecases/loginUseCase.js';
import DrizzleAuthRepo from '../../infra/db/drizzleAuthRepo.js';
import AuthControllerV1 from './controllers/v1/authController.js';
import GetMyActiveSessionsUseCase from '../../application/usecases/getMySessionUseCase.js';
import LogoutUseCase from '../../application/usecases/logoutUseCase.js';
import DrizzleChallenegeRepo from '../../infra/db/drizzleChallenegeRepo.js';
import DrizzleDeviceRepo from '../../infra/db/drizzleDeviceRepo.js';
import DrizzleSessionRepo from '../../infra/db/drizzleSessionRepo.js';
import RefreshTokenUseCase from '../../application/usecases/refreshSessionUseCase.js';

@Module({
  providers: [
    {
      provide: 'AuthRepo',
      useClass: DrizzleAuthRepo,
    },
    {
      provide: 'ChallengeRepo',
      useClass: DrizzleChallenegeRepo,
    },
    {
      provide: 'DeviceRepo',
      useClass: DrizzleDeviceRepo,
    },
    {
      provide: 'SessionRepo',
      useClass: DrizzleSessionRepo,
    },
    RegisterUseCase,
    RequestChallangeUseCase,
    GetMyActiveSessionsUseCase,
    LogoutUseCase,
    LoginUseCase,
    RefreshTokenUseCase
  ],
  controllers: [AuthControllerV1],
})
export default class AuthModule {}
