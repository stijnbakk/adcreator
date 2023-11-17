<script lang="ts">
	import { page } from '$app/stores';
	import CardComponent from './CardComponent.svelte';

	let title: string = 'Some title';
	let canvasWidth: number = 500;
	let canvasHeight: number = 350;

	$: imageUrl = `${
		$page.url.origin
	}/download?canvaswidth=${canvasWidth}&canvasheight=${canvasHeight}&title=${encodeURIComponent(
		title
	)}`;
</script>

<div class="grid grid-cols-2 container mx-auto py-6">
	<div>
		<h1 class="font-bold text-2xl mb-4">Component</h1>
		<!-- <div
			id="card"
			style={`width: ${canvasWidth}px; height: ${canvasHeight}px`}
			class=" bg-purple-200 relative"
		>
			{#if title}
				<h1 class="absolute top-10 left-6">{title}</h1>
			{/if}
		</div> -->
		<CardComponent {canvasHeight} {canvasWidth} {title} />
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
					bind:value={canvasWidth}
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
					bind:value={canvasHeight}
					type="number"
					placeholder="Width (px)"
					class="input input-bordered"
				/>
			</div>
		</div>

		<h2 class="text-lg font-bold">Image contents</h2>
		<div class="form-control w-full max-w-xs mb-10">
			<label class="label">
				<span class="label-text">Title</span>
			</label>
			<input bind:value={title} placeholder="Title" class="input input-bordered" />
		</div>

		<h2 class="text-lg font-bold">Generated stuff</h2>
		<p>Image url:</p>
		<code>{imageUrl}</code>
		<br />

		<a href={imageUrl} class="btn btn-bordered">Download image</a>
	</div>
</div>
