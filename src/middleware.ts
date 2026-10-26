import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from '~/services/server/session';

export const onRequest = defineMiddleware(async (context, next) => {
	const { cookies, request, url, locals, redirect } = context;
	locals.isAdmin = verifyToken(cookies.get('session')?.value);

	const isWrite = !['GET', 'HEAD'].includes(request.method);
	const isLogin = url.pathname === '/admin/login';

	if (!locals.isAdmin && !isLogin) {
		if (isWrite) return new Response('Unauthorized', { status: 401 });
		if (url.pathname.startsWith('/admin')) return redirect('/admin/login', 303);
	}

	const response = await next();
	if (url.pathname.startsWith('/admin')) {
		response.headers.set('X-Robots-Tag', 'noindex');
	}
	return response;
});
