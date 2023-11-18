<script lang="ts">
	import { Canvas, Layer } from 'svelte-canvas';
	import type { CanvasElementProperties, Properties } from './CanvasTypes';

	export let value: string = 'default text';
	export let properties: CanvasElementProperties;

	$: render = ({ context, width, height }) => {
		context.font = `20px sans-serif`;
		context.fillStyle = properties.textColor ?? 'black';
		context.fillText(value, properties.x, properties.y, width);
	};
</script>

<Layer {render} />
