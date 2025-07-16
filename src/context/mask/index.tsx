// React imports
import { useContext, createContext } from 'react';

// App imports
import { fillProperties, toFeatureCollection, filterGeometries, filterLines } from './helpers';

// Context imports
import { useGeo } from 'context/geo';

const MaskContext: React.Context<any> = createContext(null);

export const useMask = () => useContext(MaskContext)

export const MaskProvider = ({ children }: any) => {
	const { mapRef } = useGeo();

	const getLayersIdsBySourceLayer = (sourceLayer: string) => {
		return mapRef?.current?.getStyle()
			.layers
			.filter((layer: any) => layer['source-layer'] === sourceLayer)
			.map((layer: any) => layer.id);
	}

	const getFeaturesBySource = (currentSource: any) => {
		const layers = getLayersIdsBySourceLayer(currentSource);
		const currentFeatures = mapRef.current.queryRenderedFeatures({ layers });
		return currentFeatures;
	}

	const getGeojson = (boundary: any, geometryType: string, source: any) => {
		const fillProperty = fillProperties[geometryType] || 'fill-color';
		const isLine = geometryType === 'LineString' || geometryType === 'MultiLineString';

		const currentFeatures = getFeaturesBySource(source);

		if (!isLine) {
			const geomFeatures = filterGeometries(currentFeatures, boundary);
			return toFeatureCollection(geomFeatures, fillProperty);
		}
		const features: any = filterLines(currentFeatures, boundary, fillProperty);
		return { type: 'FeatureCollection', features };
	};

	return (
		<MaskContext.Provider value={{ getGeojson }}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";