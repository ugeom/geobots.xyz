// App imports
import { getStrokeLayer } from 'utils/layers/boundary';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Stroke = ({ id, boundary }: any) => {
	const strokeId = `boundary-stroke-layer-${id}`;
	const sourceId = `boundary-stroke-source-${id}`;

	const strokeLayer: any = getStrokeLayer(strokeId, sourceId);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={boundary}
		>
		    <Layer {...strokeLayer}/>
		</Source>
	)
};

Stroke.displayName="Stroke";