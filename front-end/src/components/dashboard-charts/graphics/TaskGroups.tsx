import { Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import clsx from 'clsx';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';
import { graphics } from '@/components/dashboard-charts/charts.sizes';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { TTaskGroupId } from '@/types/task.types';

export const TaskGroups = () => {
  const { tasks } = React.useContext(ChartsContext);

  const stats: Record<TTaskGroupId, number> = React.useMemo(() => {
    const data: Record<TTaskGroupId, number> = {
      completed: 0,
      noDate: 0,
      overdue: 0,
      today: 0,
      tomorrow: 0,
      theseTwoWeeks: 0,
      later: 0,
    };

    for (const task of tasks) {
      const groupId = getTaskGroupId(task);

      data[groupId] += 1;
    }

    return data;
  }, [tasks]);

  return (
    <article className={clsx(s.chart, 'col-span-2')}>
      <h2 className={s.title}>Task groups</h2>
      <Divider />
      <BarChart
        dataset={[
          { label: 'Overdue', data: stats.overdue },
          { label: 'No date', data: stats.noDate },
          { label: 'Today', data: stats.today },
          { label: 'Tomorrow', data: stats.tomorrow },
          {
            label: 'Two weeks',
            data: stats.theseTwoWeeks,
          },
          { label: 'Later', data: stats.later },
          { label: 'Completed', data: stats.completed },
        ]}
        yAxis={[
          {
            scaleType: 'linear',
            dataKey: 'data',
            label: 'Quantity',
            tickMinStep: 1,
            max: Math.max(...Object.values(stats)) + 1,
          },
        ]}
        xAxis={[
          {
            label: 'Group name',
            scaleType: 'band',
            dataKey: 'label',
          },
        ]}
        series={[
          {
            dataKey: 'data',
            color: 'rgb(var(--primary))',
            valueFormatter: (item) => `Q (${item})`,
          },
        ]}
        width={graphics.width}
        height={graphics.height}
      />
    </article>
  );
};
