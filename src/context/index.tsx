import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { MaskProvider } from './mask';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { EventsProvider } from './events';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
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
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";