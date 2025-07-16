// React imports
import { useState } from 'react';

// App imports
import { Boundary } from './boundary';
import { CustomMarker } from './marker';
import { Features } from './features';

export const Mask = ({ key, marker }: any) => {
  const [ boundary, setBoundary ] = useState<any>(null);

  return (
    <div key={key}>
      <Boundary marker={marker} boundary={boundary}/>
      <CustomMarker marker={marker} setBoundary={setBoundary}/>
      <Features marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";