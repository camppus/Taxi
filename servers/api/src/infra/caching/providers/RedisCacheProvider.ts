import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { CacheProvider } from '../CacheProvider.js';

@Injectable()
export default class RedisCacheProvider
  implements CacheProvider, OnModuleInit, OnModuleDestroy
{
  private readonly redisURL = process.env.REDIS_URL;
  private readonly logger = new Logger(RedisCacheProvider.name);
  private client!: RedisClientType;

  constructor() {
    if (!this.redisURL) {
      throw new Error('REDIS_URL is not configured');
    }

    this.client = createClient({
      url: this.redisURL,
    });

    this.client.on('error', (error) => {
      this.logger.error(`Redis error: ${error.message}`);
    });

    this.client.on('connect', () => {
      this.logger.verbose('Redis connecting...');
    });

    this.client.on('ready', () => {
      this.logger.verbose('Redis connected');
    });

    this.client.on('reconnecting', () => {
      this.logger.warn('Redis reconnecting...');
    });

    this.client.on('end', () => {
      this.logger.debug('Redis disconnected');
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  async add<T>(data: T, key: string, ttl?: number): Promise<void> {
    const value = JSON.stringify(data);

    if (ttl) {
      await this.client.set(key, value, {
        EX: ttl,
      });

      return;
    }

    await this.client.set(key, value);
  }

  async remove(key: string): Promise<void> {
    await this.client.del(key);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }
}
