// Utils imports
import { getStrokeLayer, getEraserLayer } from 'utils/layers/boundary';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Boundary = ({ marker, boundary }: any) => {
  const { id } = marker;

  const sourceId = `boundary-source-${id}`;

  if (!boundary) return <></>;

  const strokeId = `boundary-stroke-${id}`;
  const eraserId = `boundary-eraser-${id}`; 

  const strokeLayer = getStrokeLayer(strokeId, sourceId);
  const eraserLayer = getEraserLayer(eraserId, sourceId);

  const layers: any = [ strokeLayer, eraserLayer ]

  return (
    <Source 
      id={sourceId} 
      type="geojson" 
      data={boundary}
    >
      {layers.map((currentLayer: any) => 
        <Layer key={currentLayer.id} {...currentLayer}/>)
      }
    </Source>
  )
}

Boundary.displayName="Boundary";