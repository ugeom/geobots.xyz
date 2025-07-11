// React imports
import { useState } from 'react';

// App imports
import { Icon } from './icon';
import { Tooltip } from './tooltip';
import { Trash } from './trash';

// Context imports
import { useMarkers } from 'context/markers';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const CustomMarker = ({ marker }: any) => {
	const { updateMarkers, rejectMarker } = useMarkers();
	const { id, center, image, name, geometryType } = marker;

	const [ activeTrash, setActiveTrash ] = useState(false);
	const [ dragging, setDragging ] = useState(false);
	const [ dragPosition, setDragPosition ] = useState<any>(null);

	const onDragStart = (e: any) =>  {
		setDragging(true);
		setActiveTrash(false);
	};
	
	const onDrag = (e: any) => {
		setDragPosition(e.lngLat);
		if (geometryType !== "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const onDragEnd = (e: any) => {
		setDragPosition(null);
		setTimeout(() => setDragging(false), 0);
		if (geometryType === "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const onClick = (e: any) => {
		e.stopPropagation();
		!dragging && setActiveTrash((prev: boolean) => !prev);
	}

	return (
		<Marker
			key={id}
			longitude={dragPosition?.lng ?? center.lng}
			latitude={dragPosition?.lat ?? center.lat}
			anchor="bottom"
			draggable
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
		>
			<Icon name={name} image={image} onClick={onClick}/>
			{activeTrash && 
				<>
					<Trash onClick={(e: any) => rejectMarker(e, id)} />
					<Tooltip marker={marker} />
				</>
			}
		</Marker>
	)
};

CustomMarker.displayName = "CustomMarker";