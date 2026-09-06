import { randomBytes } from 'crypto';
import Enttiy from '../../../../shared/entities/entitiy.js';

export interface SessionProps {
  id: string;
  userDeviceId: string;
  userId: string;
  isActive: boolean;
  refreshHash: string;
  expiresAt: Date;
  lastUsedAt?: Date;
  revokedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default class Session extends Enttiy {
  constructor(private readonly props: SessionProps) {
    super(props.id, props.createdAt);
  }

  static generateRefreshToken(): string {
    return randomBytes(32).toString('base64url');
  }

  static readonly EXPIRATION_DAYS = 30;

  static getExpirationTime(): Date {
    return new Date(Date.now() + this.EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  }
  get userDeviceId(): string {
    return this.props.userDeviceId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get refreshHash(): string {
    return this.props.refreshHash;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get lastUsedAt(): Date | undefined {
    return this.props.lastUsedAt;
  }

  get revokedAt(): Date | undefined {
    return this.props.revokedAt;
  }

  isExpired(): boolean {
    return new Date() >= this.props.expiresAt;
  }

  canUse(): boolean {
    return this.props.isActive && !this.isExpired() && !this.props.revokedAt;
  }

  updateLastUsed(): void {
    this.props.lastUsedAt = new Date();
    this.props.updatedAt = new Date();
  }

  revoke(): void {
    this.props.isActive = false;
    this.props.revokedAt = new Date();
    this.props.updatedAt = new Date();
  }
}
