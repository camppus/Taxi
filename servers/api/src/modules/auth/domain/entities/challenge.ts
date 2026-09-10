import { randomInt } from 'node:crypto';
import Enttiy from '../../../../shared/entities/entitiy.js';

export enum ChallengeContext {
  LOGIN = 'LOGIN',
}

export interface ChallengeProps {
  id: string;
  userId: string;
  hash: string;
  context: ChallengeContext;
  channel: 'SMS';
  target: string;
  expiresAt: Date;
  used: boolean;
  attempts: number;
  createdAt: Date;
}

export default class Challenge extends Enttiy {
  constructor(private readonly props: ChallengeProps) {
    super(props.id, props.createdAt);
  }

  get userId(): string {
    return this.props.userId;
  }

  get hash(): string {
    return this.props.hash;
  }

  get context(): ChallengeContext {
    return this.props.context;
  }

  get channel(): 'SMS' {
    return this.props.channel;
  }

  get target(): string {
    return this.props.target;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get used(): boolean {
    return this.props.used;
  }

  get attempts(): number {
    return this.props.attempts;
  }

  updateAttempts(): void {
    if (this.canUse()) {
      this.props.attempts++;
    }
  }

  canUse(): boolean {
    const MAX_ATTEMPTS = 5;

    return (
      !this.props.used &&
      this.props.attempts < MAX_ATTEMPTS &&
      new Date() < this.props.expiresAt
    );
  }
  use() {
    if (!this.canUse()) {
      throw new Error('Challenge cannot be used');
    }
    this.props.used = false;
  }

  static generateChallengeCode() {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
  }
  static getExpirationTime(): Date {
    return new Date(Date.now() + 5 * 60 * 1000);
  }
}
