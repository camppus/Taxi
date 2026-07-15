import ObjectValuePort from "../interfaces/ObjectValues";

export default class Email implements ObjectValuePort<string> {
  constructor(private readonly value: string) {
    this.validate();
  }

  private readonly emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private validate() {
    if (!this.emailRegex.test(this.value)) {
      throw new Error("Email invalid");
    }
  }

  getRawValue(): string {
    return this.value;
  }
}
