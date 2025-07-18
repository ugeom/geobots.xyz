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