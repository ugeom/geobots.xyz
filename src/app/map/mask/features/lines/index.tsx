// App imports
import { getStrokeLayer } from 'utils/layers/features';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ marker }: any) => {
	const { id, data } = marker;

	const sourceId = `lines-source-${id}`;
	const strokeId = `lines-layer-${id}`;

	const strokeLayer: any = getStrokeLayer(strokeId, sourceId)

	return (
		<Source 
		  id={sourceId} 
		  type="geojson" 
		  data={data}
		>
		  <Layer {...strokeLayer}/>
		</Source>
	)
}

Lines.displayName="Lines";