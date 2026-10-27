<script lang="ts">
	import './song-form.css';
	import '#lib/ui/text-field/text-field.css';
	import type { InputValue } from '#lib/server/songs.ts';
	import Button from '#lib/ui/button/button.svelte';
	import type { FlatErrors } from 'valibot';

	interface Props {
		type: 'new' | 'edit';
		input?: InputValue;
		cancelUrl?: string;
		errors?: FlatErrors<any>;
	}

	let props: Props = $props();
</script>

<form method="post" class="flow">
	{#if props.errors?.root?.[0]}
		<output class="_error">
			<p>
				<b>Error:</b> {props.errors?.root?.[0]}
			</p>
		</output>
	{/if}

	<div class="form-field">
		<label for="form-title">Title</label>
		<input
			class="input"
			data-type="text"
			type="text"
			name="title"
			id="form-title"
			required
			autocapitalize="words"
			value={props.input?.title}
		/>

		{#if props.errors?.nested?.title?.[0]}
			<output class="_error">
				<p>
					<b>Error:</b> {props.errors?.nested?.title?.[0]}
				</p>
			</output>
		{/if}
	</div>
	{
		// /* <div class="form-field">
		// <label for="form-key">Key Signature</label>
		// <!-- Ideally, this would be a combobox (a text-field with autocomplete) -->
		// <input class="input" data-type="text" type="text" name="key" id="form-key" pattern="[A-G][b#]?m?" size={3} />
		// <!-- TODO: hint text with example key signatures -->
		// </div> */
		''
	}
	<div class="form-field">
		<label for="form-content">Content</label>
		<!-- Idea: Progressive enhancement: JS which adds a song-part fieldset (title+content) when a button is clicked -->
		<textarea
			class="input"
			name="content"
			id="form-content"
			spellcheck={false}
			autocomplete="off"
			required
		>{props.input?.content}</textarea>

		{#if props.errors?.nested?.content?.[0]}
			<output class="_error">
				<p>
					<b>Error:</b> {props.errors?.nested?.content?.[0]}
				</p>
			</output>
		{/if}
	</div>

	<div class="l-cluster">
		{#if props.cancelUrl}
			<Button variant="soft" href={props.cancelUrl}>Cancel</Button>
		{/if}

		<Button type="submit">
			{props.type === 'new' ? 'Create' : 'Save'}
		</Button>
	</div>
</form>
