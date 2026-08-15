import { Gender } from "./Gender";

export enum UserRole {
  PASSAGER = "PASSAGER",
  DRIVER = "DRIVER",
}

export interface Passager {
  name: string;
  id: string;
  role: UserRole.PASSAGER;
  photoUrl: string;
  gender: Gender;
  phone: string;
}
