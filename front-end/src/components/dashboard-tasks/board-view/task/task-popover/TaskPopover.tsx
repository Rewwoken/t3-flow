'use client';

import clsx from 'clsx';
import { useTaskPopover } from '@/components/dashboard-tasks/board-view/task/task-popover/hooks/useTaskPopover';
import s from '@/components/dashboard-tasks/board-view/task/task-popover/task-popover.module.css';
import * as v from '@/components/dashboard-tasks/board-view/task/task-popover/task-popover.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskPopoverProps {
	x: number;
	y: number;
	task: IGetTaskResponse;
	closePopover: () => void;
}
export const TaskPopover = ({
	x,
	y,
	task,
	closePopover,
}: ITaskPopoverProps) => {
	const { popoverRef, positionStyles, onSubmit, formErrors, register } =
		useTaskPopover({ task, x, y, closePopover });

	return (
		<div
			ref={popoverRef}
			style={positionStyles}
			className={s.popover}
		>
			<h3 className={s.heading}>Update task</h3>
			<form
				onSubmit={onSubmit}
				className={s.form}
			>
				<FieldWrapper
					label='Task name'
					error={formErrors.name?.message}
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
							[s.invalid]: !!formErrors.name?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Task priority'
					error={formErrors.priority?.message}
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
					error={formErrors.dueDay?.message}
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
					error={formErrors.dueTime?.message}
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
