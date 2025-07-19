// React imports
import { useState, useContext, createContext } from 'react';

// App imports
import { getGeojson } from './helpers';

// Context imports
import { useMarkers } from 'context/markers';
import { useGeo } from 'context/geo';
import { useMapboxIsochroneApi } from 'context/api/mapbox/isochrone';

// Third-party imports
import * as turf from '@turf/turf';

const MaskContext: React.Context<any> = createContext(null);

export const useMask = () => useContext(MaskContext)

export const MaskProvider = ({ children }: any) => {
	const { mapRef } = useGeo();
	const { updateMarkers } = useMarkers();
	const { fetchIsochrone } = useMapboxIsochroneApi();

	const [ dragging, setDragging ] = useState(false);

	const onDragStart = (e: any, id: any) =>  {
		setDragging(true);
		updateMarkers(id, 'activeTrash', false);
	};

	const onDrag = (e: any, id: any, boundaryType: any, setTemporalDragPosition: any) => {
		setTemporalDragPosition(e.lngLat);
		if (boundaryType !== "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const onDragEnd = (e: any, id: any, boundaryType: any, setTemporalDragPosition: any) => {
		setTemporalDragPosition(null);
		setTimeout(() => setDragging(false), 0);
		if (boundaryType === "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const activateTrash = (e: any, id: any, activeTrash: any) => {
		e.stopPropagation();
		if (!dragging) updateMarkers(id, 'activeTrash', !activeTrash);
	};

	const getIsochrone = async (marker: any) => {
		const data = await fetchIsochrone(marker);
		const currentBoundary = data.features[0];
		return currentBoundary;
		
	};
	const getCircle = (marker: any) => {
		const { radius, center } = marker;
		const currentBoundary = turf.circle([center.lng, center.lat], radius);
		return currentBoundary
	}

	const getBoundary = (marker: any, setBoundary: any) => {
		const { id, boundaryType, geometryType, layer } = marker;
		const currentBoundary = 
			boundaryType === 'iso' ? 
			getIsochrone(marker) : 
			getCircle(marker);

		const geojson = getGeojson(mapRef.current, currentBoundary, geometryType, layer);
		updateMarkers(id, 'data', geojson);
		setBoundary(currentBoundary);
	};

	return (
		<MaskContext.Provider value={{
			onDragStart,
			onDrag,
			onDragEnd,
			getBoundary,
			activateTrash
		}}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";