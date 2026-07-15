import ObjectValuePort from "../interfaces/ObjectValues";

export default class UUid implements ObjectValuePort<string> {
  private readonly regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  constructor(private readonly value: string) {
    this.validate();
  }
  getRawValue(): string {
    return this.value;
  }

  private validate() {
    if (!this.regex.test(this.value)) {
      throw new Error("UUid inválido");
    }
  }
  static random() {
    return new UUid(crypto.randomUUID());
  }
}
