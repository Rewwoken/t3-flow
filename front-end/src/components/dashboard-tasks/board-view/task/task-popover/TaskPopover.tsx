'use client';

import clsx from 'clsx';
import { format, isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useOutside } from '@/hooks/useOutside';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import s from '@/components/dashboard-tasks/board-view/task/task-popover/task-popover.module.css';
import * as v from '@/components/dashboard-tasks/board-view/task/task-popover/task-popover.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/tasks.types';

interface ITaskPopoverProps {
	x: number | null;
	y: number | null;
	task: IGetTaskResponse;
	closePopover: () => void;
}
// TODO: fix x & y positioning, add animation, move logic to custom hook,
export const TaskPopover = ({
	x,
	y,
	task,
	closePopover,
}: ITaskPopoverProps) => {
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

	if (x === null || y === null) return null; // Should not happen

	const screenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;

	const xDirection = x > screenWidth * 0.75 ? 'left' : 'right';
	const yDirection = y < screenHeight / 2 ? 'bottom' : 'top';

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

	return (
		<div
			ref={ref}
			style={{
				top: yDirection === 'top' ? -120 : 85, // TODO: update
				right: xDirection === 'right' ? -195 : 25,
			}}
			className={s.popover}
		>
			<h3 className={s.heading}>Update task</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={s.form}
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
		</div>
	);
};
