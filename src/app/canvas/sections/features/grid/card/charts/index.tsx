// App imports
import { useState } from 'react';

// App imports
import { Gauge } from './gauge';
import { Dots } from './dots';
import { Bars } from './bars';
import { processData } from './data';
import './styles.scss';

// Third-party imports
import * as d3 from 'd3';

export const Charts = ({ data, name, colorLabel }: any) => {
	const [ graphictTypeIndex, setGraphicTypeIndex ] = useState(0);

	const { distribution, colors } = processData(data, name, colorLabel);
	const sumOfValues = d3.sum(Object.values(distribution));

	const graphicTypeArray = ["dots", "gauge"];
	const graphicType = graphicTypeArray[graphictTypeIndex];

	const onClick = () => {
		setGraphicTypeIndex((prev: any) => {
			if (prev < 1) {
				return prev + 1
			}
			else {
				return 0
			}
		})
	}
	return (
			<div className="chart-wrapper" onClick={onClick}>
				<Bars distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>
				{graphicType === "gauge" && <Gauge distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>}
				{graphicType === "dots" && <Dots distribution={distribution} colors={colors} sumOfValues={sumOfValues}/>}
			</div>
	)
}

Charts.displayName="Charts";