import { Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';
import { pies } from '@/components/dashboard-charts/charts.sizes';

export const TaskSession = () => {
	const { timerSession, timerSettings } = React.useContext(ChartsContext);

	return (
		<article className={s.chart}>
			<h2 className={s.title}>Timer intervals comprasion</h2>
			<Divider />
			<PieChart
				colors={['rgb(101, 91, 255)', 'rgb(154, 147, 255)']}
				series={[
					{
						data: [
							{ id: 0, value: timerSession.totalSeconds, label: 'Completed' },
							{
								id: 1,
								value:
									timerSettings.intervalsCount * 3600 -
									timerSession.totalSeconds,
								label: 'Rest',
							},
						],
						arcLabel: 'formattedValue',
						valueFormatter: ({ value }) => `Q (${value})`,
						highlightScope: { faded: 'series', highlighted: 'item' },
						faded: { innerRadius: 30, additionalRadius: -5, color: 'gray' },
						innerRadius: 30,
						outerRadius: 100,
						paddingAngle: 5,
						cornerRadius: 5,
						startAngle: -90,
					},
				]}
				width={pies.width}
				height={pies.height}
			/>
		</article>
	);
};
