import Session from '../entities/session.js';

export default interface SessionRepo {
  save(data: Session): Promise<void>;
  getById(id: string): Promise<Session | null>;
  getAllMyActiveSessions(userId: string): Promise<Session[]>;
}
