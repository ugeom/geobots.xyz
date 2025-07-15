// React imports
import { useState, useEffect } from 'react';

// App imports
import { Icon } from './icon';
import { Tooltip } from './tooltip';
import { Trash } from './trash';

// Context imports
import { useMarkers } from 'context/markers';
import { useGeo } from 'context/geo';
import { useMarkerEvents } from 'context/events/marker';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const CustomMarker = ({ marker, setBoundary }: any) => {
	const { mapRef } = useGeo();
	
	const { rejectMarker } = useMarkers();
	const { onDragStart, onDrag, onDragEnd, getCurrentBoundary, activateTrash } = useMarkerEvents();
	const { id, name, center, image, radius, boundaryType, routingProfile, contoursMinutes, activeTrash } = marker;

	const [ dragPosition, setDragPosition ] = useState<any>(null);

	const map = mapRef?.current?.getMap();

	const updateBoundary = () => {
		getCurrentBoundary(marker, setBoundary);
	}
	
	useEffect(() => {
		updateBoundary();
	}, [ boundaryType, center, radius, contoursMinutes, routingProfile ]);

	useEffect(() => {
		if (!map) return;
		map.on('zoomend', updateBoundary);
		return () => {
			map.off('zoomend', updateBoundary);
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
				onDrag={(e: any) => onDrag(e, id, boundaryType, setDragPosition)}
				onDragStart={(e: any) => onDragStart(e, id)}
				onDragEnd={(e: any) => onDragEnd(e, id, boundaryType, setDragPosition)}
			>
				<Icon name={name} image={image} onClick={(e: any) => activateTrash(e, id, activeTrash)}/>
				{activeTrash && <Trash onClick={(e: any) => rejectMarker(e, id)}/>}
				{activeTrash && <Tooltip marker={marker}/>}
			</Marker>}
		</>
	)
};

CustomMarker.displayName = "CustomMarker";