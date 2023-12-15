import { createMiddleware } from 'hono/factory';
import { renderPage } from '../../client/src/render.tsx';

declare module 'hono' {
	interface ContextRenderer {
		(props?: Dict<unknown>): Promise<Response>;
		(path: string, props?: Dict<unknown>): Promise<Response>;
	}
}

export const views = createMiddleware((c, next) => {
	function render(props?: Dict<unknown>): Promise<Response>;
	function render(path: string, props?: Dict<unknown>): Promise<Response>;
	async function render(path?: string | Dict<unknown>, props?: Dict<unknown>): Promise<Response> {
		if (typeof path !== 'string') {
			props = path;
			path = c.req.url;
		}
	
		const res = await renderPage(path, props);
	
		if (!res) return c.notFound();
		return c.html(res);
	}

	c.setRenderer(render);

	return next();
});
