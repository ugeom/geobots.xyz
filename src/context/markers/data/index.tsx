export const providers = [
	{
		name: "streets",
		label: 'Streets', 
		provider: "mapbox", 
		source: 'composite',
		layer: 'road', 
		type: "LineString", 
		columnName: "type", 
		graphicType: "dots"
	},
	{
		name: "buildings",
		label: 'Buildings', 
		provider: "mapbox", 
		layer: 'building', 
		type: "Polygon", 
		columnName: "subtype", 
		graphicType: "dots"
	},
];