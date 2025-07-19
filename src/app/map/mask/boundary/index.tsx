// App imports
import { Stroke } from './stroke';
import { Eraser } from './eraser';

export const Boundary = ({ marker, boundary }: any) => {
  if (!boundary) return <></>;

  const { id } = marker;
  
  return (
    <>
      <Stroke id={id} boundary={boundary}/>
      <Eraser id={id} boundary={boundary}/>
    </>
    
  )
}

Boundary.displayName="Boundary";