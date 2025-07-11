// App imports
import { Agents } from './agents';
import { Features } from './features';
import { Basemaps } from './basemaps';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Sections = () => {
	const { activePage } = useMarkers();

	if (!activePage) return null;

	return (
		<div className="sections">
			{activePage === "agent" && <Agents/>}
			{activePage === "features" && <Features/>}
			{activePage === "basemaps" && <Basemaps/>}
		</div>
	)
}

Sections.displayName="Sections";