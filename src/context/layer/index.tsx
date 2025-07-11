// React imports
import { useContext, createContext } from 'react';

// App imports
import { fillProperties, filterGeometries, filterLines } from './helpers';

// Context imports
import { useGeo } from 'context/geo';

const LayerContext: React.Context<any> = createContext(null);

export const useLayer = () => useContext(LayerContext)

export const LayerProvider = ({ children }: any) => {
	const { mapRef } = useGeo();

	const getLayersBySource = (sourceLayer: string) => {
		return mapRef.current.getStyle()
			.layers
			.filter((layer: any) => layer['source-layer'] === sourceLayer)
			.map((layer: any) => layer.id);
	}

	const getFeaturesBySource = (currentSource: any) => {
		const layers = getLayersBySource(currentSource);
		const currentFeatures = mapRef.current.queryRenderedFeatures({ layers });
		return currentFeatures;
	}

	const getGeojson = (boundary: any, geometryType: string, source: any) => {
		const fillProperty = fillProperties[geometryType] || 'fill-color';
		const isLine = geometryType === 'LineString' || geometryType === 'MultiLineString';

		const currentFeatures = getFeaturesBySource(source);

		if (!isLine) {
			const geomFeatures = filterGeometries(currentFeatures, boundary);
			return { type: 'FeatureCollection', features: geomFeatures }
		}

		const lineFeatures: any = filterLines(currentFeatures, boundary, fillProperty);
		const features = lineFeatures.filter((item: any) => Object.keys(item.properties).length !== 0);
		return { type: 'FeatureCollection', features };
	};

	return (
		<LayerContext.Provider value={{ getGeojson }}>
			{children}
		</LayerContext.Provider>
	)
}

LayerContext.displayName = "LayerContext";