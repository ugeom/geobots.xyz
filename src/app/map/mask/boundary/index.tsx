// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Boundary = ({ marker, boundary }: any) => {
  const { id } = marker;

  if (!boundary) return <></>

  const sourceId = `boundary-source-${id}`;
  const eraserId = `boundary-eraser-${id}`; 

  const layer: any = {
    id: `boundary-stroke-${id}`,
    type: 'line',
    source: sourceId,
    paint: {
      'line-width': 4,
      'line-color': "rgba(166, 204, 245, 1)",
      'line-opacity': 0.8,
      'line-dasharray': [2, 2],
    }
  }

  const eraserLayer = {
    id: eraserId,
    type: 'clip',
    source: sourceId,
    layout: {'clip-layer-types': ['model']},
    minzoom: 14
  };

  const layers: any = [ layer, eraserLayer ]

  return (
    <Source 
      key={sourceId} 
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