import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/infra/persistence/drizzle/schemas/enums.ts',
    './src/infra/persistence/drizzle/schemas/entities.ts',
  ],
  out: './src/infra/persistence/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
