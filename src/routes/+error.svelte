<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';

	let { error } = $props();

	const title = $derived(
		error.status === 404 ? 'Page Not Found' : error.message,
	);
</script>

<PageMeta {title} />

<article class="prose | flow">
	<h1>{title}</h1>

	{#if error.status === 404}
		<p>This page does not exist. Go <a href="/">Home</a>.</p>
	{:else}
		<p>The server responded with the <var>{error.status}</var> error code.</p>
	{/if}
</article>
