import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import React from 'react';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';

interface ITaskStatusProps {
	dueDate: string | null;
}
const TaskStatusComponent = ({ dueDate }: ITaskStatusProps) => {
	if (dueDate === null) {
		return <span className={s.dateless}>No due date...</span>;
	}

	if (dueDate)
		return (
			<span className={s.date}>
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
