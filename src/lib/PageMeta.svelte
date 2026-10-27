<script lang="ts">
	import { site } from './const';

	interface Props {
		title: string;
		/**
		 * @default false
		 */
		ignore?: boolean;
	}

	let props: Props = $props();

	const title = $derived([props.title, site.title].filter(Boolean).join(' | '));
</script>

<svelte:head>
	<title>{title}</title>
	{#if props.ignore}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
