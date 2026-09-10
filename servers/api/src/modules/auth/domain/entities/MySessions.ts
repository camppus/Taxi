import { DeviceProps } from '../../domain/entities/device.js';
import { UserDeviceProps } from './userDevice.js';

export default interface MySessions {
  id: string;
  userId: string;
  isActive: boolean;
  expiresAt: Date;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deviceInfo: DeviceProps;
  userDevice: UserDeviceProps;
}
