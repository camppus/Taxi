import Phone from '../../../../shared/entities/phone.js';
import { AuthUser } from '../entities/authUser.js';
import AuthRepo from '../repositories/authRepo.js';

export default async function getUser({ repo, unique }: { repo: AuthRepo; unique: string }) {
  const isPhone = Phone.isPhone(unique)
  let user : AuthUser | null = null

  if(isPhone){
    user = await repo.getUserByPhone(unique)
  }else {
    user = await repo.getUserById(unique)
  }

  if (!user) {
    throw new Error('User not found');
  }
  if (!user.getIsACtive()) {
    throw new Error('User must be active');
  }

  return user;
}
