// App imports
import { Grid } from './grid';
import './styles.scss';

export const Agents = () => {
	return (
		<div className="agent-selection">
		  <h2>Select Your Agent</h2>
		  <p className="instructions">
		  	Choose an agent from the options 
		  	to explore the data they represent.
		  </p>
		  <Grid/>
		</div>
	);
};

Agents.displayName="Agents";