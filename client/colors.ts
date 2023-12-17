import path from 'node:path';

import harmony from '@evilmartians/harmony/base';

function scale(name: string, scale: Record<number, string>) {
	return Object.fromEntries(
		Object.entries(scale).map(
			([k, v]) => ['--color-' + name + '-' + k, v]
		),
	);
}

const file = Bun.file(path.resolve(import.meta.dir, 'dist/css/colors.css'));

const css = `:root {${
	Object.entries(scale('accent', harmony.indigo))
	.concat(Object.entries(scale('neutral', harmony.neutral)))
	.map(([k, v]) => '\n\t' + k + ':' + v + ';').join('') + '\n'
}}`;

await Bun.write(file, css);
