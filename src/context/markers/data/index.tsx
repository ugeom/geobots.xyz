export const providers = [
	{
		name: "streets",
		provider: "mapbox", 
		source: 'composite',
		layer: 'road', 
		columnName: "type", 
		geometryType: "LineString", 
	},
	{
		name: "buildings",
		provider: "mapbox", 
		source: 'composite',
		layer: 'building', 
		columnName: "type", 
		geometryType: "Polygon", 
	},
];