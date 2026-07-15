import ObjectValuePort from "../interfaces/ObjectValues";

export default class Token implements ObjectValuePort<string> {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error("Token não pode ser vazio");
    }
  }

  getRawValue(): string {
    return this.value;
  }
}
