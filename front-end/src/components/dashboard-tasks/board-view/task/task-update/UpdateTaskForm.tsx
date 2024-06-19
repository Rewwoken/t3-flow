'use client';

import clsx from 'clsx';
import { format, isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import s from '@/components/dashboard-tasks/board-view/task/task-update/task-update.module.css';
import * as v from '@/components/dashboard-tasks/board-view/task/task-update/task-update.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/task.types';

interface IUpdateTaskFormProps {
	task: IGetTaskResponse;
	handleClose: () => void;
}
export const UpdateTaskForm = ({ task, handleClose }: IUpdateTaskFormProps) => {
	const { rankedUpdate } = useRankedUpdate();

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
			rankedUpdate({
				task,
				dataToUpdate: { ...data, dueDate: null, isCompleted: false },
			});
		} else {
			rankedUpdate({
				task,
				dataToUpdate: {
					...data,
					isCompleted: false,
					dueDate: dueDate.toISOString(),
				},
			});
		}

		handleClose();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-y-4 border bg-background p-2 pt-3'
		>
			<FieldWrapper
				label='Task name'
				error={errors.name?.message}
				htmlFor='name-input'
				className={s.label}
			>
				<input
					autoFocus
					autoComplete='off'
					id='name-input'
					type='text'
					placeholder='Your task name...'
					{...register('name', v.name)}
					className={clsx(s.field, {
						[s.invalid]: !!errors.name?.message,
					})}
				/>
			</FieldWrapper>
			<FieldWrapper
				label='Task priority'
				error={errors.priority?.message}
				htmlFor='priority-select'
				className={s.label}
			>
				<select
					id='priority-select'
					{...register('priority')}
					className={clsx(s.field, 'cursor-pointer')}
				>
					<option value={v.Priority.low}>Low</option>
					<option value={v.Priority.medium}>Medium</option>
					<option value={v.Priority.high}>High</option>
				</select>
			</FieldWrapper>
			<FieldWrapper
				label='Due day'
				error={errors.dueDay?.message}
				htmlFor='day-input'
				className={s.label}
			>
				<input
					type='date'
					id='day-input'
					{...register('dueDay')}
					className={s.field}
				/>
			</FieldWrapper>
			<FieldWrapper
				label='Due time'
				error={errors.dueTime?.message}
				htmlFor='time-input'
				className={s.label}
			>
				<input
					type='time'
					id='time-input'
					{...register('dueTime')}
					className={s.field}
				/>
			</FieldWrapper>
			<SubmitButton
				isPending={false}
				isValid={true}
				className='w-full'
			>
				Update
			</SubmitButton>
		</form>
	);
};
