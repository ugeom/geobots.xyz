// App imports
import { getPolygonsLayer } from 'utils/layers/features';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Polygons = ({ marker }: any) => {
  const { id, data, source } = marker;

  const sourceId = `polygons-source-${id}`;
  const layerId = `polygons-layer-${id}`;

  const polygonsLayer: any = getPolygonsLayer(layerId, sourceId);

	return (
		<Source 
			id={sourceId} 
			type="geojson" 
			data={data}
		>
	        <Layer {...polygonsLayer}/>
	    </Source>
	);
};

Polygons.displayName = "Polygons";
