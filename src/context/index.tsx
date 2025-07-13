import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { LayerProvider } from './layer';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <LayerProvider>
    <MarkersProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </MarkersProvider>
    </LayerProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";