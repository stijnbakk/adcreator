export type CanvasConfig = {
	baseCanvas: {
		width: number;
		height: number;
	};
	elements: CanvasElement[];
};

export type CanvasElement = {
	type: 'text' | 'shape';
	value: string;
	properties: CanvasElementProperties;
};

export type CanvasElementProperties = {
	x: number;
	y: number;
	textColor?: 'black' | 'gray' | 'blue';
};
