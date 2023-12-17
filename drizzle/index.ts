import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { Database } from 'bun:sqlite';

import * as schema from './schema.ts';

export { schema }

const dbFile = process.env.NODE_ENV === 'test'
	? ':memory:'
	: process.env.DB_PATH;

const sqlite = new Database(dbFile);
sqlite.exec('PRAGMA journal_mode = WAL;');

export const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: './drizzle/migrations' });
