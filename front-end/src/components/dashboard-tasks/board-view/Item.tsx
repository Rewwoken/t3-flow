import clsx from 'clsx';
import React from 'react';
import { IGetTaskResponse } from '@/types/task.service';

interface ItemProps {
	task: IGetTaskResponse;
}
export const Item = React.forwardRef<
	HTMLLIElement,
	ItemProps
>(function Item({ task }, ref) {
	const dtf = new Intl.DateTimeFormat();

	return (
		<li
			ref={ref}
			className='flex flex-col rounded-md border bg-background p-1'
		>
			<h4 className='text-lg'>{task.name}</h4>
			<p>
				Priority:&nbsp;
				<span
					className={clsx('rounded-md px-2 py-0.5', {
						'bg-red-500': task.priority === 'high',
						'bg-orange-500': task.priority === 'medium',
						'bg-green-500': task.priority === 'low',
					})}
				>
					{task.priority}
				</span>
			</p>
			{task.dueDate ? (
				<p className='text-muted'>Due {dtf.format(new Date(task.dueDate))}</p>
			) : (
				<p className='italic text-muted'>No due date...</p>
			)}
		</li>
	);
});
