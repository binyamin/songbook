import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
	SESSION_SECRET: {},
	ADMIN_PASSWORD_SALT: {},
	ADMIN_PASSWORD_HASH: {},
	DATABASE_URL: {
		description: 'The database connection string.',
	},
	DATABASE_AUTH_TOKEN: {
		description: 'Auth token for the [Turso](https://turso.tech) database.',
		schema: v.optional(v.string()),
	},
});
