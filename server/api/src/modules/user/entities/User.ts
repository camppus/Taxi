export enum Role {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  PASSENGER = "PASSENGER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  password: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse extends Omit<User, "password"> {}
