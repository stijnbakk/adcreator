<script lang="ts">
	export let title: string;
	export let canvasWidth: number = 500;
	export let canvasHeight: number = 350;
</script>

<div
	id="container"
	style={`width: ${canvasWidth}px; height: ${canvasHeight}px`}
	class="canvas flex bg-purple-50"
>
	<h1>{title}</h1>
</div>

<style>
</style>
