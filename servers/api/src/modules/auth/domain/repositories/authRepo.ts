import { AuthUser } from '../entities/authUser.js';

export default interface AuthRepo {
  getUserByPhone(phone: string): Promise<AuthUser | null>;
  registerUser(data: AuthUser): Promise<void>;
  getUserById(phone: string): Promise<AuthUser | null>;
}
