import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import HasherProvider from "src/shared/interfaces/HasherProvider";

@Injectable()
export default class BcryptHasher implements HasherProvider {
  private readonly saltRounds = process.env.BCRYPT_SALT_ROUNDS!;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, +this.saltRounds);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
