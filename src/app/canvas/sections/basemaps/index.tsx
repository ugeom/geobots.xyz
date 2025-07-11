// App imports
import { Grid } from './grid';

export const Basemaps = () => {
	return (
		<div className="agent-selection">
			<h2>Select Your Basemap</h2>
			<p className="instructions">
				Choose an basemap from the options below.
			</p>
			<Grid/>
		</div>
	)
}

Basemaps.displayName="Basemaps"