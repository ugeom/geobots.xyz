// App imports
import { Card } from './card';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Features = () => {
	const { markers } = useMarkers();

	return (
		<div className="features-wrapper">
	        {Object.entries(markers).map(([key, marker]: any) => (
	            <Card key={key} marker={marker}/>
	        ))}
      </div>
	)
}

Features.displayName="Features";