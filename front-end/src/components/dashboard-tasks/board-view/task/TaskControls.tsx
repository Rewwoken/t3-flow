import { PencilLine, X } from 'lucide-react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/useDeleteTask';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';

interface ITaskControlsProps {
	taskId: string;
}
export const TaskControls = ({ taskId }: ITaskControlsProps) => {
	const { mutate: deleteTask } = useDeleteTask();

	const onDelete = () => {
		// TODO: add confirm toggle
		if (!confirm('Are you sure you want to delete this task?')) {
			return null;
		}

		deleteTask({ id: taskId });
	};

	const onUpdate = () => {
		console.log('update');
	};

	return (
		<ul className={s.controls}>
			<button
				type='button'
				className={s.delete}
				title='Delete this task'
				onClick={onDelete}
			>
				<X
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			<button
				type='button'
				className={s.update}
				title='Update this task'
				onClick={onUpdate}
			>
				<PencilLine
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
		</ul>
	);
};

// export const TaskControls = React.memo(TaskControlsComponent);
