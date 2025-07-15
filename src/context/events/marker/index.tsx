// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useMarkers } from 'context/markers';
import { useLayers } from 'context/layers';
import { useMapboxIsochroneApi } from 'context/api/mapbox/isochrone';

// Third-party imports
import * as turf from '@turf/turf';

const MarkerEventsContext: React.Context<any> = createContext(null);

export const useMarkerEvents = () => useContext(MarkerEventsContext)

export const MarkerEventsProvider = ({ children }: any) => {
	const { updateMarkers } = useMarkers();
	const { getGeojson } = useLayers();
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
		!dragging && updateMarkers(id, 'activeTrash', activeTrash ? false : true);
	};

	const getBoundary = async (marker: any, setBoundary: any) => {
		const { id, radius, boundaryType, center, layer, geometryType } = marker;
		
		if (boundaryType === 'iso') {
			const data = await fetchIsochrone(marker);
			const currentBoundary = data.features[0];
			updateMarkers(id, 'data', getGeojson(currentBoundary, geometryType, layer));
			setBoundary(currentBoundary);
		} else if (center) {
			const circle = turf.circle([center.lng, center.lat], radius);
			const geojson = getGeojson(circle, geometryType, layer);
			updateMarkers(id, 'data', geojson);
			setBoundary(circle);
		}
	};

	return (
		<MarkerEventsContext.Provider value={{
			onDragStart,
			onDrag,
			onDragEnd,
			getBoundary,
			activateTrash
		}}>
			{children}
		</MarkerEventsContext.Provider>
	)
}

MarkerEventsContext.displayName = "MarkerEventsContext";