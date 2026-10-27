<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';
	import SongForm from '#lib/songs/song-form.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<PageMeta title="New Song" />

<article class="prose | flow">
	<h1>New Song</h1>

	<SongForm type="new" errors={form?.errors} />
</article>
