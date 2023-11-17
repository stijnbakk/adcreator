<script lang="ts">
	export let componentConfig;
</script>

<div
	id="container"
	style={`width: ${componentConfig.canvas.width}px; height: ${componentConfig.canvas.height}px; background-color: ${componentConfig.canvas.backgroundColor}`}
	class={`canvas relative flex border border-black`}
>
	<h1 class="absolute top-10 left-10">
		{#each componentConfig.items as cardItem}
			<p>{cardItem.value}</p>
		{/each}
	</h1>
</div>

<style>
</style>
