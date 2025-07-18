// React imports
import { useCallback, Children, cloneElement } from 'react';

// Context imports
import { useGaugeSizes } from 'context/sizes/gauge';

export const SVGWrapper = ({ children }: any) => {
	const { width, height, setWidth, setHeight, margin } = useGaugeSizes();

	const parentRef = useCallback((node: any) => {
		if (node) {
			setWidth(node.getBoundingClientRect().width);
			setHeight(node.getBoundingClientRect().height);
		}
	}, []);

	return (
		<div ref={parentRef} style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
			{width &&
				<svg viewBox={`0 0 ${width} ${height}`}>
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{
				          Children.map(children, (child, index) => {
				            return cloneElement(child, {width: "100%"});
				          })
				        }
			        </g>
			</svg>}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";