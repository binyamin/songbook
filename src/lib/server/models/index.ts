import * as v from 'valibot';

export const song = v.object({
	id: v.pipe(v.string(), v.nanoid()),
	title: v.pipe(
		v.string(),
		v.minLength(1, 'This field is required'),
	),
	// key: string([musical_key()]),
	content: v.pipe(
		v.string(),
		v.minLength(1, 'This field is required'),
	),
});

export type Song = v.InferInput<typeof song>;
