// App imports
import { Grid } from './grid';
import './styles.scss';

export const Features = () => {
  return (
    <div className="agent-selection">
      <h2>Visible Features</h2>
      <p className="instructions">
        Custom Data Visualizations
      </p>
      <Grid/>
    </div>
  );
};

Features.displayName = 'Features';