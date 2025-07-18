export const getPointsLayer = (id: any, source: any) => {
  return ({
    id,
    type: "circle",
    source,
    paint: {
      'circle-radius': 3,
      'circle-color': ['get', 'circle-color']
    }
  })
}