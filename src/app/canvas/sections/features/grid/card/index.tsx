// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import { Charts } from './charts';
import { Footer } from './footer';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Card = ({ marker }: any) => {
	const { providers } = useMarkers();

	const [ activeCharts, setActiveCharts ] = useState(true);
	
	const { id, name, data } = marker;

	const providerData = providers.find((item: any) => item.name === name);
	const { type: currentType, provider, columnName, graphicType } = providerData;

	const isLine = currentType === "LineString";
	const isPoint = currentType === 'Point';
	
	const currentColor = 
		isLine ?  'line-color' : 
		isPoint ? 'circle-color' :
		'fill-color';

	return (
		<div key={id} className="agent-card">
		  	<Header 
		  		marker={marker} 
		  		activeCharts={activeCharts} 
		  		setActiveCharts={setActiveCharts}
		  	/>
			{activeCharts && 
				<Charts 
					data={data} 
					name={columnName} 
					colorLabel={currentColor} 
					graphicType={graphicType}
				/>
			}
			{activeCharts && <Footer provider={provider}/>}
		</div>
	)
}

Card.displayName="Card";