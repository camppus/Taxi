import ObjectValuePort from "../interfaces/ObjectValues";

export default class Title implements ObjectValuePort<string> {
  getRawValue(): string {
    return this.value;
  }
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (this.value.length < 3) {
      throw new Error("Invalid Title");
    }
  }
}
