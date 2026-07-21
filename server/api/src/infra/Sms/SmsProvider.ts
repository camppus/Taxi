export default interface SmsProvider {
  sendSms(phone: string, message: string): Promise<void>;
}
