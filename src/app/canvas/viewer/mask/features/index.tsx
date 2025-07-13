// App imports
import { Lines } from './lines';

export const Features = ({ boundary, marker }: any) => {
	if (!boundary) return <></>;

	return (	
		<Lines 
			boundary={boundary} 
			source='composite'
			marker={marker}
		/>
	)
}

Features.displayName="Features";