// React imports
import { useContext, createContext } from 'react';

const MapboxIsochroneApiContext: React.Context<any> = createContext(null)

export const useMapboxIsochroneApi = () => useContext(MapboxIsochroneApiContext)

export const MapboxIsochroneApiProvider = ({children}: any) => {
	const fetchIsochrone = async ({ routingProfile, center, contoursMinutes }: any) => {
		const { lng, lat } = center;

		const tempUrl = `
			https://api.mapbox.com/isochrone/v1/mapbox/
			${routingProfile}/
			${lng}%2C
			${lat}
			?contours_minutes=${contoursMinutes}
			&polygons=true
			&denoise=1
			&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
		`;
		const url = tempUrl.replace(/\s/g, '');
		try {
			const res = await fetch(url);
			if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
			const receivedData = await res.json();
			return receivedData;
		}
		catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	}

	return (
		<MapboxIsochroneApiContext.Provider value={{ fetchIsochrone }}>
			{children}
		</MapboxIsochroneApiContext.Provider>
	)
}

MapboxIsochroneApiContext.displayName = "MapboxIsochroneApiContext";