// Context imports
import { MapboxReverseApiProvider } from './reverse';
import { MapboxSearchApiProvider } from './search';
import { MapboxIsochroneApiProvider } from './isochrone';

export const MapboxApiProvider = ({ children }: any) => {
  return (
    <MapboxSearchApiProvider>
    <MapboxReverseApiProvider>
    <MapboxIsochroneApiProvider>
      {children}
    </MapboxIsochroneApiProvider>
    </MapboxReverseApiProvider>
    </MapboxSearchApiProvider>
  )
}

MapboxApiProvider.displayName="MapboxApiProvider";