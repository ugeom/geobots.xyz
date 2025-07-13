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

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';

export const CustomMarker = ({ marker, setBoundary }: any) => {
	const { fetchIsochrone } = useMapboxIsochroneApi();
	const { getGeojson } = useLayer();
	const { updateMarkers, rejectMarker } = useMarkers();
	const { id, center, image, radius, name, boundaryType, geometryType, layer } = marker; 
	const { lng, lat } = center;

	const [ activeTrash, setActiveTrash ] = useState(false);
	const [ dragging, setDragging ] = useState(false);
	const [ dragPosition, setDragPosition ] = useState<any>(null);

	const onDragStart = (e: any) =>  {
		setDragging(true);
		setActiveTrash(false);
	};
	
	const onDrag = (e: any) => {
		setDragPosition(e.lngLat);
		if (boundaryType !== "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const onDragEnd = (e: any) => {
		setDragPosition(null);
		setTimeout(() => setDragging(false), 0);
		if (boundaryType === "iso") {
			updateMarkers(id, "center", e.lngLat);
		}
	};

	const activateTrash = (e: any) => {
		e.stopPropagation();
		!dragging && setActiveTrash((prev: boolean) => !prev);
	}

	useEffect(() => {
	    const fetchBoundary = async (marker: any) => {
	      if (boundaryType === 'iso') {
	        const data = await fetchIsochrone(marker);
	        const currentBoundary = data.features[0]
	        setBoundary(currentBoundary);
	        updateMarkers(id, 'data', getGeojson(currentBoundary, geometryType, layer));
	      } 
	      else {
	        const circle = turf.circle([ lng, lat ], radius);
	        setBoundary(circle);
	        const geojson = getGeojson(circle, geometryType, layer);
	        updateMarkers(id, 'data', geojson);
	      }
	    };
	    fetchBoundary(marker);
	  }, [ marker ]);

	return (
		<Marker
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
		</Marker>
	)
};

CustomMarker.displayName = "CustomMarker";