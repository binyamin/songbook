<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import './text-field.css';

	let uid = $props.id();

	type InputType =
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'month'
		| 'number'
		| 'password'
		| 'search'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';

	interface DomProps extends Omit<HTMLInputAttributes, 'type'> {
		/**
		 * @default 'text'
		 */
		type?: InputType;
	}

	interface Props extends DomProps {
		label?: string;
	}

	let { children, label, ...inputProps }: Props = $props();
</script>

<div class="form-field">
	{#if label}
		<label for={uid}>
			{label}
			<!-- {props.required && <span aria-label='required'> *</span>} -->
		</label>
	{/if}

	<input type="text" {...inputProps} id={uid} class="input" data-type="text" />
	{@render children?.()}
</div>
