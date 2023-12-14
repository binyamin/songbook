import { Hono } from 'hono';
import { timing } from 'hono/timing';

import { HttpError, status } from '../lib/http-error/index.ts';

const app = new Hono();

app.use('*', timing());

app.get('/', c => c.text('Hello World'));

app.onError((error, c) => {
	const payload: {
		code: number,
		name: string,
		message?: string,
	} = {
		code: 500,
		name: status.STATUS_TEXT[500],
	}

	if (error instanceof HttpError) {
		payload.code = error.status;
		payload.name = status.STATUS_TEXT[error.status];

		for (const [k, v] of error.headers ?? []) {
			c.header(k, v);
		}
	}

	if (error.message !== payload.name) {
		payload.message = error.message;
	}

	if (!(error instanceof HttpError)) {
		console.error(error);
	}

	c.status(payload.code);

	return c.json({ ok: false, error });
});

const server = Bun.serve({
	port: 8080,
	fetch(request) {
		return app.fetch(request);
	},
});

console.info('Server running at '+ server.url);
