import { Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {
	differenceInMilliseconds,
	format,
	isBefore,
	startOfToday,
} from 'date-fns';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';

export const TaskDays = () => {
	const { tasks } = React.useContext(ChartsContext);

	const stats = React.useMemo(() => {
		const quantities: Record<string, number> = {};

		for (const task of tasks) {
			if (
				!task.dueDate ||
				task.isCompleted ||
				isBefore(task.dueDate, startOfToday())
			)
				continue;

			const date = format(task.dueDate, 'MMM/dd');

			date in quantities ? (quantities[date] += 1) : (quantities[date] = 1);
		}

		const data = [];
		for (const [date, quantity] of Object.entries(quantities)) {
			data.push({ date, quantity });
		}

		const sortedData = data.toSorted((a, b) =>
			differenceInMilliseconds(a.date, b.date),
		);

		return sortedData;
	}, [tasks]);

	return (
		<article className={s.chart}>
			<h2 className={s.title}>Planned tasks</h2>
			<Divider />
			<LineChart
				
				dataset={stats}
				series={[
					{
						dataKey: 'quantity',
						// color: 'rgb(var(--primary))',
						// valueFormatter: (item) => `Q (${item})`,
					},
				]}
				yAxis={[
					{
						label: 'Quantity',
						scaleType: 'linear',
						dataKey: 'quantity',
						tickMinStep: 1,
					},
				]}
				xAxis={[
					{
						label: 'Date',
						scaleType: 'band',
						dataKey: 'date',
					},
				]}
				width={500}
				height={250}
			/>
		</article>
	);
};
