import { Injectable } from "@nestjs/common";
import type {
  EmailData,
  EmailProvider,
} from "src/shared/interfaces/EmailProvider";

/**
 * Provider de email para desenvolvimento que apenas loga no console.
 * TODO: Substituir por NodemailerEmailProvider em produção.
 */
@Injectable()
export class ConsoleEmailProvider implements EmailProvider {
  async send(data: EmailData): Promise<void> {
    console.log("\n════════════════════════════════════════════════════════");
    console.log("📧 EMAIL ENVIADO (CONSOLE)");
    console.log("════════════════════════════════════════════════════════");
    console.log(`Para: ${data.to}`);
    console.log(`Assunto: ${data.subject}`);
    console.log("────────────────────────────────────────────────────────");
    console.log(data.text);
    console.log("════════════════════════════════════════════════════════\n");
    console.log(data.html);
    console.log("════════════════════════════════════════════════════════\n");
  }
}
