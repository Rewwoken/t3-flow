import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useOutside } from '@/hooks/useOutside';
import { TaskModalDay } from '@/components/dashboard-tasks/task-modal/TaskModalDay';
import * as v from '@/components/dashboard-tasks/task-modal/create-task.validation';
import s from '@/components/dashboard-tasks/task-modal/task-modal.module.css';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { ICreateTaskData } from '@/types/task.service';
import 'react-day-picker/dist/style.css';

interface ICreateTaskModal extends React.ComponentProps<'div'> {
	onClose: () => void;
	onSuccess: (data: ICreateTaskData) => void;
}
export const CreateTaskModal = ({ onSuccess, onClose }: ICreateTaskModal) => {
	const { ref } = useOutside(onClose);
	const [dueDate, setDueDate] = React.useState<Date | undefined>(new Date());

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<ICreateTaskData>({
		mode: 'onSubmit',
		defaultValues: { dueDate: new Date().toISOString() },
	});

	React.useEffect(() => {
		setValue('dueDate', dueDate?.toISOString());
	}, [dueDate, setValue]);

	const onSubmit = (values: ICreateTaskData) => {
		onSuccess(values);
		// console.log({ values });
	};

	return (
		<div
			ref={ref}
			className={s.wrapper}
		>
			<header className='relative flex items-center justify-between'>
				<h3 className='text-2xl'>New task creation</h3>
				<button onClick={onClose}>
					<CircleX
						size={27}
						className='stroke-text/50'
					/>
				</button>
			</header>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-4 flex flex-col gap-y-4'
				autoComplete='off'
			>
				<FieldWrapper
					label='Task name'
					htmlFor='name-input'
					message={errors.name?.message}
					className='bg-secondary'
				>
					<input
						autoFocus
						autoComplete='off'
						type='text'
						id='name-input'
						className={clsx(s.input, {
							'border-danger': !!errors.name?.message,
						})}
						placeholder='Your task name...'
						{...register('name', v.name)}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Task priority'
					htmlFor='priority-select'
					className='bg-secondary'
				>
					<select
						id='priority-select'
						defaultValue={v.Priority.low}
						{...register('priority', v.priority)}
						className={s.select}
					>
						<option value={v.Priority.low}>Low</option>
						<option value={v.Priority.medium}>Medium</option>
						<option value={v.Priority.high}>High</option>
					</select>
				</FieldWrapper>
				<FieldWrapper
					label='Task date'
					id='date-input'
					className='bg-secondary'
				>
					<TaskModalDay
						date={dueDate}
						setDate={setDueDate}
					/>
				</FieldWrapper>
				<button
					type='submit'
					className='mt-5 rounded-sm bg-accent py-2 text-white'
				>
					Submit
				</button>
			</form>
		</div>
	);
};
