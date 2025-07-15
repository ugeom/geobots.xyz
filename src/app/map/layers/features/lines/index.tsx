// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ source, marker }: any) => {
	const { id, data } = marker;

	const sourceId = `lines-source-${id}`;
	const layerId = `lines-layer-${id}`;

	const layerStyle: any = {
	  layerId,
	  type: "line",
	  source,
	  paint: {
	    'line-width': 2,
	    'line-color': ['get', 'line-color'],
	  },
	};

	return (
		<Source 
		  id={sourceId} 
		  type="geojson" 
		  data={data}
		>
		  <Layer {...layerStyle}/>
		</Source>
	)
}

Lines.displayName="Lines";