// Third-party imports
import * as turf from '@turf/turf';

const colorPalette = [
  'rgba(216, 131, 255, 0.6)',
  'rgba(247, 121, 118, 0.6)',
  'rgba(250, 189, 74, 0.6)',
  'rgba(255, 232, 8, 0.6)',
  'rgba(82, 227, 225, 0.6)',
  'rgba(123, 210, 223, 0.6)',
  'rgba(2, 194, 178, 0.6)',
  'rgba(255, 152, 0, 0.6)',
  'rgba(155, 48, 255, 0.6)',
  'rgba(34, 255, 102, 0.6)'
];

const hashStringToNumber = (str: string): number => {
  const safeStr: any = String(str ?? "");
  return safeStr.split("").reduce((acc: any, c: any) => acc + c.charCodeAt(0), 0);
}

const getFeatureColor = (feature: string, palette: string[]): string => {
  const hash = hashStringToNumber(feature);
  return palette[hash % palette.length];
};

const extractLineFeatures = (geometry: any, properties: any) => {
  if (geometry.type === 'LineString') {
    return [{ type: 'Feature', geometry, properties }];
  }
  if (geometry.type === 'MultiLineString') {
    return geometry.coordinates.map((coordinates: any) => ({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates },
      properties,
    }));
  }
  return [];
};

const getFeaturesWithinBoundary = (features: any[], boundary: any) => {
  return features.flatMap((feature) => {
    if (turf.booleanWithin(feature, boundary)) return [feature];

    if (turf.booleanIntersects(feature, boundary)) {
      const split = turf.lineSplit(feature, boundary);
      return split.features
        .filter((f) => turf.booleanWithin(f, boundary))
        .map((f) => ({ ...f, properties: feature.properties }));
    }
    return [];
  });
};

const addColorToFeature = (geometry: any, properties: any, fillProperty: any) => {
  const color = getFeatureColor(properties.type, colorPalette);
  return { type: 'Feature', geometry, properties: { ...properties, [fillProperty]: color } };
};

export const filterLines = (mapFeatures: any[], boundary: any, fillProperty: string) => {
  if (!mapFeatures) return [];

  return mapFeatures.flatMap(({ geometry, layer, properties }: any) => {
    const enrichedFeature = addColorToFeature(geometry, properties, fillProperty);
    const lineFeatures = extractLineFeatures(enrichedFeature.geometry, enrichedFeature.properties);
    return getFeaturesWithinBoundary(lineFeatures, boundary);
  });
};

export const filterGeometries = (features: any[], boundary: any) =>
  features.filter(({ geometry }) =>
    turf.booleanPointInPolygon(turf.centroid(geometry), boundary)
  );

export const toFeatureCollection = (originalFeatures: any[], fillProperty: string): any => {
  const features = originalFeatures.map(({ geometry, properties }: any) =>
    addColorToFeature(geometry, properties, fillProperty)
  );
  return { type: 'FeatureCollection', features };
};

const fillProperties: any = {
  Point: 'circle-color',
  Polygon: 'fill-color',
  LineString: 'line-color',
};

const getLayersIdsBySourceLayer = (currentMap: any, sourceLayer: string) => {
  return currentMap.getStyle()
    .layers
    .filter((layer: any) => layer['source-layer'] === sourceLayer)
    .map((layer: any) => layer.id);
};

const getFeaturesBySource = (currentMap: any, currentSource: any) => {
  const layers = getLayersIdsBySourceLayer(currentMap, currentSource);
  const currentFeatures = currentMap.queryRenderedFeatures({ layers });
  return currentFeatures;
};

export const getGeojson = (currentMap: any, boundary: any, geometryType: string, source: any) => {
  const fillProperty = fillProperties[geometryType] || 'fill-color';
  const isLine = geometryType === 'LineString' || geometryType === 'MultiLineString';

  const currentFeatures = getFeaturesBySource(currentMap, source);

  if (!isLine) {
    const geomFeatures = filterGeometries(currentFeatures, boundary);
    return toFeatureCollection(geomFeatures, fillProperty);
  }
  const features: any = filterLines(currentFeatures, boundary, fillProperty);
  return { type: 'FeatureCollection', features };
};