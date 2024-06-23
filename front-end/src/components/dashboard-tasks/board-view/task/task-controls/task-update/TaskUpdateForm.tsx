'use client';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHandleTaskUpdate } from '@/components/dashboard-tasks/board-view/task/task-controls/task-update/hooks/useHandleTaskUpdate';
import * as v from '@/components/dashboard-tasks/board-view/task/task-controls/task-update/task-update.validation';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/task.types';

interface IUpdateTaskFormProps {
	task: IGetTaskResponse;
	handleClose: Function;
}
export const TaskUpdateForm = ({ task, handleClose }: IUpdateTaskFormProps) => {
	const { onTaskUpdate } = useHandleTaskUpdate(task);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<IUpdateTaskFields>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<IUpdateTaskFields> = (values) => {
		onTaskUpdate(values);

		handleClose();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-y-4 border bg-background p-2 pt-3'
		>
			<TextField
				id='task-name-input'
				label='Task name'
				type='text'
				autoComplete='task-name'
				variant='outlined'
				size='small'
				defaultValue={task.name}
				{...register('name', v.name)}
				error={!!errors.name?.message}
				helperText={errors.name?.message}
			/>
			<Controller
				name='priority'
				control={control}
				defaultValue={task.priority}
				render={({ field: { onChange, value, ref } }) => (
					<FormControl>
						<InputLabel id='priority-select-label'>Priority</InputLabel>
						<Select
							id='priority-select'
							size='small'
							label='Priority'
							labelId='priority-select-label'
							defaultValue={task.priority}
							value={value}
							onChange={onChange}
							inputRef={ref}
						>
							<MenuItem value={v.Priority.low}>Low</MenuItem>
							<MenuItem value={v.Priority.medium}>Medium</MenuItem>
							<MenuItem value={v.Priority.high}>High</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
			<Controller
				name='dueDay'
				defaultValue={task.dueDate ? new Date(task.dueDate) : null}
				control={control}
				render={({ field: { onChange, value, ref } }) => (
					<DatePicker
						label='Due day'
						inputRef={ref}
						defaultValue={task.dueDate ? new Date(task.dueDate) : null}
						value={value}
						onChange={(date) => onChange(date)}
						slotProps={{ textField: { size: 'small' } }}
						closeOnSelect
					/>
				)}
			/>
			<Controller
				name='dueTime'
				control={control}
				defaultValue={task.dueDate ? new Date(task.dueDate) : null}
				render={({ field: { onChange, value, ref } }) => (
					<TimePicker
						label='Due time'
						inputRef={ref}
						value={value}
						onChange={(date) => onChange(date)}
						slotProps={{ textField: { size: 'small' } }}
						defaultValue={task.dueDate ? new Date(task.dueDate) : null}
						closeOnSelect
					/>
				)}
			/>

			<Controller
				name='isCompleted'
				control={control}
				render={({ field: { onChange, value, ref } }) => (
					<FormControlLabel
						control={<Checkbox size='small' />}
						onChange={onChange}
						value={value}
						inputRef={ref}
						label='Is completed?'
					/>
				)}
			/>
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
