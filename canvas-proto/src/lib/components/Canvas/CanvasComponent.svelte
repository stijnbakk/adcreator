<script lang="ts">
	import { Canvas, Layer } from 'svelte-canvas';
	import TextComponent from './TextComponent.svelte';
	import type { CanvasConfig } from './CanvasTypes';

	export let width: number = 500;
	export let height: number = 300;

	export let canvasConfiguration: CanvasConfig;
</script>

<Canvas autoplay {width} {height} style={'background: #acacac'} class="border-[1px] canvasElement">
	{#each canvasConfiguration.elements as element}
		{#if element.type === 'text'}
			<TextComponent value={element.value} properties={element.properties} />
		{/if}
	{/each}
</Canvas>
