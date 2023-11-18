<script lang="ts">
	import CanvasComponent from '$lib/components/Canvas/CanvasComponent.svelte';
	import type { CanvasConfig, CanvasElement } from '$lib/components/Canvas/CanvasTypes';
	import InputElement from '$lib/components/InputElement.svelte';
	import SelectElement from '$lib/components/selectElement.svelte';
	import { Canvas, Layer } from 'svelte-canvas';

	let canvasWidth = 400;
	let canvasHeight = 300;
	let canvasBackgroundColor = '#acacac';

	let elementTitle = 'Some text';

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

	let canvasConfiguration: CanvasConfig = {
		baseCanvas: {
			width: 400,
			height: 300
		},
		elements: [
			{
				type: 'text',
				value: 'Some text defined here',
				properties: {
					x: 0,
					y: 20,
					textColor: 'blue'
				}
			},
			{
				type: 'text',
				value: 'Some more text ',
				properties: {
					x: 0,
					y: 50
				}
			}
		]
	};
</script>

<div class="flex flex-col h-screen">
	<div class="border-b-[1px] min-h-[40px] p-2 flex justify-end items-center">
		<button class="btn btn-sm btn-outline" on:click={exportCanvas}>Export as png</button>
	</div>
	<div class="w-full flex flex-row flex-grow">
		<div class="w-[230px] border-r-[1px] p-3" id="sidebar">
			<!-- LEFT SIDEBAR -->
			<h2 class="font-bold text-sm mb-2">Elements</h2>
			<ul class="space-y-1">
				{#each canvasConfiguration.elements as element}
					<li
						class="overflow-clip line-clamp-1 p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
					>
						<span class="font-bold mr-2">{element.type[0]}</span>
						{element.value}
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex-grow" id="sidebar">
			<div class="bg-gray-50 w-full h-full items-center flex justify-center p-10">
				<CanvasComponent
					{canvasConfiguration}
					width={canvasConfiguration.baseCanvas.width}
					height={canvasConfiguration.baseCanvas.height}
				/>
			</div>
		</div>
		<div class="w-[230px] border-l-[1px] p-3" id="sidebar">
			<!-- RIGHT SIDEBAR -->
			<div class="border-b-[1px] p-3">
				<h2 class="font-bold text-sm mb-2">Canvas settings</h2>
				<div class="grid grid-cols-2 gap-1">
					<input
						type="number"
						bind:value={canvasConfiguration.baseCanvas.width}
						placeholder="width (px)"
						class="input input-sm input-bordered"
					/>
					<input
						type="number"
						bind:value={canvasConfiguration.baseCanvas.height}
						placeholder="height (px)"
						class="input input-sm input-bordered"
					/>
				</div>
			</div>
			<div class="border-b-[1px] p-3">
				<h2 class="font-bold text-sm mb-2">Elements</h2>
				{#each canvasConfiguration.elements as element, i}
					<div class="mb-3">
						<h3 class="font-bold text-xs mb-1">Element {i + 1}</h3>
						<input
							type="text"
							bind:value={element.value}
							class="input input-bordered input-sm mb-1"
						/>
						{#if element.properties}
							<div class="grid grid-cols-2 gap-1">
								<input
									type="number"
									bind:value={element.properties.x}
									placeholder="x (px)"
									class="input input-sm input-bordered"
								/>
								<input
									type="number"
									bind:value={element.properties.y}
									placeholder="y (px)"
									class="input input-sm input-bordered"
								/>
							</div>
							<select
								placeholder="color"
								bind:value={element.properties.textColor}
								class="w-full select select-bordered select-xs"
							>
								<option value="black">Black</option>
								<option value="blue">Blue</option>
								<option value="grey">Grey</option>
							</select>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<!-- <div class="border-t-[1px] h-[40px]"></div> -->
</div>

<!-- <div class="bg-neutral-200 p-10">
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
</div> -->
