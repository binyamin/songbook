import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	console.error('Env var "$DATABASE_URL" is not defined');
	process.exit(1);
}

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
});
