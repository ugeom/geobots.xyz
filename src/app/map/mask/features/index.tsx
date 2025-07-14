// App imports
import { Lines } from './lines';
import { Polygons } from './polygons';

export const Features = ({ marker }: any) => {
	const { geometryType } = marker;

	return (
		<>	
			{geometryType === "LineString" && <Lines 
				source='composite'
				marker={marker}
			/>}
			{geometryType === "Polygon" && <Polygons 
				source='composite'
				marker={marker}
			/>}
		</>
	)
}

Features.displayName="Features";