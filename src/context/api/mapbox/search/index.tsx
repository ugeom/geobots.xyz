// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const MapboxSearchApiContext: React.Context<any> = createContext(null)

export const useMapboxSearchApi = () => useContext(MapboxSearchApiContext);

export const MapboxSearchApiProvider = ({children}: any) => {
	const [ searchText, setSearchText ] = useState('');
	const [ mapboxSearchData, setMapboxSearchData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const temporarySearchText = searchText.replace(" ", "__");
	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v5/
	    	mapbox.places/
	    	${temporarySearchText}.json
	    	?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    	&language=en
	    `;
	    const url = tempUrl.replace(/\s/g, '').replace("__", " ");
	    try {
		    const res = await fetch(url);
		    if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
		    const receivedData = await res.json();
		    setMapboxSearchData(receivedData);
	    }
	    catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	  }
	  searchText && fetchData();
	}, [ searchText ]);

	return (
		<MapboxSearchApiContext.Provider value={{ 
			mapboxSearchData, 
			searchText, setSearchText
		}}>
			{children}
		</MapboxSearchApiContext.Provider>
	)
}

MapboxSearchApiContext.displayName = "MapboxSearchApiContext";