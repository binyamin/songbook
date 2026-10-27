<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from 'svelte/elements';
	import './button.css';

	type StatusType =
		| 'primary'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'discovery';

	interface BaseProps {
		/**
		 * visual style
		 * @default 'solid'
		 */
		variant?: 'solid' | 'soft' | 'outline' | 'text';

		/**
		 * Only applies when {@linkcode variant} is either `solid`, `soft`, or `text`.
		 *
		 * @default 'primary'
		 * @todo
		 */
		color?: StatusType;
	}

	interface ButtonProps extends Omit<HTMLButtonAttributes, 'color'> {}
	interface AnchorProps extends Omit<HTMLAnchorAttributes, 'color'> {
		href: string;
		type?: never;
	}

	type Props = (ButtonProps | AnchorProps) & BaseProps;

	let { color, variant = 'solid', children, ...domProps }: Props = $props();
</script>

{#if 'href' in domProps}
	<a
		class={['button', domProps.class]}
		{...domProps}
		data-color={color}
		data-variant={variant}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		class={['button', domProps.class]}
		type="button"
		{...domProps}
		data-color={color}
		data-variant={variant}
	>
		{@render children?.()}
	</button>
{/if}
