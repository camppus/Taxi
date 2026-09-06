import Device from '../entities/device.js';
import UserDevice from '../entities/userDevice.js';

export default interface DeviceRepo {
  saveDevice(data: Device): Promise<void>;
  getDeviceById(id: string): Promise<Device | null>;
  getDeviceBykey(key: string): Promise<Device | null>;
  saveUserDevice(data: UserDevice): Promise<void>;
  getAllUserDevice(userId: string): Promise<Device[]>;
  geUserDeviceById(id: string): Promise<UserDevice | null>;
  geUserDeviceByUserIdAndDeviceId(data: {
    userId: string;
    deviceId: string;
  }): Promise<UserDevice | null>;
}
