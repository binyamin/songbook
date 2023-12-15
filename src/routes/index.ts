import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

import { views } from '../middleware/render';

const app = new Hono();

app.get('/css/kochav.css', serveStatic({ path: 'client/dist/css/kochav.css' }));
app.get('/css/kochav.css.map', serveStatic({ path: 'client/dist/css/kochav.css.map' }));
app.get('/css/:path+', serveStatic({ root: 'client/src' }));

app.use('*', views);

app.get('/', (c) => c.render());

export default app;
