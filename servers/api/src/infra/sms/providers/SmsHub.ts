import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SmsProvider } from '../smsModule.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SmsHub implements SmsProvider, OnModuleInit {
  private apiKey: string;
  private apiAuthId: string;
  private readonly logger = new Logger(SmsHub.name);

  constructor(private readonly config: ConfigService) {
    const authId = this.config.getOrThrow<string>('SMS_HUB_AUTH_ID');
    const secretKey = this.config.getOrThrow<string>('SMS_HUB_API_KEY');
    if (!authId || !secretKey) {
      this.logger.fatal(`API KEY or AUTH ID not provided`);
    }
    this.apiAuthId = authId;
    this.apiKey = secretKey;
  }

  async onModuleInit() {
    const params = new URLSearchParams({
      auth_id: this.apiAuthId,
      secret_key: this.apiKey,
    });

    const response = await fetch(
      `https://app.smshubangola.com/api/balance?${params.toString()}`,
      {
        method: 'GET',
      },
    );

    const body = await response.text();

    if (!response.ok) {
      this.logger.fatal(
        `SMSHub balance request failed: ${response.status} - ${body}`,
      );
      return;
    }

    const result = JSON.parse(body) as {
      status: number;
      data: number;
    };

    if (result.status !== 200) {
      this.logger.error(body);
      this.logger.error(`SMSHub returned status ${result.status}`);
      return;
    }

    this.logger.verbose(result.data);
  }

  async send(data: { to: string; message: string }): Promise<void> {
    this.logger.debug(JSON.stringify(data));
    const params = new URLSearchParams({
      to: data.to,
      message: data.message,
      from: 'SMSHUB',
      auth_id: this.apiAuthId,
      secret_key: this.apiKey,
    });

    const response = await fetch(
      `https://app.smshubangola.com/api/sendsms?${params.toString()}`,
    );

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`Error sending sms ${body.toString()}`);
      return;
    }
    this.logger.verbose('SMS sent sucessly');
  }
}
