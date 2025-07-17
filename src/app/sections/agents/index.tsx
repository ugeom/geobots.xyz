// App imports
import { providersArray } from './providers';

// Context imports
import { useMarkers } from 'context/markers';

export const Agents = ({ imageUrls }: any) => {
	const { activateMarker } = useMarkers();
	const baseUrl = process.env.PUBLIC_URL + '/static/agents/';

	return (
		<div className="cards">
		  {providersArray.map((provider: any) => {
		  	const { name } = provider;
		  	const imageUrl = baseUrl + `${name}.svg`;
		  	const processedName = name.replace("_", " ");

		  	return (
			  <div 
			  	key={name}
			  	className="card"
			  	onClick={() => activateMarker(imageUrl, provider)} 
			  >
			    <img src={imageUrl} alt={name}/>
			    <span>{processedName}</span>
			  </div>
		  )})}
		</div>
	)
}

Agents.displayName="Agents";