import ObjectValuePort from "src/shared/interfaces/ObjectValues";

export default class Phone implements ObjectValuePort<string> {
  private readonly regex = /^(\+244)?(91|92|93|94|95|97|99)\d{7}$/;

  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    const phone = this.value.replace(/\s+/g, "");

    if (!this.regex.test(phone)) {
      throw new Error("Número de telefone angolano inválido");
    }
  }

  getRawValue(): string {
    return this.value;
  }
}
