import type { APIRoute } from 'astro';
import { songs } from '~/services/db.ts';

export const POST: APIRoute = async (ctx) => {
	if (!ctx.locals.isAdmin) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	const id = ctx.params.id;

	if (!id || id.length !== 21) {
		return new Response('Validation Failed', {
			status: 422,
		});
	}

	const res = await songs.remove(id);

	if (!res) {
		return new Response(null, {
			status: 404,
		});
	}

	return ctx.redirect('/songs', 302);
};
