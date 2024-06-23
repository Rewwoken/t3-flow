import { Button } from '@mui/material';
import { useHandleTaskDelete } from '@/components/dashboard-tasks/board-view/task/task-controls/task-delete/hooks/useHandleTaskDelete';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskDeleteButtonProps {
	task: IGetTaskResponse;
	handleClose: () => void;
}
export const TaskDeleteButton = ({
	task,
	handleClose,
}: ITaskDeleteButtonProps) => {
	const { onDelete } = useHandleTaskDelete();

	const onClick = () => {
		onDelete(task);

		handleClose();
	};

	return (
		<Button
			variant='contained'
			color='warning'
			onClick={onClick}
		>
			Are you sure?
		</Button>
	);
};
