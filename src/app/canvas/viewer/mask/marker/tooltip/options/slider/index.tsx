// React imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Background } from './background';
import { Foreground } from './foreground';
import { Handler } from './handler';
import { Wrapper } from './wrapper';
import { Markers } from './markers';
import './styles.scss';

// Context imports
import { useRadiusSizes } from 'context/sizes/radius';

// Third-party imports
import * as d3 from 'd3';

export const Slider = ({ markerId, minBound, maxBound, markerProperty, title, initialState }: any) => {
  const [ handlerPosition, setHandlerPosition ] = useState(initialState);

  const { innerWidth, innerHeight } = useRadiusSizes();
  
  const circleHeight = 10;
  const offset = 10;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
    <div className="slider-wrapper">
      <SVGWrapper>
        <Background
          xScale={xScale} 
          minBound={minBound} 
          maxBound={maxBound} 
          circleHeight={circleHeight}
          innerHeight={innerHeight}
        />
        <Foreground
          xScale={xScale} 
          minBound={minBound}
          handlerPosition={handlerPosition} 
          circleHeight={circleHeight}
          innerHeight={innerHeight}
        />
        <Markers
          xScale={xScale} 
          cx={xScale(handlerPosition)} 
          cy={innerHeight / 2} 
          r={circleHeight / 2}
          minBound={minBound}
          maxBound={maxBound}
        />
        <Handler
          cx={xScale(handlerPosition)} 
          cy={innerHeight / 2} 
          r={circleHeight}
        />
        <Wrapper
          handlerPosition={handlerPosition}
          xScale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setHandlerPosition={setHandlerPosition}
          minBound={minBound}
          maxBound={maxBound}
          markerId={markerId}
          markerProperty={markerProperty}
        />
      </SVGWrapper>
      <div className="options-title">
        <div>{title}</div>
        <div>{handlerPosition}</div>
      </div>
    </div>
  )
}

Slider.displayName="Slider";