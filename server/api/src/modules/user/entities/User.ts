import { Gender } from "@prisma/client";

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
  fullName: string;
  phone: string;
  password: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  gender: Gender;
  birthDate?: Date;
  photoUrl?: string;
  emergencyPhone?: string;
  selfieUrl?: string;
}

export interface UserResponse extends Omit<User, "password"> {}
