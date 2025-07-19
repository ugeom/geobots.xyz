// App imports
import { Slider } from './slider';
import { Mobility } from './mobility';
import './styles.scss';

export const Options = ({ marker }: any) => {
	const { id, radius, contoursMinutes, boundaryType } = marker;
	
	return (
		<div className="options-wrapper">
		  {boundaryType === "circle" && 
  				<Slider 
  					markerId={id} 
  					markerProperty='radius'
  					minBound={0} 
  					maxBound={1}
  					title={"Kilometers"}
  					initialState={radius}
  				/>
  			}
  			{boundaryType === "iso" && 
	  			<>
	  				<Mobility markerId={id}/>
	  				<Slider 
	  					markerId={id}
	  					markerProperty={"contoursMinutes"} 
	  					minBound={5} 
	  					maxBound={15} 
	  					title={"Minutes"}
	  					initialState={contoursMinutes}
	  				/>
	  			</>
	  		}
		</div>
	)
}

Options.displayName="Options";