import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { LayersProvider } from './layers';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { EventsProvider } from './events';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <LayersProvider>
    <MarkersProvider>
    <EventsProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </EventsProvider>
    </MarkersProvider>
    </LayersProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";