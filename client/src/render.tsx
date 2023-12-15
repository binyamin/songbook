import path from 'node:path';

import 'preact/debug';
import { renderToString } from 'preact-render-to-string';

import { Layout } from './layout';

type DocumentProps = {
	title?: string;
	[x: string]: unknown;
}

type PageFile<T = unknown> = {
	documentProps?: DocumentProps | ((data: T) => DocumentProps | Promise<DocumentProps>);
	Page: preact.ComponentType<T>
}

const router = new Bun.FileSystemRouter({
	dir: path.join(import.meta.dir, 'pages'),
	style: 'nextjs',
});

export async function renderPage(url: string | URL, props?: Dict<unknown>): Promise<string | null> {
	if (url instanceof URL) {
		url = url.pathname;
	}

	// Find page component
	const match = router.match(url);
	if (!match) return null;

	const mod = await import(match.filePath);
	return render(mod, props);
}

export async function render(mod: PageFile, data?: Dict<unknown>) {
	const documentProps = typeof mod.documentProps === 'function'
		? await mod.documentProps(data)
		: mod.documentProps;

	const content = renderToString(<Layout><mod.Page {...data} /></Layout>);

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${documentProps?.title ? documentProps?.title + ' | ' : ''}${'Songbook'}</title>
	<link rel="stylesheet" href="/css/style.css" />
</head>
<body>
	${content}
</body>
</html>`
}
