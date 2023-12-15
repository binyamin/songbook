import { build, type BuildOptions } from 'esbuild';

const DEV = Bun.env.NODE_ENV !== 'production';

const options: BuildOptions = {
	platform: 'browser',
	format: 'esm',
	target: ['chrome115', 'safari16'],
	jsx: 'automatic',
	jsxDev: DEV,
	jsxImportSource: 'preact',
	minify: true,
	minifyIdentifiers: !DEV,
	keepNames: DEV,
	bundle: true,
	treeShaking: true,
	sourcemap: 'linked',
	sourcesContent: DEV,
	logLevel: 'info',
	color: true,
	mainFields: ['style'],
	conditions: ['style'],
	absWorkingDir: import.meta.dir,
	outbase: 'src',
	outdir: 'dist',
}

if (import.meta.main) {
	await build({
		...options,
		entryPoints: ['./src/css/kochav.css'],
	});
}
