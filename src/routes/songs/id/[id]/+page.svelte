<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';
	import Button from '#lib/ui/button/button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageMeta title={data.song.title + ' | Songs'} />

<article class="prose | flow">
	<div class="l-repel" style="--repel-align: center">
		<h1>{data.song.title}</h1>

		{#if data.isAdmin}
			<div class="l-cluster">
				<Button
					variant="text"
					href={'/songs/id/' + data.song.id + '/edit'}
				>Edit</Button>
				<form
					method="post"
					action={'?/delete'}
					onsubmit={(e) => {
						e.preventDefault();

						const res = window.confirm(
							'Once you delete this item, you cannot retrieve it. Are you sure you want to delete it?',
						);

						if (res) {
							e.currentTarget.submit();
						}
					}}
				>
					<Button type="submit" color="danger" variant="text">Delete</Button>
				</form>
			</div>
		{/if}
	</div>

	<pre>{data.song.content}</pre>
</article>
