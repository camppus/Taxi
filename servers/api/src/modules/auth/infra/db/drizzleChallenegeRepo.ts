import { Inject, Injectable } from '@nestjs/common';
import ChallengeRepo from '../../domain/repositories/challengeRepo.js';
import Challenge, {
  ChallengeContext,
} from '../../domain/entities/challenge.js';
import type { DrizzleDb } from '../../../../infra/persistence/drizzle/index.js';
import { challenges as ChallengeTable } from '../../../../infra/persistence/drizzle/schemas/entities.js';
import { eq } from 'drizzle-orm';

@Injectable()
export default class DrizzleChallenegeRepo implements ChallengeRepo {
  constructor(
    @Inject('DRIZZLE')
    private readonly drizzle: DrizzleDb,
  ) {}

  async save(data: Challenge): Promise<void> {
    const now = new Date();

    await this.drizzle
      .insert(ChallengeTable)
      .values({
        id: data.getId(),
        attempts: data.attempts,
        channel: data.channel,
        context: data.context,
        createdAt: data.getCreatedAt() ?? now,
        expiresAt: data.expiresAt,
        hash: data.hash,
        target: data.target,
        used: data.used,
        userId: data.userId,
      })
      .onConflictDoUpdate({
        target: ChallengeTable.id,
        set: {
          attempts: data.attempts,
          channel: data.channel,
          context: data.context,
          expiresAt: data.expiresAt,
          hash: data.hash,
          target: data.target,
          used: data.used,
          userId: data.userId,
        },
      });
  }
  async getById(id: string): Promise<Challenge | null> {
    const [challange] = await this.drizzle
      .select()
      .from(ChallengeTable)
      .where(eq(ChallengeTable.id, id));

    if (!challange) {
      return null;
    }
    const data = new Challenge({
      attempts: challange.attempts,
      channel: challange.channel,
      context: challange.context as ChallengeContext,
      createdAt: challange.createdAt,
      expiresAt: challange.expiresAt,
      hash: challange.hash,
      id: challange.id,
      target: challange.userId,
      used: challange.used,
      userId: challange.userId,
    });
    return data;
  }
}
