export interface VehicleProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Vehicle {
  private readonly id: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: VehicleProps = {}) {
    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
