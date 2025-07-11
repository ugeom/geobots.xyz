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
	}
];