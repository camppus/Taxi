import { Inject } from '@nestjs/common';
import Session from '../../domain/entities/session.js';
import SessionRepo from '../../domain/repositories/sessionRepo.js';
import type { DrizzleDb } from '../../../../infra/persistence/drizzle/index.js';
import {
  sessions as sessionTable,
  devices as deviceTable,
  userDevices as userDeviceTable,
} from '../../../../infra/persistence/drizzle/schemas/entities.js';
import { and, eq } from 'drizzle-orm';
import MySessions from '../../domain/entities/MySessions.js';

export default class DrizzleSessionRepo implements SessionRepo {
  constructor(
    @Inject('DRIZZLE')
    private readonly drizzle: DrizzleDb,
  ) {}

  async getAllActiveSessions(userId: string): Promise<MySessions[]> {
    const mysessions = await this.drizzle
      .select()
      .from(sessionTable)
      .innerJoin(
        userDeviceTable,
        eq(sessionTable.userDeviceId, userDeviceTable.id),
      )
      .innerJoin(deviceTable, eq(userDeviceTable.deviceId, deviceTable.id))
      .where(
        and(eq(sessionTable.userId, userId), eq(sessionTable.isActive, true)),
      );

    const response: MySessions[] = mysessions.map((item) => {
      const { devices, sessions, user_devices } = item;
      return {
        ...sessions,
        deviceInfo: devices,
        userDevice: user_devices,
      } as MySessions;
    });
    return response;
  }

  async save(data: Session): Promise<void> {
    const now = new Date();

    await this.drizzle
      .insert(sessionTable)
      .values({
        id: data.getId(),
        createdAt: now,
        expiresAt: data.expiresAt,
        isActive: data.isActive,
        refreshHash: data.refreshHash,
        updatedAt: now,
        userDeviceId: data.userDeviceId,
        userId: data.userId,
        lastUsedAt: data.lastUsedAt!,
      })
      .onConflictDoUpdate({
        target: sessionTable.id,
        set: {
          expiresAt: data.expiresAt,
          isActive: data.isActive,
          refreshHash: data.refreshHash,
          updatedAt: now,
          userDeviceId: data.userDeviceId,
          userId: data.userId,
          lastUsedAt: data.lastUsedAt!,
          revokedAt: data.revokedAt,
        },
      });
  }

  async getById(id: string): Promise<Session | null> {
    const [data] = await this.drizzle
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, id));
    if (!data) {
      return null;
    }
    const session = new Session({
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      id: data.id,
      isActive: data.isActive,
      refreshHash: data.refreshHash,
      updatedAt: data.updatedAt,
      userDeviceId: data.userDeviceId,
      userId: data.userId,
      lastUsedAt: data.lastUsedAt!,
      revokedAt: data.revokedAt!,
    });
    return session;
  }
}
