import Device from '../entities/device.js';
import DeviceRepo from '../repositories/deviceRepo.js';

export async function registerDevice({
  device,
  repo,
}: {
  device: {
    deviceKey: string;
    platform: string;
    platformVersion: string;
    deviceType: string;
    deviceModel: string;
    manufacturer: string;
    browser?: string;
    browserVersion?: string;
    userAgent?: string;
    ipAddress: string;
    country: string;
    city: string;
    appVersion: string;
  };
  repo: DeviceRepo;
}): Promise<Device> {
  const existingDevice = await repo.getDeviceBykey(device.deviceKey);
  if (existingDevice) {
    existingDevice.update({
      appVersion: device.appVersion,
      browser: device.browser,
      browserVersion: device.browserVersion,
      city: device.city,
      country: device.country,
      ipAddress: device.ipAddress,
      platformVersion: device.platformVersion,
      userAgent: device.userAgent,
    });
    await repo.saveDevice(existingDevice);
    return existingDevice;
  }

  const newDevice = new Device({
    appVersion: device.appVersion,
    browser: device.browser,
    browserVersion: device.browserVersion,
    city: device.city,
    country: device.country,
    ipAddress: device.ipAddress,
    platformVersion: device.platformVersion,
    userAgent: device.userAgent,
    createdAt: new Date(),
    deviceKey: device.deviceKey,
    id: crypto.randomUUID(),
    platform: device.platform,
    updatedAt: new Date(),
    deviceModel: device.deviceModel,
    deviceType: device.deviceType,
    manufacturer: device.manufacturer,
  });
  await repo.saveDevice(newDevice);
  return newDevice;
}
