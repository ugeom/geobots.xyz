import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { DataProvider } from './data';
import { MarkersProvider } from './markers';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { MaskProvider } from './mask';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <DataProvider>
    <MarkersProvider>
    <MaskProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </MaskProvider>
    </MarkersProvider>
    </DataProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";