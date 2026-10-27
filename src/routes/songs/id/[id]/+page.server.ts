import * as songs from '#lib/server/songs.ts';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = await songs.findOne(params.id);

	if (!data) error(404, 'Not Found');

	return {
		song: data,
	};
};

export const actions = {
	delete: async ({ params }) => {
		const { id } = params;

		if (!id || id.length !== 21) {
			// TODO: fail(...)
			return error(422, 'Validation Failed');
		}

		const res = await songs.remove(id);

		if (!res) error(404, 'Not Found');

		return redirect(303, '/songs');
	},
} satisfies Actions;
