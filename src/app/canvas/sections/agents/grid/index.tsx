// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Grid = ({ imageUrls }: any) => {
	const { activateMarker, providers } = useMarkers();
	const baseUrl = process.env.PUBLIC_URL + '/static/agents/';

	return (
		<div className="agent-grid">
		  {providers.map((item: any) => {
		  	const { name } = item;
		  	const imageUrl = baseUrl + name + '.svg';
		  	const processedName = name.replace("_", " ");

		  	return (
			  <div 
			  	key={name}
			  	className="agent-grid-card"
			  	onClick={() => activateMarker(imageUrl, name)} 
			  >
			    <img src={imageUrl} alt={name}/>
			    <span>{processedName}</span>
			  </div>
		  )})}
		</div>
	)
}

Grid.displayName="Grid";