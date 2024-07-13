import React from 'react';
import { TaskStatus } from '@/components/dashboard-tasks/board-view/task/task-data/TaskStatus';

interface ITaskTextProps extends React.ComponentProps<'article'> {
  name: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
}
export const TaskText = ({
  name,
  priority,
  dueDate,
  ...props
}: ITaskTextProps) => (
  <article
    {...props}
    className='flex w-full flex-col justify-between py-1.5 pl-2 hover:cursor-grab'
  >
    <h4 className='my-1 text-xl font-medium leading-5'>{name}</h4>
    <p>Priority:&nbsp;{priority}</p>
    <TaskStatus dueDate={dueDate} />
  </article>
);
