'use client';

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { isValid, setHours, setMinutes } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import * as v from '@/components/dashboard-tasks/board-view/task/task-update/task-update.validation';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/task.types';

interface IUpdateTaskFormProps {
	task: IGetTaskResponse;
	handleClose: Function;
}
export const TaskUpdateForm = ({ task, handleClose }: IUpdateTaskFormProps) => {
	const { rankedUpdate } = useRankedUpdate();

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<IUpdateTaskFields>({
		mode: 'onChange',
	});

	const onSubmit = (values: IUpdateTaskFields) => {
		const { dueDay, dueTime, ...data } = values;

		if (!isValid(dueDay) || !isValid(dueTime) || !dueDay || !dueTime) {
			rankedUpdate({
				task,
				dataToUpdate: { ...data, dueDate: null, isCompleted: false },
			});

			return handleClose();
		}

		const dueDate = setMinutes(
			setHours(dueDay, dueTime.getHours()),
			dueTime.getMinutes(),
		);

		rankedUpdate({
			task,
			dataToUpdate: {
				...data,
				isCompleted: false,
				dueDate: dueDate.toISOString(),
			},
		});

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
				type='task-name'
				autoComplete='task-name'
				variant='outlined'
				size='small'
				defaultValue={task.name}
				{...register('name', v.name)}
				error={!!errors.name?.message}
				helperText={errors.name?.message}
			/>
			<FormControl>
				<InputLabel id='priority-select-label'>Priority</InputLabel>
				<Select
					labelId='priority-select-label'
					id='priority-select'
					label='Priority'
					size='small'
					defaultValue={task.priority}
					{...register('priority')}
				>
					<MenuItem value={v.Priority.low}>Low</MenuItem>
					<MenuItem value={v.Priority.medium}>Medium</MenuItem>
					<MenuItem value={v.Priority.high}>High</MenuItem>
				</Select>
			</FormControl>
			<Controller
				name='dueDay'
				control={control}
				defaultValue={task.dueDate ? new Date(task.dueDate) : null}
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
						defaultValue={task.dueDate ? new Date(task.dueDate) : null}
						value={value}
						onChange={(date) => onChange(date)}
						slotProps={{ textField: { size: 'small' } }}
						closeOnSelect
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
