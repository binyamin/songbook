<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';
	import SongForm from '#lib/songs/song-form.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<PageMeta title={`Editing "${data.song.title}" | Songs`} ignore />

<article class="prose | flow">
	<h1>Editing <b>{data.song.title}</b></h1>

	<SongForm
		type="edit"
		errors={form?.errors}
		input={data.song}
		cancelUrl={'/songs/id/' + data.song.id}
	/>
</article>
