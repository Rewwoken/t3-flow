import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import React from 'react';

interface ITaskStatusProps {
  dueDate: string | null;
}
const TaskStatusComponent = ({ dueDate }: ITaskStatusProps) => {
  if (dueDate === null) {
    return <span className='italic text-muted'>No due date...</span>;
  }

  if (dueDate)
    return (
      <span className='flex items-center gap-1 text-muted'>
        <CalendarDays
          className='stroke-muted'
          size={19}
        />
        {format(dueDate, 'eeee, LLL d h:mm a')}
      </span>
    );

  return null;
};

export const TaskStatus = React.memo(TaskStatusComponent);
