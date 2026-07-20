export default class CreateUserDto {
  name!: string;
  email?: string;
  phone!: string;
  password!: string;
  role!: "DRIVER" | "CLIENT";
}
