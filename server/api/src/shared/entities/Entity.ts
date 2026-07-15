import UUid from "./UUid";

export default abstract class Entity {
  private readonly id: UUid;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(id?: UUid, createdAt?: Date, updatedAt?: Date) {
    this.id = id ?? new UUid(crypto.randomUUID());
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
  public getId(): UUid {
    return this.id;
  }
  public getIdToString(): string {
    return this.id.getRawValue();
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  protected touch(): void {
    this.updatedAt = new Date();
  }
}
