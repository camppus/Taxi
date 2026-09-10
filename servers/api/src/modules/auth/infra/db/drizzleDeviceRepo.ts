import { Inject, Injectable } from '@nestjs/common';
import DeviceRepo from '../../domain/repositories/deviceRepo.js';
import Device from '../../domain/entities/device.js';
import UserDevice from '../../domain/entities/userDevice.js';
import type { DrizzleDb } from '../../../../infra/persistence/drizzle/index.js';
import {
  devices as deviceTable,
  userDevices as userDeviceTable,
} from '../../../../infra/persistence/drizzle/schemas/entities.js';
import { eq, and } from 'drizzle-orm';

@Injectable()
export default class DrizzleDeviceRepo implements DeviceRepo {
  constructor(
    @Inject('DRIZZLE')
    private readonly drizzle: DrizzleDb,
  ) {}

  async saveDevice(data: Device): Promise<void> {
    await this.drizzle
      .insert(deviceTable)
      .values({
        id: data.getId(),
        deviceKey: data.deviceKey,
        platform: data.platform,
        platformVersion: data.platformVersion,
        deviceType: data.deviceType,
        deviceModel: data.deviceModel,
        manufacturer: data.manufacturer,
        browser: data.browser,
        browserVersion: data.browserVersion,
        appVersion: data.appVersion,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        city: data.city,
        country: data.country,
        createdAt: data.getCreatedAt(),
        updatedAt: data.getUpdatedAt(),
      })
      .onConflictDoUpdate({
        target: [deviceTable.id, deviceTable.deviceKey],
        set: {
          deviceKey: data.deviceKey,
          platform: data.platform,
          platformVersion: data.platformVersion,
          deviceType: data.deviceType,
          deviceModel: data.deviceModel,
          manufacturer: data.manufacturer,
          browser: data.browser,
          browserVersion: data.browserVersion,
          appVersion: data.appVersion,
          userAgent: data.userAgent,
          ipAddress: data.ipAddress,
          city: data.city,
          country: data.country,
          updatedAt: data.getUpdatedAt(),
        },
      });
  }

  async getDeviceById(id: string): Promise<Device | null> {
    const [data] = await this.drizzle
      .select()
      .from(deviceTable)
      .where(eq(deviceTable.id, id));

    if (!data) {
      return null;
    }

    return new Device({
      id: data.id,
      deviceKey: data.deviceKey,
      platform: data.platform,
      platformVersion: data.platformVersion!,
      deviceType: data.deviceType!,
      deviceModel: data.deviceModel!,
      manufacturer: data.manufacturer!,
      browser: data.browser!,
      browserVersion: data.browserVersion!,
      appVersion: data.appVersion!,
      userAgent: data.userAgent!,
      ipAddress: data.ipAddress!,
      city: data.city!,
      country: data.country!,
      createdAt: data.createdAt!,
      updatedAt: data.updatedAt,
    });
  }

  async getDeviceBykey(key: string): Promise<Device | null> {
    const [data] = await this.drizzle
      .select()
      .from(deviceTable)
      .where(eq(deviceTable.deviceKey, key));

    if (!data) {
      return null;
    }

    return new Device({
      id: data.id,
      deviceKey: data.deviceKey,
      platform: data.platform,
      platformVersion: data.platformVersion!,
      deviceType: data.deviceType!,
      deviceModel: data.deviceModel!,
      manufacturer: data.manufacturer!,
      browser: data.browser!,
      browserVersion: data.browserVersion!,
      appVersion: data.appVersion!,
      userAgent: data.userAgent!,
      ipAddress: data.ipAddress!,
      city: data.city!,
      country: data.country!,
      createdAt: data.createdAt!,
      updatedAt: data.updatedAt,
    });
  }

  async saveUserDevice(data: UserDevice): Promise<void> {
    await this.drizzle
      .insert(userDeviceTable)
      .values({
        id: data.getId(),
        userId: data.userId,
        deviceId: data.deviceId,
        createdAt: data.getCreatedAt(),
        updatedAt: data.getUpdatedAt(),
        isActive: data.isActive,
        lastSeenAt: data.lastSeenAt,
        pushToken: data.pushToken,
      })
      .onConflictDoUpdate({
        target: [
          userDeviceTable.id,
          userDeviceTable.userId,
          userDeviceTable.deviceId,
        ],
        set: {
          isActive: data.isActive,
          lastSeenAt: data.lastSeenAt,
          pushToken: data.pushToken,
          createdAt: data.getCreatedAt(),
          updatedAt: data.getUpdatedAt(),
        },
      });
  }

  async getAllUserDevice(userId: string): Promise<Device[]> {
    const data = await this.drizzle
      .select({
        device: deviceTable,
      })
      .from(userDeviceTable)
      .innerJoin(deviceTable, eq(userDeviceTable.deviceId, deviceTable.id))
      .where(eq(userDeviceTable.userId, userId));

    return data.map(({ device }) => {
      return new Device({
        id: device.id,
        deviceKey: device.deviceKey,
        platform: device.platform,
        platformVersion: device.platformVersion!,
        deviceType: device.deviceType!,
        deviceModel: device.deviceModel!,
        manufacturer: device.manufacturer!,
        browser: device.browser!,
        browserVersion: device.browserVersion!,
        appVersion: device.appVersion!,
        userAgent: device.userAgent!,
        ipAddress: device.ipAddress!,
        city: device.city!,
        country: device.country!,
        createdAt: device.createdAt!,
        updatedAt: device.updatedAt,
      });
    });
  }

  async geUserDeviceById(id: string): Promise<UserDevice | null> {
    const [data] = await this.drizzle
      .select()
      .from(userDeviceTable)
      .where(eq(userDeviceTable.id, id));

    if (!data) {
      return null;
    }

    return new UserDevice({
      id: data.id,
      userId: data.userId,
      deviceId: data.deviceId,
      createdAt: data.createdAt!,
      updatedAt: data.updatedAt,
      isActive: data.isActive,
      lastSeenAt: data.lastSeenAt!,
      pushToken: data.pushToken!,
    });
  }

  async geUserDeviceByUserIdAndDeviceId(data: {
    userId: string;
    deviceId: string;
  }): Promise<UserDevice | null> {
    const [userDevice] = await this.drizzle
      .select()
      .from(userDeviceTable)
      .where(
        and(
          eq(userDeviceTable.userId, data.userId),
          eq(userDeviceTable.deviceId, data.deviceId),
        ),
      );

    if (!userDevice) {
      return null;
    }

    return new UserDevice({
      id: userDevice.id,
      userId: userDevice.userId,
      deviceId: userDevice.deviceId,
      createdAt: userDevice.createdAt!,
      updatedAt: userDevice.updatedAt!,
      isActive: userDevice.isActive,
      lastSeenAt: userDevice.lastSeenAt!,
      pushToken: userDevice.pushToken!,
    });
  }
}
