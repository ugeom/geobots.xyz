export const providers = [
	{
		name: "streets",
		label: 'Streets', 
		provider: "mapbox", 
		source: 'composite',
		layer: 'road', 
		columnName: "type", 
		geometryType: "LineString", 
		graphicType: "dots"
	},
	{
		name: "buildings",
		label: 'Buildings', 
		provider: "mapbox", 
		layer: 'building', 
		columnName: "subtype", 
		geometryType: "Polygon", 
		graphicType: "dots"
	},
];