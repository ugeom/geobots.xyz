// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null);

export const useGeo = () => useContext(GeoContext)

export const GeoProvider = ({children}: any) => {
	const mapRef = useRef<any>(null);

	const [ viewport, setViewport ] = useState(Locations.rotterdam);
	const [ mapStyle, setMapStyle ] = useState("mapbox://styles/mapbox/light-v11");

	useEffect(() => {
		const { longitude, latitude } = viewport;

		mapRef.current?.flyTo({
			center: [ longitude, latitude ],
			duration: 4000, 
			essential: true,
		});
	}, [ viewport ]);

	return (
		<GeoContext.Provider value={{
			mapRef, 
			mapStyle, setMapStyle, 
			viewport, setViewport, 
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";