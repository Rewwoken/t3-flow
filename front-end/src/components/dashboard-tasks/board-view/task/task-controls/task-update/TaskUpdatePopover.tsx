import Popover from '@mui/material/Popover';
import { PencilLine } from 'lucide-react';
import React from 'react';
import { TaskControl } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControl';
import { TaskUpdateForm } from '@/components/dashboard-tasks/board-view/task/task-controls/task-update/TaskUpdateForm';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskUpdateProps {
	task: IGetTaskResponse;
}
export const TaskUpdatePopover = ({ task }: ITaskUpdateProps) => {
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
			<TaskControl
				title='Update'
				onClick={handleClick}
			>
				<PencilLine
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</TaskControl>
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
				<TaskUpdateForm
					task={task}
					handleClose={handleClose}
				/>
			</Popover>
		</>
	);
};
