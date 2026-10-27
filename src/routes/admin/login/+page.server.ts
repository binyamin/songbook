import { verify } from '#lib/server/auth.ts';
import { cookieOptions, createToken } from '#lib/server/session.ts';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const pw = String((await request.formData()).get('password') ?? '');
		const isAdmin = verify(pw);

		if (!isAdmin) return fail(401, { error: 'Incorrect username or password' });

		cookies.set('session', createToken(), cookieOptions);
		redirect(303, '/admin');
	},
} satisfies Actions;
