export const getStrokeLayer = (id: any, source: any) => {
  return {
    id,
    type: 'line',
    source,
    paint: {
      'line-width': 4,
      'line-color': "rgba(166, 204, 245, 1)",
      'line-opacity': 0.8,
      'line-dasharray': [2, 2],
    }
  };
};

export const getEraserLayer = (id: any, source: any) => {
  return {
    id,
    type: 'clip',
    source,
    layout: {'clip-layer-types': ['model']},
    minzoom: 14
  };
};