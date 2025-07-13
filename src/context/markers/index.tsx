// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { providers } from './data';

const MarkersContext: React.Context<any> = createContext(null);

export const useMarkers = () => useContext(MarkersContext)

export const MarkersProvider = ({children}: any) => {
	const [ activePage, setActivePage ] = useState<any>(null);
	const [ addPin, setAddPin ] = useState(false);
	
	// markers properties	
	const [ markers, setMarkers ] = useState({});
	const [ currentMarkerId, setCurrentMarkerId ] = useState<any>(null);
	const [ currentImage, setCurrentImage ] = useState<any>(null);
	const [ currentProvider, setCurrentProvider ] = useState<any>(null);

	const [ radius, setRadius ] = useState(0.5);

	const getMarkerId = (markers: any) => {
	    const prevIds = Object.keys(markers).map(Number);
	    const maxId = 
	    	prevIds.length ? 
	    	Math.max(...prevIds) : 
	    	0;
	    return maxId + 1;
	};

	const activateMarker = (src: any, provider: any) => {
		setAddPin((prev: boolean) => !prev);
		setCurrentImage(src);
		setCurrentProvider(provider);
	}

    const addMarker = async (event: any) => {
    	const id = getMarkerId(markers);
    	const center = event.lngLat;

    	if (addPin === true) {
			const newMarker = {
				id,
				center,
				radius,
				contoursMinutes: 10,
				boundaryType: "circle",
				routingProfile: "walking",
				image: currentImage,
				...currentProvider,
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
			currentProvider, setCurrentProvider,
			activePage, setActivePage,
			radius, setRadius,
			addPin, setAddPin,
			providers, activateMarker
		}}>
			{children}
		</MarkersContext.Provider>
	)
}

MarkersContext.displayName = "MarkersContext";