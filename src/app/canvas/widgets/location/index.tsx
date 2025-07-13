// App imports
import './styles.scss';

// Context imports
import { useMapboxReverseApi } from 'context/api/mapbox/reverse';

export const Location = () => {
	const { placeInfo } = useMapboxReverseApi();

	if (!placeInfo) return <></>;

	return (
		<div className="map-location">
			{placeInfo}
		</div>
	)
}

Location.displayName="Location";