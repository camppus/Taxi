import { Injectable } from '@nestjs/common';
import { EncriptProvider } from '../encriptProvider.js';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements EncriptProvider {
  private readonly salt = 12;
  hash(plainText: string): string {
    return bcrypt.hashSync(plainText, this.salt);
  }
  macth(data: { hash: string; plainText: string }): boolean {
    return bcrypt.compareSync(data.plainText, data.hash);
  }
}
