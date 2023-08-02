import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './infra/db/drizzle/models/*',
  out: '../drizzle-migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
