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
			  return (
			    <div key={index}>
			    	<img 
			    		className="thumbnail"
			    		src={process.env.PUBLIC_URL + `/static/basemaps/${img}.png`} 
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