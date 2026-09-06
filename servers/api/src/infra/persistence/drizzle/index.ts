import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const logger = new Logger('Drizzle');

pool.connect(() => {
  logger.debug('Drizzle connected to database sucessly');
});

export const db = drizzle({
  client: pool,
});

export type DrizzleDb = typeof db;
