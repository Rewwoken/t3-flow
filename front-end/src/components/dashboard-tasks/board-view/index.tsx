'use client';

import { Skeleton } from '@/components/ui/Skeleton';
import { useTasks } from '../hooks/useTasks';
import { Column } from './Column';
import { daysDiff } from './daysDiff';

export const BoardView = () => {
	const { data } = useTasks();

	// TODO: skeleton design
	if (!data) return <Skeleton />;

	return (
		<>
			<p className='mb-4 text-xl'>
				Today is {new Intl.DateTimeFormat('en').format(Date.now())}
			</p>
			<ul className='flex'>
				<Column
					title='Overdue'
					id='overdue'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff !== null && diff < 0) return true;
					})}
				/>
				<Column
					title='No date'
					id='no-date'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff === null) return true;
					})}
				/>
				<Column
					title='Today'
					id='today'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff !== null && diff === 0) return true;
					})}
				/>
				<Column
					title='Tomorrow'
					id='tomorrow'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff !== null && diff === 1) return true;
					})}
				/>
				<Column
					title='This week'
					id='this-week'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff !== null && 1 < diff && diff <= 7) return true;
					})}
				/>
				<Column
					title='Later'
					id='later'
					data={data.filter((task) => {
						const diff = daysDiff(task.dueDate);

						if (diff !== null && diff > 7) return true;
					})}
				/>
			</ul>
		</>
	);
};
