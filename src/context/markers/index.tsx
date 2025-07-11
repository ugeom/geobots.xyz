// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { providers } from './data';

// Context imports
import { useLayer } from 'context/layer';

// Third-party imports
import * as turf from '@turf/turf';

const MarkersContext: React.Context<any> = createContext(null);

export const useMarkers = () => useContext(MarkersContext)

export const MarkersProvider = ({children}: any) => {
	const { getGeojson } = useLayer();

	const [ activePage, setActivePage ] = useState<any>(null);
	const [ addPin, setAddPin ] = useState(false);
	
	// markers properties	
	const [ markers, setMarkers ] = useState({});
	const [ currentMarkerId, setCurrentMarkerId ] = useState<any>(null);
	const [ currentImage, setCurrentImage ] = useState<any>(null);
	const [ currentName, setCurrentName ] = useState<any>(null);
	const [ radius, setRadius ] = useState(0.5);

	const getMarkerId = (markers: any) => {
	    const ids = Object.keys(markers).map(Number);
	    const maxId = ids.length ? Math.max(...ids) : 0;
	    return maxId + 1;
	};

    const addMarker = async (event: any) => {
    	const center = event.lngLat;
        const boundary = turf.circle([ center.lng, center.lat ], 0.5);

        const id = getMarkerId(markers);
        const data = getGeojson(boundary, 'LineString', 'road');

    	if (addPin === true) {
			const newMarker = {
				id,
				center,
				image: currentImage,
				name: currentName,
				radius,
				contoursMinutes: 10,
				geometryType: "circle",
				routingProfile: "walking",
				data
			};
			setMarkers((prev: any) => ({ 
				...prev, 
				[newMarker.id]: newMarker 
			}));
			setAddPin(false);
		}
	};

	const updateMarkers = (markerId: string, propertyKey: string, propertyValue: number) => {
	    setMarkers((prev: any) => ({
	        ...prev,
	        [markerId]: {
	            ...prev[markerId],
	            [propertyKey]: propertyValue,
	        },
	    }));
	};

	const rejectMarker = (event: any, markerId: any) => {
	    event.stopPropagation();
	    setMarkers((prev: any) => {
	        const { [markerId]: _, ...rest } = prev;
	        return rest;
	    });
	};

	useEffect(() => {
		const handleKeyDown = (event: any) => event.keyCode === 27 && setAddPin(false);
		window.addEventListener('keydown', handleKeyDown);
		
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<MarkersContext.Provider value={{
			markers, setMarkers,
			currentMarkerId, setCurrentMarkerId,
			addMarker, rejectMarker, updateMarkers,
			currentImage, setCurrentImage,
			currentName, setCurrentName,
			activePage, setActivePage,
			radius, setRadius,
			addPin, setAddPin,
			providers,
		}}>
			{children}
		</MarkersContext.Provider>
	)
}

MarkersContext.displayName = "MarkersContext";