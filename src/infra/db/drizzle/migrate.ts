import { migrate } from 'drizzle-orm/postgres-js/migrator';
import db from './db';

export const migrateDB = async () => {
  console.log('migrating DB');
  await migrate(db, { migrationsFolder: 'drizzle-migrations' });
  console.log('DB migrated');
};

migrateDB();
