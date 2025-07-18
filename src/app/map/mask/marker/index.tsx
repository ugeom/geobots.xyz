// React imports
import { useState, useEffect } from 'react';

// App imports
import { Icon } from './icon';
import { Tooltip } from './tooltip';
import { Cross } from './cross';

// Context imports
import { useMarkers } from 'context/markers';
import { useGeo } from 'context/geo';
import { useMask } from 'context/mask';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const CustomMarker = ({ marker, setBoundary }: any) => {
	const { mapRef } = useGeo();
	const { addPin, rejectMarker } = useMarkers();
	const { onDragStart, onDrag, onDragEnd, getBoundary, activateTrash } = useMask();

	const [ dragPosition, setDragPosition ] = useState<any>(null);

	const { id, name, center, image, radius, boundaryType, routingProfile, contoursMinutes, activeTrash } = marker;
	const map = mapRef?.current?.getMap();

	const updateBoundary = () => {
		getBoundary(marker, setBoundary);
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
	}, [ map, boundaryType, center, radius, contoursMinutes, routingProfile ]);

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
				<Icon 
					name={name} 
					image={image}
					activePointer={addPin}
					onClick={(e: any) => activateTrash(e, id, activeTrash)}
				/>
				{activeTrash && <Cross onClick={(e: any) => rejectMarker(e, id)}/>}
				{activeTrash && <Tooltip marker={marker}/>}
			</Marker>}
		</>
	)
};

CustomMarker.displayName = "CustomMarker";