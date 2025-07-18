// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Polygons = ({ marker }: any) => {
  const { id, data, source } = marker;

  const sourceId = `polygons-source-${id}`;
  const layerId = `polygons-layer-${id}`;

  const layerStyle: any = {
    layerId,
    type: "fill-extrusion",
    source,
    paint: {
      "fill-extrusion-color": ["get", "fill-color"],
      'fill-extrusion-height': [
        'coalesce',
        ['get', 'height'],
        10
      ],
      'fill-extrusion-base': 0,
      "fill-extrusion-vertical-gradient": true,
      "fill-extrusion-opacity": 0.6,
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
	);
};

Polygons.displayName = "Polygons";
