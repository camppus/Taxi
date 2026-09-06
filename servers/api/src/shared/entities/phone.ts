export default class Phone {
  private readonly value: string;

  constructor(phone: string) {
    this.value = this.normalize(phone);
    this.validate(this.value);
  }

  toString(): string {
    return this.value;
  }

  private normalize(phone: string): string {
    let value = phone
      .trim()
      .replace(/\s+/g, '')
      .replace(/[-().]/g, '');
    if (/^(91|92|93|94|95|97|99)\d{7}$/.test(value)) {
      return `+244${value}`;
    }

    if (/^244(91|92|93|94|95|97|99)\d{7}$/.test(value)) {
      return `+${value}`;
    }

    return value;
  }

  static isPhone(data: string) {
    try {
      new Phone(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  private validate(phone: string): void {
    if (!phone) {
      throw new Error('Phone must exist');
    }

    if (!/^\+244(91|92|93|94|95|97|99)\d{7}$/.test(phone)) {
      throw new Error('Invalid Angola phone number');
    }
  }
}
