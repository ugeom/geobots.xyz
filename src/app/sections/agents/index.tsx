// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Agents = ({ imageUrls }: any) => {
	const { activateMarker, providers } = useMarkers();
	const baseUrl = process.env.PUBLIC_URL + '/static/agents/';

	return (
		<div className="agent-grid">
		  {providers.map((provider: any) => {
		  	const name = provider.name;
		  	const imageUrl = baseUrl + name + '.svg';
		  	const processedName = name.replace("_", " ");

		  	return (
			  <div 
			  	key={name}
			  	className="agent-grid-card"
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