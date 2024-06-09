import clsx from 'clsx';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useOutside } from '@/hooks/useOutside';
import * as v from '@/components/dashboard-tasks/task-modal/create-task.validation';
import s from '@/components/dashboard-tasks/task-modal/task-modal.module.css';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { ICreateTaskFields } from '@/types/tasks.types';

interface ICreateTaskModal extends React.ComponentProps<'div'> {
	onClose: () => void;
}
export const CreateTaskModal = ({ onClose }: ICreateTaskModal) => {
	const { ref } = useOutside(onClose);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreateTaskFields>({
		mode: 'onChange',
		defaultValues: { dueDate: format(new Date(), 'yyyy-MM-dd') },
	});

	const onSubmit = (values: ICreateTaskFields) => {
		if (values.dueDate) {
			values.dueDate = new Date(values.dueDate).toISOString();
		}

		if (!values.dueDate) {
			values.dueDate = null;
		}
		// onClose();
		debugger;
	};

	return (
		<div
			ref={ref}
			className={s.wrapper}
		>
			<header className={s.heading}>
				<h3 className='text-2xl'>New task creation</h3>
				<button onClick={onClose}>
					<X
						size={27}
						className='stroke-text/50'
					/>
				</button>
			</header>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={s.form}
				autoComplete='off'
			>
				<FieldWrapper
					label='Task name'
					error={errors.name?.message}
					htmlFor='name-input'
					className='text-muted'
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
					className='text-muted'
				>
					<select
						id='priority-select'
						{...register('priority', v.priority)}
						className={clsx(s.field, 'cursor-pointer')}
					>
						<option value={v.Priority.low}>Low</option>
						<option value={v.Priority.medium}>Medium</option>
						<option value={v.Priority.high}>High</option>
					</select>
				</FieldWrapper>
				<FieldWrapper
					label='Task date'
					error={errors.dueDate?.message}
					htmlFor='date-input'
					className='text-muted'
				>
					<input
						type='date'
						id='date-input'
						{...register('dueDate')}
						className={s.field}
					/>
				</FieldWrapper>
				<div className='flex gap-x-2'>
					<input
						type='checkbox'
						id='is-completed'
						{...register('isCompleted')}
					/>
					<label
						htmlFor='is-completed'
						className='text-sm'
					>
						Is completed?
					</label>
				</div>
				<SubmitButton
					isValid={!Object.keys(errors).length}
					isPending={false}
				>
					Create
				</SubmitButton>
			</form>
		</div>
	);
};
