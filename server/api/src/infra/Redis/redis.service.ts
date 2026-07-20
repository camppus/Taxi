import { Injectable, OnModuleInit } from "@nestjs/common";
import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import { CacheProvider } from "src/shared/interfaces/CacheProvider";

@Injectable()
export class RedisService implements CacheProvider, OnModuleInit {
  private readonly client: Keyv;
  constructor() {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL não definida");
    }
    this.client = new Keyv({
      store: new KeyvRedis(url),
    });
  }
  async onModuleInit() {
    const data = await this.set("health", { status: true });

    if (data != "OK") {
      throw new Error("Error on Redis");
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<"OK"> {
    await this.client.set(
      key,
      JSON.stringify(value),
      ttlSeconds ? ttlSeconds * 1000 : undefined,
    );
    return "OK";
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      return null;
    }
  }

  async delete(key: string): Promise<"OK"> {
    await this.client.delete(key);
    return "OK";
  }
}
