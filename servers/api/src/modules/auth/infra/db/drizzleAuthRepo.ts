import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDb } from '../../../../infra/persistence/drizzle/index.js';
import AuthRepo from '../../domain/repositories/authRepo.js';
import { AuthUser } from '../../domain/entities/authUser.js';
import { users as usersTable } from '../../../../infra/persistence/drizzle/schemas/entities.js';
import { eq } from 'drizzle-orm';
import FullName from '../../../../shared/entities/fullName.js';
import Phone from '../../../../shared/entities/phone.js';

@Injectable()
export default class DrizzleAuthRepo implements AuthRepo {
  constructor(
    @Inject('DRIZZLE')
    private readonly drizzle: DrizzleDb,
  ) {}

  async registerUser(data: AuthUser): Promise<void> {
    try {
      await this.drizzle.insert(usersTable).values({
        name: data.getName(),
        phone: data.getPhone(),
        id: data.getId(),
        status: 'ACTIVE',
        isAdmin: false,
      });
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async getUserById(id: string): Promise<AuthUser | null> {
    const [user] = await this.drizzle
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user) {
      return null;
    }

    return new AuthUser({
      createdAt: user.createdAt,
      id: user.id,
      isActive: user.status == 'ACTIVE',
      name: new FullName(user.name),
      phone: new Phone(user.phone),
      updateAt: user.updatedAt,
      isAdmin: user.isAdmin,
    });
  }

  async getUserByPhone(phone: string): Promise<AuthUser | null> {
    const [user] = await this.drizzle
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, phone));

    if (!user) {
      return null;
    }

    return new AuthUser({
      createdAt: user.createdAt,
      id: user.id,
      isActive: user.status == 'ACTIVE',
      name: new FullName(user.name),
      phone: new Phone(user.phone),
      updateAt: user.updatedAt,
      isAdmin: user.isAdmin,
    });
  }
}
