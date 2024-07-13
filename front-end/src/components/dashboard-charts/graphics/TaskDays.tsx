import { Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import clsx from 'clsx';
import {
  differenceInMilliseconds,
  format,
  isBefore,
  startOfToday,
} from 'date-fns';
import React from 'react';
import { ChartsContext } from '@/components/dashboard-charts/Charts';
import s from '@/components/dashboard-charts/charts.module.css';
import { graphics } from '@/components/dashboard-charts/charts.sizes';

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

  // NOTE: This chart bugs while development
  // https://stackoverflow.com/a/78437825/22737676
  return (
    <article className={clsx(s.chart, 'col-span-2')}>
      <h2 className={s.title}>Planned tasks</h2>
      <Divider />
      <LineChart
        dataset={stats}
        series={[
          {
            dataKey: 'quantity',
            color: 'rgb(var(--primary))',
            valueFormatter: (item) => `Q (${item})`,
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
        width={graphics.width}
        height={graphics.height}
      />
    </article>
  );
};
