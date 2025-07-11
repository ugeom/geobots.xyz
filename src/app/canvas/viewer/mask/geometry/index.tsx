// App imports
import { Lines } from './lines';

export const Geometry = ({ boundary, marker }: any) => {
	if (!boundary) return <></>;

	return (	
		<Lines 
			boundary={boundary} 
			source='composite'
			marker={marker}
		/>
	)
}

Geometry.displayName="Geometry";