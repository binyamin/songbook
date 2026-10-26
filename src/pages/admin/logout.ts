import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
	cookies.delete('session', { path: '/' });
	return redirect('/', 303);
};
