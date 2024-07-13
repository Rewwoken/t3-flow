import clsx from 'clsx';
import React from 'react';

interface ITaskPriorityProps extends React.ComponentProps<'div'> {
  priority: 'low' | 'medium' | 'high';
}
export const TaskPriority = ({ priority, ...props }: ITaskPriorityProps) => (
  <div
    {...props}
    className={clsx('w-2 rounded-l-sm hover:cursor-grab', {
      'bg-rose-500 dark:bg-rose-700': priority === 'high',
      'bg-amber-400 dark:bg-amber-600': priority === 'medium',
      'bg-emerald-500 dark:bg-emerald-600': priority === 'low',
    })}
  ></div>
);
