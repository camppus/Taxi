import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './src/infra/persistence/drizzle/schema.ts',
    out: './src/infra/persistence/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=drizzle.config.js.map