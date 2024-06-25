import { Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { TTaskGroupId } from '@/types/task.types';

export const TaskCompleted = () => {
	const { tasks } = React.useContext(ChartsContext);

	const stats = React.useMemo(() => {
		const data: Partial<Record<TTaskGroupId, number>> = {
			overdue: 0,
			completed: 0,
		};

		for (const task of tasks) {
			const groupId = getTaskGroupId(task);

			data[groupId]! += 1;
		}

		return data;
	}, [tasks]);

	return (
		<article className={s.chart}>
			<h2 className={s.title}>Overdue / Completed tasks coersion</h2>
			<Divider />
			<PieChart
				colors={['red', 'green']}
				series={[
					{
						data: [
							{ id: 0, value: stats.overdue!, label: 'Overdue' },
							{ id: 1, value: stats.completed!, label: 'Completed' },
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
