<script lang="ts">
	type Option = {
		value: string;
		label: string;
	};
	export let fieldLabel: string;
	export let placeholder: string = '';
	export let value: any;
	export let options: Option[];
</script>

<div class="form-control w-full">
	<label class="label">
		<span class="label-text">{fieldLabel}</span>
	</label>
	<select bind:value {placeholder}>
		{#each options as item}
			<option value={item.value}>{item.label}</option>
		{/each}
	</select>
</div>
