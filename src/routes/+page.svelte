<script lang="ts">
	import { site } from '#lib/const.ts';
	import PageMeta from '#lib/PageMeta.svelte';
</script>

<PageMeta title="" />

<article class="prose | flow">
	<h1>{site.title}</h1>

	<p>A personal collection of song chords. Take a look around.</p>

	<a href="/songs">Browse the songs →</a>
</article>
