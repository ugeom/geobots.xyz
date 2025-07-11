import { GeoProvider } from './geo';
import { MapboxProvider } from './mapbox';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { LayerProvider } from './layer';
import { MarkersProvider } from './markers';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <MapboxProvider>
    <LayerProvider>
    <MarkersProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </MarkersProvider>
    </LayerProvider>
    </MapboxProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";