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

	const sections = [
	    {
	      id: 'agent',
	      title: 'Select Your Agent',
	      subtitle: 'Choose an agent from the options to explore the data they represent.',
	      Component: Agents,
	    },
	    {
	      id: 'basemaps',
	      title: 'Select Your Basemap',
	      subtitle: 'Choose a basemap from the options below.',
	      Component: Basemaps,
	    },
	    {
	      id: 'features',
	      title: 'Visible Features',
	      subtitle: 'Custom Data Visualizations',
	      Component: Features,
	    },
	  ];

	const section = sections.find((s) => s.id === activePage);
	if (!section) return null;

	const { title, subtitle, Component } = section;

	return (
		<div className="sections">
	      <div className="section-grid">
	        <h2>{title}</h2>
	        <p className="section-items">{subtitle}</p>
	        <Component/>
	      </div>
	    </div>
	)
}

Sections.displayName="Sections";