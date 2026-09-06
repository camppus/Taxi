import Enttiy from '../../../../shared/entities/entitiy.js';

export interface UserDeviceProps {
  id: string;
  userId: string;
  deviceId: string;
  pushToken?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastSeenAt?: Date;
}

export default class UserDevice extends Enttiy {
  constructor(private readonly props: UserDeviceProps) {
    super(props.id, props.createdAt);
  }

  get userId(): string {
    return this.props.userId;
  }

  get deviceId(): string {
    return this.props.deviceId;
  }

  get pushToken(): string | undefined {
    return this.props.pushToken;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastSeenAt(): Date | undefined {
    return this.props.lastSeenAt;
  }

  activate(): void {
    this.props.isActive = true;
  }

  deactivate(): void {
    this.props.isActive = false;
  }

  updateLastSeen(): void {
    this.props.lastSeenAt = new Date();
  }

  updtePush(token: string) {
    this.props.pushToken = token;
  }
}
