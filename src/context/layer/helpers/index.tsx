// App imports
import { roadColors } from '../styles';

// Third-party imports
import * as turf from '@turf/turf';

export const fillProperties: any = {
	Point: 'circle-color',
	Polygon: 'fill-color',
	LineString: 'line-color',
}

const getColor = (layerType: any, layerPaint: any, property: string) => {
  const resultPaint = Object.assign({}, layerPaint);
  resultPaint[property] = roadColors[layerType];
  return resultPaint;
};

const getLineFeatures = (geometry: any, properties: any) => {
  if (geometry.type === 'LineString') {
    return [{ type: 'Feature', geometry, properties }];
  } 
  else if (geometry.type === 'MultiLineString') {
    return geometry.coordinates.map((coordinates: any) => ({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates },
      properties,
    }));
  }
  return [];
};

const getLinesInside = (lineFeatures: any[], boundary: any) => {
  return lineFeatures.flatMap((line) => {
    if (turf.booleanWithin(line, boundary)) {
      return [ line ];
    }
    if (turf.booleanIntersects(line, boundary)) {
      const split = turf.lineSplit(line, boundary);
      return split.features
        .filter((feature) => turf.booleanWithin(feature, boundary))
        .map((feature) => {
          feature.properties = line.properties;
          return feature;
        });
    }
    return [];
  });
};

export const filterLines = (mapFeatures: any[], boundary: any, fillProperty: any) => {
  if (!mapFeatures?.length) return [];

  return mapFeatures.flatMap((item: any) => {
    const { geometry, layer, properties: itemProperties } = item;

    const color = getColor(itemProperties.type, layer.paint, fillProperty);
    const properties = { ...color, ...itemProperties };

    const lineFeatures = getLineFeatures(geometry, properties);
    const featuresInside = getLinesInside(lineFeatures, boundary);
    return featuresInside;
  });
};

export const filterGeometries = (features: any[], boundary: any) =>
  features.filter(({ geometry }) =>
    turf.booleanPointInPolygon(turf.centroid(geometry), boundary)
  );