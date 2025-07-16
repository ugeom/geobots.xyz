// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const SectionItem = ({ name, marker }: any) => {
	const { updateMarkers } = useMarkers();

	const { boundaryType, id } = marker;

	const isActiveColor = (name: any) => 
		boundaryType === name ? 
		"rgba(52, 152, 219, 0.3)" : 
		"rgba(255, 255, 255, 0)";

	const onClick = (boundaryType: any) => {
		updateMarkers(id, "boundaryType", boundaryType);
	}

	const backgroundColor = isActiveColor(name);

	return (
		<div className="section-item" style={{backgroundColor}}>
			<img 
				src={process.env.PUBLIC_URL + `/static/icons/${name}.svg`} 
				alt={name}
				className="boundary-icon"
				onClick={() => onClick(name)}
			/>
		</div>
	)
}