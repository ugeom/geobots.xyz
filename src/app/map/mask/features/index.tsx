// App imports
import { Lines } from './lines';
import { Points } from './points';
import { Polygons } from './polygons';

export const Features = ({ marker }: any) => {
	const { geometryType } = marker;

	const componentMap: any = {
		LineString: Lines,
		Points: Points,
		Polygon: Polygons
	};

	const Component = componentMap[geometryType];

	return Component ? <Component marker={marker} /> : null;
}

Features.displayName='Features';