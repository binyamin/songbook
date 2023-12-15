import { Hono } from 'hono';

import { views } from '../middleware/render';

const app = new Hono();

app.use('*', views);

app.get('/', (c) => c.render());

export default app;
