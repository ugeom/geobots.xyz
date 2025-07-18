// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Points = ({ marker }: any) => {
  const { id, data, source } = marker;

  const sourceId = `points-source-${id}`;
  const layerId = `points-layer-${id}`;

  const layerStyle: any = {
    layerId,
    type: "circle",
    source,
    paint: {
      'circle-radius': 3,
      'circle-color': ['get', 'circle-color']
    }
  };

  return (
    <Source 
      id={sourceId} 
      type="geojson" 
      data={data}
    >
      <Layer {...layerStyle} />
    </Source>
  );
};

Points.displayName = 'Points';