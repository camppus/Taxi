import { Global, Module } from '@nestjs/common';
import { BcryptProvider } from './encript/provider/bcryptProvider.js';
import JwtService from './jwt/jwtService.js';

@Global()
@Module({
  providers: [
    {
      provide: 'EncriptProvider',
      useClass: BcryptProvider,
    },
    JwtService,
  ],
  exports: ['EncriptProvider', JwtService],
})
export default class SecurityModule {}
