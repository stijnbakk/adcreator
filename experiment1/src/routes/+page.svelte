<script lang="ts">
	import CardComponent from './download/CardComponent.svelte';

	let title: string = 'Some title';
	let canvasWidth: number = 500;
	let canvasHeight: number = 350;

	let backgroundColor: string = '#ffffff';

	let items = [
		{
			value: 'Text1',
			type: 'text'
		},
		{
			value: 'Text2',
			type: 'text'
		}
	];

	let componentConfig = {
		canvas: {
			width: 300,
			height: 300,
			backgroundColor: '#ffffff'
		},
		items: [
			{
				value: 'Text 123',
				type: 'text'
			},
			{ value: 'Text 456', type: 'text' }
		]
	};

	const addToItems = () => {
		console.log('addToItems called');
		items.push({ value: '', type: 'text' });
	};

	const requestImage = async () => {
		console.log('requestImage called from CLIENT');
		const res = await fetch('/download', {
			method: 'POST',
			body: JSON.stringify(componentConfig)
		});
		console.log('res:', res);

		const blob = await res.blob();

		// Create a URL for the blob
		const blobUrl = URL.createObjectURL(blob);

		// Create a link element
		const link = document.createElement('a');

		// Set the href attribute with the blob URL
		link.href = blobUrl;

		// Set the download attribute with the desired filename
		link.download = 'downloadedFile.png';

		// Append the link to the document
		document.body.appendChild(link);

		// Trigger a click event on the link to start the download
		link.click();

		// Remove the link from the document
		document.body.removeChild(link);

		// Revoke the blob URL to free up resources
		URL.revokeObjectURL(blobUrl);
	};
</script>

<div class="grid grid-cols-2 container mx-auto py-6 gap-3">
	<div>
		<h1 class="font-bold text-2xl mb-4">Component</h1>
		<CardComponent {componentConfig} />
	</div>

	<div>
		<h1 class="text-xl font-bold">Edit contents here</h1>

		<h2 class="text-lg font-bold">Image settings</h2>

		<div class="grid grid-cols-2 gap-3 mb-6">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Width</span>
				</label>
				<input
					bind:value={componentConfig.canvas.width}
					type="number"
					placeholder="Width (px)"
					class="input input-bordered"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Height</span>
				</label>
				<input
					bind:value={componentConfig.canvas.height}
					type="number"
					placeholder="Width (px)"
					class="input input-bordered"
				/>
			</div>
		</div>
		<div class="form-control w-full max-w-xs mb-10">
			<label class="label">
				<span class="label-text">Background color</span>
			</label>
			<select bind:value={componentConfig.canvas.backgroundColor} class="select select-bordered">
				<option value="#FF2D00">Red</option>
				<option value="#ffffff">White</option>
			</select>
		</div>

		<h2 class="text-lg font-bold">Image contents</h2>
		<div class="form-control w-full max-w-xs mb-10">
			{#each componentConfig.items as cardItem}
				<div class="grid grid-cols-2 gap-3 mb-3">
					<input bind:value={cardItem.value} placeholder="Title" class="input input-bordered" />
					<select bind:value={cardItem.type} class="select select-bordered">
						<option value="text">Text</option>
					</select>
				</div>
			{/each}
			<div class="btn btn-outline" on:click={addToItems}>Add element</div>
		</div>

		<h2 class="text-lg font-bold">Generated stuff</h2>
		<p>POST request body</p>
		<pre class="font-mono">
			{JSON.stringify(componentConfig)}
		</pre>
		<br />
		<button class="btn btn-outline" on:click={requestImage}>Download image</button>
	</div>
</div>

<code>{items}</code>
