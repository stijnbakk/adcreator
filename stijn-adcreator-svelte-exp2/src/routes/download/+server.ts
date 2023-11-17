import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image';

// Normal .svelte component
import CardComponent from '../CardComponent.svelte';

export const GET: RequestHandler = (async ({ url }) => {
	try {
		// console.log('font location:', `${url.origin}/TYPEWR__.TTF`);
		const options: RenderOptions = {
			width: Number(url.searchParams.get('canvaswidth') ?? '500'),
			height: Number(url.searchParams.get('canvasheight') ?? '300'),
			props: {
				title: url.searchParams.get('title') ?? 'text not found',
				canvasWidth: url.searchParams.get('canvaswidth') ?? '500',
				canvasHeight: url.searchParams.get('canvasheight') ?? '300'
			},
			fonts: [
				{
					name: 'Typewriter',
					url: `${url.origin}/TYPEWR__.TTF`,
					weight: 400,
					style: 'normal'
				}
			]
		};

		// pass the component and options to the package
		const image = await image_from_component(CardComponent, options);
		const response = new Response(image);
		response.headers.append('Content-Type', 'image/png');
		response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
		return response;
	} catch (e) {
		console.error(e);
		throw error(500, 'Error trying to generate image from component.');
	}
}) satisfies RequestHandler;
