// React imports
import { useState } from 'react';

// App imports
import { Boundary } from './boundary';
import { Features } from './features';
import { CustomMarker } from './marker';

export const Layers = ({ marker }: any) => {
  const [ boundary, setBoundary ] = useState<any>(null);

  return (
    <div key={marker.id}>
      <Boundary marker={marker} boundary={boundary}/>
      <Features marker={marker}/>
      <CustomMarker marker={marker} setBoundary={setBoundary}/>
    </div>
  )
};

Layers.displayName="Layers";