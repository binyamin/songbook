import { formToJSON } from '#lib/helpers.ts';
import * as songs from '#lib/server/songs.ts';
import { error, fail, redirect } from '@sveltejs/kit';
import { flatten, safeParse } from 'valibot';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) {
		return error(401, 'Unauthorized');
	}
};

export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.isAdmin) {
			return error(401, 'Unauthorized');
		}

		const input = formToJSON(await request.formData());

		const res = safeParse(songs.inputSchema, input);

		if (!res.success) {
			return fail(422, {
				errors: flatten(res.issues),
			});
		}

		const data = await songs.insert(res.output);

		return redirect(303, '/songs/id/' + data.id);
	},
} satisfies Actions;
