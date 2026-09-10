import { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import { ChallengeContext } from '../entities/challenge.js';
import ChallengeRepo from '../repositories/challengeRepo.js';

export default async function challengeResolve(props: {
  id: string;
  repo: ChallengeRepo;
  rule: {
    context: ChallengeContext;
    code: string;
  };
  encriptProvider: EncriptProvider;
}) {
  const { id, repo, rule, encriptProvider } = props;
  const challenge = await repo.getById(id);

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  if (challenge.context != rule.context) {
    throw new Error('Wrong challenge Context');
  }

  if (!challenge.canUse()) {
    throw new Error('This challenge can´t be used');
  }

  const isMatch = encriptProvider.macth({
    hash: challenge.hash,
    plainText: rule.code,
  });

  if (!isMatch) {
    challenge.updateAttempts();
    await repo.save(challenge);
    throw new Error('Wrong challenge code');
  }

  challenge.use();
  await repo.save(challenge);

  return challenge;
}
