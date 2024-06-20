import Popover from '@mui/material/Popover';
import { PencilLine } from 'lucide-react';
import * as React from 'react';
import { UpdateTaskForm } from '@/components/dashboard-tasks/board-view/task/task-update/UpdateTaskForm';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskUpdateProps {
	task: IGetTaskResponse;
}
export const TaskUpdate = ({ task }: ITaskUpdateProps) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'update-task-popover' : undefined;

	return (
		<>
			<button
				aria-describedby={id}
				onClick={handleClick}
				className={s.control}
			>
				<PencilLine
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			<Popover
				id={id}
				open={open}
				onClose={handleClose}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transitionDuration={200}
			>
				<UpdateTaskForm
					task={task}
					handleClose={handleClose}
				/>
			</Popover>
		</>
	);
};
