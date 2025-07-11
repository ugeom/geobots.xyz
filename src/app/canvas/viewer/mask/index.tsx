// React imports
import { useState, useEffect } from 'react';

// App imports
import { CustomMarker } from './marker';
import { Boundary } from './boundary';
import { Geometry } from './geometry';

// Context imports
import { useMapboxIsochroneApi } from 'context/mapbox/isochrone';
import { useLayer } from 'context/layer';
import { useMarkers } from 'context/markers';

// Third party imports
import * as turf from '@turf/turf';

export const Mask = ({ marker }: any) => {
  const { fetchIsochrone } = useMapboxIsochroneApi();
  const { getGeojson } = useLayer();
  const { updateMarkers } = useMarkers();

  const { id, center, radius, geometryType, data } = marker; 
  const { lng, lat } = center;

  const [ boundary, setBoundary ] = useState<any>(null);

  useEffect(() => {
    const fetchBoundary = async (marker: any) => {
      if (geometryType === 'iso') {
        const data = await fetchIsochrone(marker);
        const currentBoundary = data.features[0]
        setBoundary(currentBoundary);
        updateMarkers(id, 'data', getGeojson(currentBoundary, 'LineString', 'road'));
      } 
      else {
        const circle = turf.circle([ lng, lat ], radius);
        setBoundary(circle);
        updateMarkers(id, 'data', getGeojson(circle, 'LineString', 'road'));
      }
    };
    fetchBoundary(marker);
  }, [ marker ]);

  return (
    <div key={id}>
      <Boundary marker={marker} boundary={boundary}/>
      <Geometry marker={marker} boundary={boundary}/>
      <CustomMarker marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";