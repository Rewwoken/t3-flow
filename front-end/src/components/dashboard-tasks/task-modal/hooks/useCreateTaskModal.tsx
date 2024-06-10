'use client';

import { format, isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useOutside } from '@/hooks/useOutside';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/useCreateTask';
import { getDueDate } from '@/components/dashboard-tasks/utils/getDueDate';
import type { ICreateTaskFields, TTaskGroupId } from '@/types/tasks.types';

interface IUseCreateTaskModalParams {
	colId: TTaskGroupId;
	onClose: () => void;
}
/**
 * A custom hook to manage the creation of a task in a modal.
 *
 * @param    {Object} params - An object with the following properties:
 * @property {string} colId - The ID of the column where the task will be created.
 * @property {function} onClose - A function to close the modal.
 *
 * @returns  {Object} - An object with the following properties:
 * @property {function} modalRef - A reference returned by the useOutside hook.
 * @property {function} onSubmit - A function to handle the form submission.
 * @property {function} register - A function to register inputs in the form.
 * @property {object} errors - An object containing form error messages.
 * @property {Date} dueDate - The selected due date in the form(can be invalid).
 */
export function useCreateTaskModal({
	colId,
	onClose,
}: IUseCreateTaskModalParams) {
	const { mutate: createTask } = useCreateTask({ invalidate: true });
	const { ref } = useOutside(onClose);

	const defaultDueDate = getDueDate[colId];

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ICreateTaskFields>({
		mode: 'onChange',
		defaultValues: {
			dueDay: defaultDueDate ? format(defaultDueDate, 'yyyy-MM-dd') : undefined,
			dueTime: defaultDueDate ? format(defaultDueDate, 'hh:mm') : undefined,
			isCompleted: colId === 'completed',
		},
	});

	const [dueDay, dueTime] = watch(['dueDay', 'dueTime']);
	const dueDate = new Date(dueDay + 'T' + dueTime);

	const onSubmit = (values: ICreateTaskFields) => {
		const { dueDay, dueTime, ...data } = values;

		const dueDate = new Date(dueDay + 'T' + dueTime);

		if (!isValid(dueDate)) {
			createTask({ ...data, dueDate: null });
		} else {
			createTask({
				...data,
				dueDate: new Date(dueDate).toISOString(),
			});
		}

		onClose();
	};

	return {
		modalRef: ref,
		onSubmit: handleSubmit(onSubmit),
		errors,
		register,
		dueDate,
	};
}
