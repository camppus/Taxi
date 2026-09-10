import { CacheProvider } from '../../../../infra/caching/CacheProvider.js';
import SessionRepo from '../repositories/sessionRepo.js';

export default async function revokeSession(props: {
  repo: SessionRepo;
  cacheProvider: CacheProvider;
  rules: {
    userId: string;
    id: string;
  };
}) {
  const { repo, rules, cacheProvider } = props;
  const session = await repo.getById(rules.id);
  if (!session) {
    throw new Error(`Session not found`);
  }
  if (session.userId !== rules.userId) {
    throw new Error('This session not belong to you');
  }
  if (!session.isActive) {
    return;
  }
  session.revoke();
  await repo.save(session);
  await cacheProvider.remove(`session.${session.getId()}`);
}
