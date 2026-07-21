import { Injectable } from "@nestjs/common";
import SmsProvider from "../SmsProvider";

@Injectable()
export class FakeSmsProvider implements SmsProvider {
  async sendSms(phone: string, message: string): Promise<void> {
    console.log("==============================");
    console.log("📱 SMS FAKE PROVIDER");
    console.log(`Para: ${phone}`);
    console.log(`Mensagem: ${message}`);
    console.log("==============================");
  }
}
