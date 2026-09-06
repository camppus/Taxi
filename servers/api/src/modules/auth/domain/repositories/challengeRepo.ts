import Challenge from '../entities/challenge.js';

export default interface ChallengeRepo {
  save(data: Challenge): Promise<void>;
  getById(id: string): Promise<Challenge | null>;
}
