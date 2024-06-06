import { Check, Clock } from 'lucide-react';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { beautyDate } from '@/components/dashboard-tasks/utils/beautyDate';

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

	if (dueDate) {
		const date = new Date(dueDate);

		return (
			<span className={s.date}>
				<Clock
					className='stroke-muted'
					size={19}
				/>
				{beautyDate(date)}
			</span>
		);
	}

	return null;
};
