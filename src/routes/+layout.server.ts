import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	return {
		isAdmin: event.locals.isAdmin,
	};
};
