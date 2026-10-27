<script lang="ts">
	import PageMeta from '#lib/PageMeta.svelte';
	import Button from '#lib/ui/button/button.svelte';
	import '#lib/ui/text-field/text-field.css';

	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<PageMeta title={'Log in'} />

<article class="prose | flow">
	<h1>Log in</h1>

	<form method="post" class="flow" use:enhance>
		<div class="form-field">
			<label for="form-password">Password</label>
			<input
				class="input"
				data-type="text"
				type="password"
				name="password"
				id="form-password"
				required
				autocomplete="current-password"
				minlength="8"
			/>
		</div>

		{#if form?.error}
			<p class="_error" role="alert">{form?.error}</p>
		{/if}

		<Button type="submit">Log in</Button>
	</form>
</article>
