// App imports
import { basemaps } from 'context/data/basemaps';
import './styles.scss'

// Context imports
import { useGeo } from 'context/geo';

export const Basemaps = () => {
	const { setMapStyle } = useGeo();
	const baseUrl = process.env.PUBLIC_URL + '/static/basemaps/';

	return (
		<div className="cards-wrapper">
			<div className="cards">
				{basemaps.map((item, index) => {
				  	const [[name, { img, url }]] = Object.entries(item);
				  	const imageUrl = baseUrl + `${img}.png`;
				  	
				  	return (
				  		<div key={index} className="basemap-card">
					    	<img 
					    		className="thumbnail"
					    		src={imageUrl} 
					    		alt={`custom-${img}`}
					    		onClick={() => setMapStyle(url)}
					    	/>
					    	<span>{name}</span>
					    </div>
					  );
				  })}
			</div>
		</div>
	)
}

Basemaps.displayName="Basemaps";