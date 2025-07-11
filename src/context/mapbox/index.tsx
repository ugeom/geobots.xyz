// Context imports
import { MapboxReverseApiProvider } from './reverse';
import { MapboxSearchApiProvider } from './search';
import { MapboxIsochroneApiProvider } from './isochrone';

export const MapboxProvider = ({ children }: any) => {
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

MapboxProvider.displayName="MapboxProvider";