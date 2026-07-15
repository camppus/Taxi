import ObjectValuePort from "../interfaces/ObjectValues";

export default class Money implements ObjectValuePort<number> {
  constructor(
    private readonly value: number,
    private ignoreValidation: boolean = false,
  ) {
    if (this.ignoreValidation) {
      this.validate();
    }
  }
  getRawValue(): number {
    return this.value;
  }

  private validate() {
    if (this.value <= 0) {
      throw new Error("Valor não pode ser menor ou igual a zero");
    }
  }
}
