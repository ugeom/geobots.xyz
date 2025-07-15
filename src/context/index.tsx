import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { LayerProvider } from './layer';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { EventsProvider } from './events';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <LayerProvider>
    <MarkersProvider>
    <EventsProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </EventsProvider>
    </MarkersProvider>
    </LayerProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";