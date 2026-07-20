import CrudRepository from "src/shared/interfaces/CrudRepository";
import { User } from "../entities/User";

export default interface UserRepository extends CrudRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
}
