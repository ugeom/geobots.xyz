// App imports
import { basemapsArray } from './data';
import './styles.scss'

// Context imports
import { useGeo } from 'context/geo';

export const Grid = () => {
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
				    	<div>{name}</div>
				    </div>
				  );
			  })}
		</div>
	)
}

Grid.displayName="Grid";