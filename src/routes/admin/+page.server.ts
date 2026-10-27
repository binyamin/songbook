import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) {
		return redirect(303, '/admin/login');
	}
};

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		return redirect(303, '/');
	},
} satisfies Actions;
