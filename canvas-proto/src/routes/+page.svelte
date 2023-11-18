<script>
	import InputElement from '$lib/components/InputElement.svelte';
	import SelectElement from '$lib/components/selectElement.svelte';
	import { Canvas, Layer } from 'svelte-canvas';

	let canvasWidth = 400;
	let canvasHeight = 300;
	let canvasBackgroundColor = '#acacac';

	let elementTitle = 'Some text';

	$: render = ({ context, width, height }) => {
		context.font = `20px sans-serif`;
		// context.textAlign = 'center';
		// context.textBaseline = 'middle';
		// context.x = 0;
		// context.y = 0;
		context.fillStyle = 'black';
		// context.fillText(elementTitle, width / 2, height / 2);
		context.fillText(elementTitle, 0, 20, width);
	};

	const exportCanvas = () => {
		console.log('exportCanvas called');
		const canvas = document.getElementsByClassName('canvasElement');
		console.log('canvas:', canvas);
		let canvasUrl = canvas[0].toDataURL('image/jpeg', 0.5);
		console.log('CavnasURL:', canvasUrl);
		const createEl = document.createElement('a');
		createEl.href = canvasUrl;
		createEl.download = 'download-this-canvas';
		createEl.click();
		createEl.remove();
	};

	$: canvasStyle = `background-color: ${canvasBackgroundColor};`;
</script>

<div class="bg-neutral-200 p-10">
	<div class="grid grid-cols-2 gap-10">
		<div>
			<Canvas
				autoplay
				width={canvasWidth}
				height={canvasHeight}
				style={canvasStyle}
				class="border-[1px] canvasElement"
			>
				<Layer {render} />
			</Canvas>
		</div>

		<div>
			<div class="border-b-black border-b-[1px] py-4">
				<div class="grid grid-cols-2 gap-3">
					<InputElement
						fieldLabel="Canvas width"
						bind:value={canvasWidth}
						type="number"
						placeholder="width (px)"
					/>
					<InputElement
						fieldLabel="Canvas height"
						bind:value={canvasHeight}
						type="number"
						placeholder="height (px)"
					/>
				</div>
				<SelectElement
					fieldLabel="Background color"
					bind:value={canvasBackgroundColor}
					options={[
						{ value: '#acacac', label: 'grey' },
						{ value: '#ffffff', label: 'white' }
					]}
				/>
			</div>
			<div class="border-b-black border-b-[1px] py-4">
				<InputElement fieldLabel="title" bind:value={elementTitle} />
			</div>

			<button class="btn btn-bordered" on:click={exportCanvas}>Export as png</button>

			<hr />
			<p>Canvas style (CSS):</p>
			<pre>
                {canvasStyle}
            </pre>
		</div>
	</div>
</div>

<style>
	.canvasElement {
		background-color: blue;
	}
</style>
