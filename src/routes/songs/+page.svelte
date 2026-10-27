<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageMeta title="Songs" />

<article class="prose | flow">
	<h1>Songs</h1>

	<ol start="1">
		{#each data.songs as song (song.id)}
			<li>
				<a href={'/songs/id/' + song.id}>{song.title}</a>
			</li>
		{/each}
	</ol>
</article>
