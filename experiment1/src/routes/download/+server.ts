import type { RequestHandler } from './$types';

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image';

// Normal .svelte component
// import CardComponent from './CardComponent.svelte';
import CardComponent from './CardComponent.svelte';

export const POST: RequestHandler = async ({ request }) => {
	console.log('request to /download was made');
	const componentConfig = await request.json();
	console.log('componentConfig incoming to POST endpoint:', componentConfig);

	const options: RenderOptions = {
		width: componentConfig.canvas.width,
		height: componentConfig.canvas.height,
		props: {
			componentConfig: componentConfig
		},
		fonts: [
			{
				name: 'Typewriter',
				url: `http://adcreator313.vercel.app/TYPEWR__.TTF`,
				weight: 400,
				style: 'normal'
			}
		]
	};

	const image = await image_from_component(CardComponent, options);
	const response = new Response(image);
	response.headers.append('Content-Type', 'image/png');
	response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
	return response;
};
