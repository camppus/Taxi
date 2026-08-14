import { Gender } from "./Gender";

export enum UserRole {
  PASSAGER,
  DRIVER,
}

export interface Passager {
  name: string;
  id: string;
  role: UserRole.PASSAGER;
  photoUrl: string;
  gender: Gender;
  phone: string;
}
