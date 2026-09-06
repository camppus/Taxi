import { Global, Module } from '@nestjs/common';
import { BcryptProvider } from './encript/provider/bcryptProvider.js';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [
    {
      provide: 'EncriptProvider',
      useClass: BcryptProvider,
    },
    JwtService,
  ],
  exports: ['EncriptProvider'],
})
export default class SecurityModule {}
