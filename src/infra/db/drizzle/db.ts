import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as users from './models/users-model';
import * as todos from './models/todos-model';
import * as refresh from './models/refresh-model';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client, { schema: { ...users, ...todos, ...refresh } });

export default db;
