import { Injectable } from "@nestjs/common";
import crypto from "crypto-js";
import EncriptProvider from "src/shared/interfaces/EncriptProvider";

@Injectable()
export default class CriptoJs implements EncriptProvider {
  private readonly key = process.env.ENCRYPTION_KEY!;

  async encript(data: string): Promise<string> {
    const encriptedData = await crypto.AES.encrypt(data, this.key);
    return encriptedData.toString();
  }

  async decript(cipher: string): Promise<string> {
    const decriptedData = await crypto.AES.decrypt(cipher, this.key);
    return decriptedData.toString(crypto.enc.Utf8);
  }
}
