import { Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';

export const TaskPriorities = () => {
	const { tasks } = React.useContext(ChartsContext);

	const stats = React.useMemo(() => {
		const data = { low: 0, medium: 0, high: 0 };

		for (const task of tasks) {
			const priority = task.priority;

			data[priority] += 1;
		}

		return data;
	}, [tasks]);

	return (
		<article className={s.chart}>
			<h2 className={s.title}>Task priorities</h2>
			<Divider />
			<PieChart
				colors={['green', 'orange', 'red']}
				series={[
					{
						data: [
							{ value: stats.low, label: 'Low' },
							{ value: stats.medium, label: 'Medium' },
							{ value: stats.high, label: 'High' },
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
				width={400}
				height={250}
			/>
		</article>
	);
};
