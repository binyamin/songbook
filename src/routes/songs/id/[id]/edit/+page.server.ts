import { formToJSON } from '#lib/helpers.ts';
import * as songs from '#lib/server/songs.ts';
import { error, fail, redirect } from '@sveltejs/kit';
import { flatten, safeParse } from 'valibot';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.isAdmin) {
		return error(401, 'Unauthorized');
	}

	const data = await songs.findOne(params.id);

	if (!data) {
		return error(404);
	}

	return {
		song: data,
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const input = formToJSON(await request.formData());

		const res = safeParse(songs.inputSchema, input);

		if (!res.success) {
			return fail(422, {
				errors: flatten(res.issues),
			});
		}

		const data = await songs.update(params.id, res.output);

		return redirect(303, '/songs/id/' + data.id);
	},
} satisfies Actions;
