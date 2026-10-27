import { verifyToken } from '#lib/server/session.ts';
import { error, redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAdmin = verifyToken(event.cookies.get('session'));

	const { pathname } = event.url;

	const isLoginRoute = pathname === '/admin/login';
	const isProtectedWrite = !['GET', 'HEAD'].includes(event.request.method)
		&& !isLoginRoute;
	const isProtectedPage = pathname.startsWith('/admin') && !isLoginRoute;

	if (!event.locals.isAdmin) {
		// Protect any writes (besides login)
		if (isProtectedWrite) error(401, 'Unauthorized');

		// Protected pages under /admin (besides login)
		if (isProtectedPage) redirect(303, '/admin/login');
	}

	const response = await resolve(event);

	// Keep protected pages out of search results
	if (isProtectedPage || isLoginRoute) {
		response.headers.set('X-Robots-Tag', 'noindex');
	}

	return response;
};
