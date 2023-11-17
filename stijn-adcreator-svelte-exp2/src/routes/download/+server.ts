import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image';

// Normal .svelte component
import CardComponent from '../CardComponent.svelte';

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
				url: `http://localhost:5173/TYPEWR__.TTF`,
				weight: 400,
				style: 'normal'
			}
		]
	};

	const image = await image_from_component(CardComponent, options);

	// const blob = new Blob([image], { type: 'image/png' }); // Adjust the type according to your generated file type
	//
	// const blobUrl = URL.createObjectURL(blob);
	// 		const image = await image_from_component(CardComponent, options);
	const response = new Response(image);
	response.headers.append('Content-Type', 'image/png');
	response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
	return response;

	// Set up the response with the Blob URL

	// const response = new Response(image);

	// response.headers.append('Content-Type', 'image/png');
	// response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
	// console.log('response');
	// return response.blob;
	//
	// return json('yes, it works');
};

// export const GET: RequestHandler = (async ({ url }) => {
// 	try {
// 		// console.log('font location:', `${url.origin}/TYPEWR__.TTF`);
// 		const options: RenderOptions = {
// 			width: Number(url.searchParams.get('canvaswidth') ?? '500'),
// 			height: Number(url.searchParams.get('canvasheight') ?? '300'),
// 			props: {
// 				title: url.searchParams.get('title') ?? 'text not found',
// 				canvasWidth: url.searchParams.get('canvaswidth') ?? '500',
// 				canvasHeight: url.searchParams.get('canvasheight') ?? '300',
// 				backgroundColor: url.searchParams.get('backgroundColor' ?? '#fff')
// 			},
// 			fonts: [
// 				{
// 					name: 'Typewriter',
// 					url: `${url.origin}/TYPEWR__.TTF`,
// 					weight: 400,
// 					style: 'normal'
// 				}
// 			]
// 		};

// 		// pass the component and options to the package
// 		const image = await image_from_component(CardComponent, options);
// 		const response = new Response(image);
// 		response.headers.append('Content-Type', 'image/png');
// 		response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
// 		return response;
// 	} catch (e) {
// 		console.error(e);
// 		throw error(500, 'Error trying to generate image from component.');
// 	}
// }) satisfies RequestHandler;
