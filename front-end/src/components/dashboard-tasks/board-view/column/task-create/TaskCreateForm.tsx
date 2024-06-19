import clsx from 'clsx';
import { format, formatRelative, isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/queries/useCreateTask';
import s from '@/components/dashboard-tasks/board-view/column/task-create/task-create.module.css';
import * as v from '@/components/dashboard-tasks/board-view/column/task-create/task-create.validation';
import { getDueDate } from '@/components/dashboard-tasks/utils/dueDate';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import type { ICreateTaskFields, TTaskGroupId } from '@/types/task.types';

const now = new Date();

interface ICreateTaskModalProps {
	colId: TTaskGroupId;
	handleClose: () => void;
}
export const TaskCreateForm = ({
	colId,
	handleClose,
}: ICreateTaskModalProps) => {
	const { mutate: createTask, isPending } = useCreateTask({ invalidate: true });
	const defaultDueDate = getDueDate[colId];

	const {
		register,
		handleSubmit,
		formState: { errors, isValid: isValidForm },
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

		handleClose();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-y-7 rounded-md bg-background p-3 pt-4 accent-accent'
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
	);
};
