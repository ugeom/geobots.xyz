// App imports
import { SVGWrapper } from './svg';
import { Circle } from './circle';

// Context imports
import { useGaugeSizes } from 'context/sizes/gauge';

// Third party imports
import * as d3 from "d3";

export const Gauge = ({ distribution, colors, sumOfValues }: any) => {
	const { innerWidth, innerHeight } = useGaugeSizes();
	const radius = d3.min([innerWidth, innerHeight]) / 2;
	const strokeWidth = radius * 0.3;
	const innerRadius = radius - ( strokeWidth / 2 );
	const circumference = innerRadius * 2 * Math.PI;

	let totalCircumference = 0;

	return (
		<SVGWrapper>
			{Object.entries(distribution).map(([key, value]: any) => {
				const currentPercent = value / sumOfValues;
				const currentCircumference = Math.round(circumference * currentPercent);

				if (currentCircumference) {totalCircumference += currentCircumference}

				return (
					<g key={key}>
						{currentCircumference && 
							<Circle
								cx={innerWidth / 2}
								cy={innerHeight / 2}
								innerRadius={innerRadius}
								strokeWidth={strokeWidth}
								currentCircumference={currentCircumference}
								circumference={circumference}
								totalCircumference={totalCircumference}
								stroke={colors[key]}
							/>
						 }
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Gauge.displayName="Gauge";