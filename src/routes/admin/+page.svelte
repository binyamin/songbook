<script lang="ts">
	import { site } from '#lib/const.ts';
	import PageMeta from '#lib/PageMeta.svelte';
</script>

<PageMeta title={'Admin'} ignore />

<article class="prose | flow">
	<h1>{site.title}</h1>

	<p>Welcome back. <a href="/songs/new">Add a new song</a>.</p>
</article>
