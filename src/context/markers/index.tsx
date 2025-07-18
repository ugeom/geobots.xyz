// React imports
import { useState, useEffect, useContext, createContext } from 'react';

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
		const isMobile = window.matchMedia("(max-width: 768px)");
		isMobile.matches && setActivePage(false);
	}

    const addMarker = async (event: any) => {
    	const id = getMarkerId(markers);
    	const center = event.lngLat;

    	if (addPin === true) {
			const newMarker = {
				id,
				center,
				radius: 0.5,
				contoursMinutes: 10,
				boundaryType: "circle",
				routingProfile: "walking",
				image: currentImage,
				activeTrash: false,
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
			activateMarker, 
			addMarker, rejectMarker, updateMarkers,
			currentMarkerId, setCurrentMarkerId,
			currentImage, setCurrentImage,
			currentProvider, setCurrentProvider,
			activePage, setActivePage,
			addPin, setAddPin,
		}}>
			{children}
		</MarkersContext.Provider>
	)
}

MarkersContext.displayName = "MarkersContext";