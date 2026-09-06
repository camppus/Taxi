import { AuthUser } from '../entities/authUser.js';

export default interface AuthRepo {
  getUserByPhone(phone: string): Promise<AuthUser | null>;
  getUserById(phone: string): Promise<AuthUser | null>;
}
