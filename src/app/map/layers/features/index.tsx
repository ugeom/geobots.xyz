// App imports
import { Lines } from './lines';
import { Points } from './points';
import { Polygons } from './polygons';

export const Features = ({ marker }: any) => {
	const { geometryType, source } = marker;

	return (
		<>	
			{geometryType === 'LineString' && 
				<Lines 
					source={source}
					marker={marker}
				/>
			}
			{geometryType === 'Points' && 
				<Points 
					source={source}
					marker={marker}
				/>
			}
			{geometryType === 'Polygon' && 
				<Polygons 
					source={source}
					marker={marker}
				/>
			}
		</>
	)
}

Features.displayName='Features';