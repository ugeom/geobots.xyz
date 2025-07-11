// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

// Third party imports
import { GeolocateControl } from 'react-map-gl/mapbox';

export const Geolocate = () => {
	const { setViewport } = useGeo();
	
	const onGeolocate = (e: any) => {
		const { longitude, latitude } = e.coords;
		setViewport({ longitude, latitude })
	}

	return (
		<GeolocateControl
			showAccuracyCircle={false} 
			showUserLocation={false}
			positionOptions={{enableHighAccuracy: true}}
			position="bottom-right"
			onGeolocate={onGeolocate}
		/>
	)
}

Geolocate.displayName="Geolocate";