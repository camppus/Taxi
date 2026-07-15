import ObjectValuePort from "../interfaces/ObjectValues";
import { isIP } from "node:net";
export default class IP implements ObjectValuePort<string> {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (isIP(this.value) === 0) {
      throw new Error("Invalid IP address");
    }
  }

  getRawValue(): string {
    return this.value;
  }
}
