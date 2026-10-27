import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		return redirect(303, '/');
	},
} satisfies Actions;
