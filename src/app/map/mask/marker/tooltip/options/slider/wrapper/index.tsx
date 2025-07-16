// React imports
import { useCallback } from 'react';

// Context imports
import { useMarkers } from 'context/markers';

// Third-party imports
import * as d3 from 'd3';

export const Wrapper = ({ 
    markerId, markerProperty,
    xScale, minBound, maxBound,
    innerWidth, innerHeight, 
    setHandlerPosition
    
}: any) => {
    const { updateMarkers } = useMarkers();

    const onDrag = (event: any) => {
        const x = xScale.invert(event.x);
        const boundedX = 
            x < minBound ? minBound : 
            x > maxBound ? maxBound :  
            x;
        const roundedX = 
            maxBound <= 1 ? 
            Math.round(boundedX * 10) / 10 : 
            Math.round(boundedX);

        setHandlerPosition(roundedX);
    };

    const onDragEnd = (event: any) => {
        const x = xScale.invert(event.x);
        const boundedX = 
            x < minBound ? minBound : 
            x > maxBound ? maxBound :  
            x;

        const roundedX = 
            maxBound <= 1 ? 
            Math.round(boundedX * 10) / 10 : 
            Math.round(boundedX);

        updateMarkers(markerId, markerProperty, roundedX);
    };

    const sliderRef = useCallback((node: any) => {
        const drag = d3.drag()
            .on('start', onDrag)
            .on('drag', onDrag)
            .on('end', onDragEnd);
        d3.select(node).call(drag);
    }, []);

	return (
        <rect
            ref={sliderRef}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
        />
	)
}

Wrapper.displayName="Wrapper"