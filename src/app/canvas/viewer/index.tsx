// React imports
import { useState } from 'react';

// App imports
import { Mask } from './mask';
import { Geolocate } from './geolocate';

// Context imports
import { useGeo } from 'context/geo';
import { useMarkers } from 'context/markers';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Viewer = () => {
	const { mapRef, viewport, mapStyle } = useGeo();
	const { addMarker, markers } = useMarkers();

	const [ isMapLoaded, setIsMapLoaded ] = useState(false);

	const onClick = (event: any) => addMarker(event);

	return (
		<Map
			ref={mapRef}
			initialViewState={viewport}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			mapStyle={mapStyle}
			onLoad={() => setIsMapLoaded(true)}
			onClick={onClick}
			doubleClickZoom={false}
		>
			{isMapLoaded && 
				Object.entries(markers).map(([ key, value ]: any) => 
					<Mask key={key} marker={value}/>
			)}
			<Geolocate/>
		</Map>
	)
}

Viewer.displayName="Viewer";