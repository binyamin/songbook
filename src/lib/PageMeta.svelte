<script lang="ts">
	import { site } from './const';

	interface Props {
		title: string;
	}

	let props: Props = $props();

	const title = $derived([props.title, site.title].filter(Boolean).join(' | '));
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
