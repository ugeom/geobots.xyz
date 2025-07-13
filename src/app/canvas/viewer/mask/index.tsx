// React imports
import { useState, useEffect } from 'react';

// App imports
import { CustomMarker } from './marker';
import { Boundary } from './boundary';
import { Geometry } from './geometry';

// Context imports
import { useMapboxIsochroneApi } from 'context/api/mapbox/isochrone';
import { useLayer } from 'context/layer';
import { useMarkers } from 'context/markers';

// Third party imports
import * as turf from '@turf/turf';

export const Mask = ({ marker }: any) => {
  const { fetchIsochrone } = useMapboxIsochroneApi();
  const { getGeojson } = useLayer();
  const { providers, updateMarkers } = useMarkers();

  const { id, name, center, radius, geometryType } = marker; 

  const providerData = providers.find((item: any) => item.name === name);

  const { type: currentType, layer } = providerData;

  const { lng, lat } = center;

  const [ boundary, setBoundary ] = useState<any>(null);

  useEffect(() => {
    const fetchBoundary = async (marker: any) => {
      if (geometryType === 'iso') {
        const data = await fetchIsochrone(marker);
        const currentBoundary = data.features[0]
        setBoundary(currentBoundary);
        updateMarkers(id, 'data', getGeojson(currentBoundary, currentType, layer));
      } 
      else {
        const circle = turf.circle([ lng, lat ], radius);
        setBoundary(circle);
        const geojson = getGeojson(circle, currentType, layer);
        updateMarkers(id, 'data', geojson);
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