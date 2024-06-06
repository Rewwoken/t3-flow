'use client';

import { format, isValid, parse } from 'date-fns';
import { CalendarRange } from 'lucide-react';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import s from '@/components/dashboard-tasks/task-modal/task-modal.module.css';

interface ITaskModalDayProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
export const TaskModalDay = ({ date, setDate }: ITaskModalDayProps) => {
	const [inputValue, setInputValue] = React.useState(
		format(new Date(), 'MM/dd/yyyy'),
	);
	const [month, setMonth] = React.useState(new Date());
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	const toggleDialog = () => setIsDialogOpen((prev) => !prev);

	const handleDayPickerSelect = (date: Date | undefined) => {
		if (!date) {
			setDate(undefined);

			setInputValue('');
		} else {
			setDate(date);

			setInputValue(format(date, 'MM/dd/yyyy'));
		}

		setIsDialogOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);

		const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

		if (isValid(parsedDate)) {
			setDate(parsedDate);

			setMonth(parsedDate);
		} else {
			setDate(undefined);
		}
	};

	return (
		<>
			<div className='flex items-center gap-3 pr-2'>
				<input
					id='date-input'
					type='text'
					value={inputValue}
					placeholder={'MM/dd/yyyy'}
					onChange={handleInputChange}
					className={s.input}
				/>
				<button
					type='button'
					onClick={toggleDialog}
				>
					<CalendarRange
						strokeWidth={1.2}
						size={40}
					/>
				</button>
			</div>
			{isDialogOpen && (
				<DayPicker
					mode='single'
					month={month}
					onMonthChange={setMonth}
					selected={date}
					onSelect={handleDayPickerSelect}
					className=''
				/>
			)}
		</>
	);
};
