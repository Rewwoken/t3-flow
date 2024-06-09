import { format } from 'date-fns';
import { CalendarDays, Check } from 'lucide-react';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';

interface ITaskStatusProps {
	isCompleted: boolean;
	dueDate: string | null;
}
export const TaskStatus = ({ isCompleted, dueDate }: ITaskStatusProps) => {
	if (isCompleted) {
		return (
			<span className={s.completed}>
				Completed&nbsp;
				<Check className='size-4' />
			</span>
		);
	}

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
				{format(dueDate, 'eeee, LLL d')}
			</span>
		);

	return null;
};
