import Popover from '@mui/material/Popover';
import { PencilLine } from 'lucide-react';
import * as React from 'react';
import { useOutside } from '@/hooks/useOutside';
import { UpdateTaskForm } from '@/components/dashboard-tasks/board-view/task/task-update/UpdateTaskForm';
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

	const { ref } = useOutside(handleClose);

	const open = Boolean(anchorEl);
	const id = open ? 'update-task-popover' : undefined;

	return (
		<>
			<button
				aria-describedby={id}
				onClick={handleClick}
			>
				<PencilLine
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			<Popover
				id={id}
				open={open}
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
				<div
					ref={ref}
					className='contents'
				>
					<UpdateTaskForm
						task={task}
						handleClose={handleClose}
					/>
				</div>
			</Popover>
		</>
	);
};
