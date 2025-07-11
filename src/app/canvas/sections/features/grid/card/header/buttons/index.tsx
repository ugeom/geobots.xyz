// App imports
import { Arrow } from './arrow';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Buttons = ({ marker, activeCharts, setActiveCharts }: any) => {
	const { rejectMarker } = useMarkers();
	
	const deleteAgent = (e: any) => rejectMarker(e, marker.id);
	
	return (
		<div className="header-buttons">
			<Arrow activeCharts={activeCharts} setActiveCharts={setActiveCharts}/>
			<div className="close-btn" onClick={deleteAgent}>✖</div>
		</div>
	)
}

Buttons.displayName="Buttons";