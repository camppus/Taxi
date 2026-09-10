import MySessions from '../entities/MySessions.js';
import Session from '../entities/session.js';

export default interface SessionRepo {
  save(data: Session): Promise<void>;
  getById(id: string): Promise<Session | null>;
  getAllActiveSessions(userId: string): Promise<MySessions[]>;
}
