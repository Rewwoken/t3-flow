import clsx from 'clsx';
import { formatRelative, isValid } from 'date-fns';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCreateTaskModal } from '@/components/dashboard-tasks/board-view/task/task-modal/hooks/useCreateTaskModal';
import * as v from '@/components/dashboard-tasks/board-view/task/task-modal/create-task.validation';
import s from '@/components/dashboard-tasks/board-view/task/task-modal/task-modal.module.css';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import type { TTaskGroupId } from '@/types/task.types';

const now = new Date();

interface ICreateTaskModalProps {
	colId: TTaskGroupId;
	closeModal: () => void;
}
const CreateTaskModalComponent = ({
	colId,
	closeModal,
}: ICreateTaskModalProps) => {
	const {
		modalRef,
		onSubmit,
		register,
		isValidForm,
		errors,
		isPending,
		dueDate,
	} = useCreateTaskModal({
		colId,
		closeModal,
	});

	return (
		<div
			ref={modalRef}
			className='w-96 rounded-md bg-secondary p-4 shadow-lg'
		>
			<header className='mb-10 flex items-center justify-between border-b pb-1'>
				<h3 className='text-2xl'>Task creation</h3>
				<button onClick={closeModal}>
					<X
						size={27}
						className='stroke-text/50'
					/>
				</button>
			</header>
			<form
				onSubmit={onSubmit}
				className='mt-4 flex flex-col gap-y-7 accent-accent'
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
							'!border-b-danger': !!errors.name?.message,
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
				<div className='grid grid-cols-2 gap-2'>
					<FieldWrapper
						label='Due day'
						error={errors.dueDay?.message}
						htmlFor='day-input'
						className='text-muted'
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
						className='text-muted'
					>
						<input
							type='time'
							id='time-input'
							{...register('dueTime')}
							className={s.field}
						/>
					</FieldWrapper>
					<div className='ml-1 flex items-center gap-x-2'>
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
					{isValid(dueDate) && (
						<span className='mr-1 text-right text-sm capitalize italic text-muted'>
							{formatRelative(dueDate, now)}
						</span>
					)}
				</div>
				<SubmitButton
					isValid={isValidForm}
					isPending={isPending}
				>
					Create
				</SubmitButton>
			</form>
		</div>
	);
};

export const CreateTaskModal = ({
	colId,
	closeModal,
}: ICreateTaskModalProps) => {
	return createPortal(
		<div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50'>
			<CreateTaskModalComponent
				colId={colId}
				closeModal={closeModal}
			/>
		</div>,
		document.body,
	);
};
