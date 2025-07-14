// App imports
import { basemapsArray } from './data';
import './styles.scss'

// Context imports
import { useGeo } from 'context/geo';

export const Basemaps = () => {
	const { setMapStyle } = useGeo();

	return (
		<div className="agent-grid">
			{basemapsArray.map((item, index) => {
			  	const [[name, { img, url }]] = Object.entries(item);
			  	const imageUrl = process.env.PUBLIC_URL + `/static/basemaps/${img}.png`;
			  	return (
			  		<div key={index}>
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
	)
}

Basemaps.displayName="Basemaps";