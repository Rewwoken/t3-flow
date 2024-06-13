'use client';

import { format, isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useOutside } from '@/hooks/useOutside';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/tasks.types';

interface IUseTaskPopoverParams {
	x: number;
	y: number;
	task: IGetTaskResponse;
	closePopover: () => void;
}
export function useTaskPopover({
	task,
	x,
	y,
	closePopover,
}: IUseTaskPopoverParams) {
	const { rankedUpdate } = useRankedUpdate();
	const { ref } = useOutside(closePopover);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IUpdateTaskFields>({
		mode: 'onChange',
		defaultValues: {
			name: task.name,
			priority: task.priority,
			dueDay: task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : undefined,
			dueTime: task.dueDate ? format(task.dueDate, 'hh:mm') : undefined,
		},
	});

	const onSubmit = (values: IUpdateTaskFields) => {
		const { dueDay, dueTime, ...data } = values;

		const dueDate = new Date(dueDay + 'T' + dueTime);

		if (!isValid(dueDate)) {
			rankedUpdate({ task, dataToUpdate: { ...data, dueDate: null } });
		} else {
			rankedUpdate({
				task,
				dataToUpdate: { ...data, dueDate: dueDate.toISOString() },
			});
		}

		closePopover();
	};

	const screenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;

	const xDirection = x > screenWidth * 0.75 ? 'left' : 'right';
	const yDirection = y < screenHeight / 2 ? 'bottom' : 'top';

	const positionStyles = {
		top: yDirection === 'top' ? -170 : undefined,
		right: xDirection === 'right' ? -205 : undefined,
		bottom: yDirection === 'bottom' ? -260 : undefined,
		left: xDirection === 'left' ? -195 : undefined,
	};

	return {
		popoverRef: ref,
		positionStyles,
		onSubmit: handleSubmit(onSubmit),
		formErrors: errors,
		register,
	};
}
