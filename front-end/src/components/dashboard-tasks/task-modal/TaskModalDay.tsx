'use client';

import React from 'react';
import { DayPicker } from 'react-day-picker';
import s from '@/components/dashboard-tasks/task-modal/task-modal.module.css';

interface ITaskModalDayProps {
	setDate: (value: string) => void;
}
export const TaskModalDay = ({ setDate }: ITaskModalDayProps) => {
	const [value, setValue] = React.useState('');
	const [selected, setSelected] = React.useState<Date>();

	return (
		<>
			<div className='flex items-center gap-3 pr-2'>
				<input
					id='date-input'
					type='text'
					value={value}
					placeholder={'MM/dd/yyyy'}
					className={s.input}
				/>
			</div>
			<DayPicker
				mode='single'
				selected={selected}
				onSelect={setSelected}
			/>
		</>
	);
};
