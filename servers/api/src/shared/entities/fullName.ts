export default class FullName {
  constructor(private readonly name: string) {
    this.validate();
  }

  toString() {
    return this.name;
  }

  private validate() {
    const [firtName, lastName] = this.name.split(' ');
    FullName.isName(firtName);
    FullName.isName(lastName);
  }

  static isName(value: string) {
    if (!value) {
      throw new Error('Name must exist');
    }

    if (value.length < 3) {
      throw new Error('Name must has 3 or more chars');
    }

    if (value.length > 40) {
      throw new Error('Name must has max 40 chars');
    }
  }
}
