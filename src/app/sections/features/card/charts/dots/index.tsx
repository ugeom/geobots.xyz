// React imports
import { useMemo } from 'react';

// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useDotsSizes } from 'context/sizes/dots';

export const Dots = ({ distribution, colors, sumOfValues }: any) => {
    const { innerWidth, innerHeight } = useDotsSizes();

    const numOfColumns = 8;
    const numOfRows = 6;

    const dotWidth = innerWidth / numOfColumns;
    const dotHeight = innerHeight / numOfRows;

    const radius = Math.min(dotWidth, dotHeight) * 0.4;

    const dotsData = useMemo(() => {
        const positions: { cx: number; cy: number; color: string }[] = [];
        let currentRow = 0;
        let currentCol = 0;

        Object.entries(distribution).forEach(([item, value]: any) => {
            const count = Math.round((value / sumOfValues) * numOfColumns * numOfRows);

            Array.from({ length: count }).forEach(() => {
                const cx = currentCol * dotWidth + dotWidth / 2;
                const cy = currentRow * dotHeight + dotHeight / 2;
                positions.push({ cx, cy, color: colors[item] });

                currentCol++;
                if (currentCol >= numOfColumns) {
                    currentCol = 0;
                    currentRow++;
                }
            });
        });

        // Ensure the last row and column are filled
        if (currentRow < numOfRows || currentCol < numOfColumns) {
            const lastItem = Object.entries(distribution).slice(-1)[0];
            const lastColor = lastItem ? colors[lastItem[0]] : "";

            while (currentRow < numOfRows) {
                const cx = currentCol * dotWidth + dotWidth / 2;
                const cy = currentRow * dotHeight + dotHeight / 2;

                positions.push({ cx, cy, color: lastColor });

                currentCol++;
                if (currentCol >= numOfColumns) {
                    currentCol = 0;
                    currentRow++;
                }
            }
        }

        return positions;
    }, [ distribution, colors, sumOfValues, dotWidth, dotHeight, numOfColumns, numOfRows ]);

	return (
		<SVGWrapper>
			{dotsData.map(({ cx, cy, color }: any, index: any) => (
                <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill={color}
                />
            ))}
		</SVGWrapper>
	)
}

Dots.displayName="Dots";