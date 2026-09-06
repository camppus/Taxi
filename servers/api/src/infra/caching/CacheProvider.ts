import { Global, Module } from '@nestjs/common';
import RedisCacheProvider from './providers/RedisCacheProvider.js';

export interface CacheProvider {
  add<T>(data: T, key: string, ttl?: number): Promise<void>;
  remove(key: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
}

@Module({
  providers: [
    {
      provide: 'CacheProvider',
      useValue: RedisCacheProvider,
    },
  ],
  exports: ['CacheProvider'],
})
@Global()
export default class CacheModule {}
