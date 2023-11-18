<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type InputType = 'number' | 'text';

	export let fieldLabel: string;
	export let placeholder: string = '';
	export let type: any = 'text';
	export let value: any;
</script>

<div class="form-control w-full">
	<label class="label">
		<span class="label-text">{fieldLabel}</span>
	</label>
	<input bind:value type="text" {placeholder} class="input input-bordered" />
</div>
