export default class Enttiy {
  constructor(
    private readonly id: string,
    private readonly createdAt: Date,
    private updatedAt?: Date,
  ) {}

  getId() {
    return this.id;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  protected touch() {
    this.updatedAt = new Date();
  }
}
