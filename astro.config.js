import solid from '@astrojs/solid-js';
import vercel from '@astrojs/vercel';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
	integrations: [
		solid(),
	],
	output: 'server',
	adapter: vercel(),
	server: {
		port: 3000,
	},
	build: {
		inlineStylesheets: 'never',
	},
	env: {
		schema: {
			SESSION_SECRET: envField.string({ context: 'server', access: 'secret' }),
			ADMIN_PASSWORD_SALT: envField.string({
				context: 'server',
				access: 'secret',
			}),
			ADMIN_PASSWORD_HASH: envField.string({
				context: 'server',
				access: 'secret',
			}),
		},
	},
});
