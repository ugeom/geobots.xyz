// React imports
import { useState, useEffect } from 'react';

// App imports
import { Icon } from './icon';
import { Tooltip } from './tooltip';
import { Trash } from './trash';

// Context imports
import { useMarkers } from 'context/markers';
import { useMapboxIsochroneApi } from 'context/api/mapbox/isochrone';
import { useLayer } from 'context/layer';
import { useGeo } from 'context/geo';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';

export const CustomMarker = ({ marker, setBoundary }: any) => {
	const { fetchIsochrone } = useMapboxIsochroneApi();
	const { mapRef } = useGeo();
	const { getGeojson } = useLayer();
	const { updateMarkers, rejectMarker } = useMarkers();

	const { id, name, center, image, radius, boundaryType, geometryType, layer } = marker; 

	const [ activeTrash, setActiveTrash ] = useState(false);
	const [ dragging, setDragging ] = useState(false);
	const [ dragPosition, setDragPosition ] = useState<any>(null);

	const map = mapRef?.current?.getMap();

	const onDragStart = (e: any) =>  {
		setDragging(true);
		setActiveTrash(false);
	};
	
	const onDrag = (e: any) => {
		setDragPosition(e.lngLat);
		if (boundaryType !== "iso") {
			updateMarkers(id, "boundaryType", "circle");
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const onDragEnd = (e: any) => {
		setDragPosition(null);
		setTimeout(() => setDragging(false), 0);
		if (boundaryType === "iso") {
			updateMarkers(id, "boundaryType", "iso");
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const activateTrash = (e: any) => {
		e.stopPropagation();
		!dragging && setActiveTrash((prev: boolean) => !prev);
	}

    const fetchBoundary = async () => {
		if (boundaryType === 'iso') {
			const data = await fetchIsochrone(marker);
			const currentBoundary = data.features[0];
			setBoundary(currentBoundary);
			updateMarkers(id, 'data', getGeojson(currentBoundary, geometryType, layer));
		} else if (center) {
			const circle = turf.circle([center.lng, center.lat], radius);
			setBoundary(circle);
			const geojson = getGeojson(circle, geometryType, layer);
			updateMarkers(id, 'data', geojson);
		}
	};

	const debounce = (func: any, delay: any) => {
		let timer: any;
		return (...args: any) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	const fetchBoundaryDebounced = debounce(fetchBoundary, 100);
	
	useEffect(() => {
		fetchBoundaryDebounced();
	}, [ marker ]);

	useEffect(() => {
		if (!map) return;

		const handler = () => {
			fetchBoundaryDebounced();
		};

		map.on('zoomend', handler);
		return () => {
			map.off('zoomend', handler);
		};
	}, [ map, boundaryType, center ]);

	return (
		<>
			{center && <Marker
				key={id}
				longitude={dragPosition?.lng ?? center.lng}
				latitude={dragPosition?.lat ?? center.lat}
				anchor="bottom"
				draggable
				onDrag={onDrag}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
			>
				<Icon name={name} image={image} onClick={activateTrash}/>
				{activeTrash && <Trash onClick={(e: any) => rejectMarker(e, id)}/>}
				{activeTrash && <Tooltip marker={marker} />}
			</Marker>}
		</>
	)
};

CustomMarker.displayName = "CustomMarker";