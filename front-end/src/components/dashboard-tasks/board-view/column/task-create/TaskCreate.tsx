import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { TaskCreateForm } from '@/components/dashboard-tasks/board-view/column/task-create/TaskCreateForm';
import { TTaskGroupId } from '@/types/task.types';

const positionStyles = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

interface ITaskCreateProps {
	colId: TTaskGroupId;
}
export default function TaskCreate({ colId }: ITaskCreateProps) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<button
				onClick={handleOpen}
				className='pl-4 text-left text-sm text-muted hover:underline'
			>
				+ Add task
			</button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Fade in={open}>
					<div
						style={positionStyles}
						className='w-80 rounded-md bg-background p-3'
					>
						<header className='mb-2 w-full border-b-2 border-accent shadow-sm'>
							<h2 className='text-xl'>Task creation</h2>
						</header>
						<TaskCreateForm
							colId={colId}
							handleClose={handleClose}
						/>
					</div>
				</Fade>
			</Modal>
		</>
	);
}
