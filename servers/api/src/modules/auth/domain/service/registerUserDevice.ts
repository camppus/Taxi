import UserDevice from '../entities/userDevice.js';
import DeviceRepo from '../repositories/deviceRepo.js';

export async function registerUserDevice({
  device,
  repo,
  userId,
}: {
  device: {
    pushToken: string;
    deviceId: string;
  };
  repo: DeviceRepo;
  userId: string;
}): Promise<UserDevice> {
  const existingDevice = await repo.geUserDeviceByUserIdAndDeviceId({
    deviceId: device.deviceId,
    userId,
  });

  if (existingDevice) {
    existingDevice.updtePush(device.pushToken);
    existingDevice.updateLastSeen();
    await repo.saveUserDevice(existingDevice);
    return existingDevice;
  }

  const newDevice = new UserDevice({
    createdAt: new Date(),
    deviceId: device.deviceId,
    id: crypto.randomUUID(),
    isActive: true,
    updatedAt: new Date(),
    userId,
    lastSeenAt: new Date(),
  });
  await repo.saveUserDevice(newDevice);
  return newDevice;
}
