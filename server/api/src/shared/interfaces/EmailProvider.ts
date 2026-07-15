export interface EmailData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface EmailProvider {
  send(data: EmailData): Promise<void>;
}
