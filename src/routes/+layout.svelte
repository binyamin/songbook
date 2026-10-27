<script lang="ts">
	import '../css/style.css';
	import './layout.css';
	import { site } from '#lib/const.ts';
	import Button from '#lib/ui/button/button.svelte';
	// import { enhance } from '$app/forms';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<div id="root" class="l-gelati | flow">
	<nav class="site-header | l-repel">
		<a href="/" class="logo" aria-label="Home">{site.title}</a>
		<ul role="list" class="l-cluster">
			<li><a href="/songs">Songs</a></li>

			{#if data.isAdmin}
				<li>
					<form
						method="POST"
						action="/admin?/logout"
						// use:enhance
						onsubmit={(e) => {
							e.preventDefault();

							const res = window.confirm('Are you sure you want to log out?');

							if (res) {
								e.currentTarget.submit();
							}
						}}
					>
						<Button type="submit" color="danger" variant="soft">Log out</Button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
	<main>
		{@render children()}
	</main>
	<footer class="l-center">
		<p>
			<span>Made with love by Binyamin Green</span> |{' '}
			<a href="/admin">Admin</a>
		</p>
	</footer>
</div>
