import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { DataProvider } from './data';
import { MaskProvider } from './mask';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { EventsProvider } from './events';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <DataProvider>
    <MaskProvider>
    <MarkersProvider>
    <EventsProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </EventsProvider>
    </MarkersProvider>
    </MaskProvider>
    </DataProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";