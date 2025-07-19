export const getPointsLayer = (id: string, source: string) => {
  return ({
    id,
    source,
    type: "circle",
    paint: {
      'circle-radius': 3,
      'circle-color': ['get', 'circle-color']
    }
  })
}

export const getPolygonsLayer = (id: string, source: string) => {
  return ({
    id,
    source,
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": ["get", "fill-color"],
      'fill-extrusion-height': [
        'coalesce',
        ['get', 'height'],
        10
      ],
      'fill-extrusion-base': 0,
      "fill-extrusion-vertical-gradient": true,
      "fill-extrusion-opacity": 0.6,
    },
  })
}

export const getStrokeLayer = (id: any, source: any) => {
  return {
    id,
    type: 'line',
    source,
    paint: {
      'line-width': 2,
      'line-color': ['get', 'line-color'],
    }
  };
};