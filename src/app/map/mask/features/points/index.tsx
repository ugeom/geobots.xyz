// App imports
import { getPointsLayer } from 'utils/layers/features';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Points = ({ marker }: any) => {
  const { id, data } = marker;

  const sourceId = `points-source-${id}`;
  const layerId = `points-layer-${id}`;

  const pointsLayer: any = getPointsLayer(layerId, sourceId);

  return (
    <Source 
      id={sourceId} 
      type="geojson" 
      data={data}
    >
      <Layer {...pointsLayer} />
    </Source>
  );
};

Points.displayName = 'Points';