import { MapboxApiProvider } from './mapbox';

export const ApiProvider = ({children}: any) => {
  return (
    <MapboxApiProvider>
      {children}
    </MapboxApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";