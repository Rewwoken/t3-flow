import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';

interface ITaskStatusProps {
	isCompleted: boolean;
	dueDate: string | null;
}
export const TaskStatus = ({ isCompleted, dueDate }: ITaskStatusProps) => {
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
				{format(dueDate, 'eeee, LLL d h:mm b')}
			</span>
		);

	return null;
};
