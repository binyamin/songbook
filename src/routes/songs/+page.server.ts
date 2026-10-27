import * as songs from '#lib/server/songs.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		songs: await songs.findMany(),
	};
};
