// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { useGeo } from 'context/geo';

const MapboxReverseApiContext: React.Context<any> = createContext(null)

export const useMapboxReverseApi = () => useContext(MapboxReverseApiContext);

export const MapboxReverseApiProvider = ({ children }: any) => {
	const { viewport } = useGeo();
	const [ mapboxReverseData, setMapboxReverseData ] = useState<any>(null);
	const [ placeInfo, setPlaceInfo ] = useState<string>("");

	const getCurrentAddress = async (lng: number, lat: number) => {
		const tempUrl = `
			https://api.mapbox.com/geocoding/v5/
			mapbox.places/
			${lng},${lat}.json
			?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
			&language=en
		`;
		const url = tempUrl.replace(/\s/g, '');
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Error fetching address:", error);
			return null;
		}
	};

	const extractCityCountry = (data: any) => {
		let city = "";
		let country = "";

		if (!data?.features?.length) {
			return { city, country };
		}

		const feature = data.features[0];

		if (feature.place_type.includes("place")) {
			city = feature.text;
		}
		if (feature.place_type.includes("country")) {
			country = feature.text;
		}

		feature.context?.forEach((ctx: any) => {
			if (ctx.id.startsWith("place.")) {
				city ||= ctx.text;
			}
			if (ctx.id.startsWith("country.")) {
				country ||= ctx.text;
			}
		});

		return { city, country };
	};

	useEffect(() => {
		const fetchData = async () => {
			const { longitude, latitude } = viewport;
			const data = await getCurrentAddress(longitude, latitude);
			if (data) {
				setMapboxReverseData(data);
				const { city, country } = extractCityCountry(data);

				let info = "";
				if (city) {
					info += city;
				}
				if (country) {
					info += info ? `, ${country}` : country;
				}

				setPlaceInfo(info);
			}
		};
		fetchData();
	}, [ viewport ]);

	return (
		<MapboxReverseApiContext.Provider
			value={{
				getCurrentAddress,
				mapboxReverseData,
				setMapboxReverseData,
				placeInfo
			}}
		>
			{children}
		</MapboxReverseApiContext.Provider>
	);
};

MapboxReverseApiContext.displayName = "MapboxReverseApiContext";