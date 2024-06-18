'use client';

import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React from 'react';
import { useColumn } from '@/components/dashboard-tasks/hooks/useColumn';
import s from '@/components/dashboard-tasks/board-view/column/column.module.css';
import { SortableTask } from '@/components/dashboard-tasks/board-view/task/SortableTask';
import { CreateTaskModal } from '@/components/dashboard-tasks/board-view/task/task-modal/CreateTaskModal';
import type { IGetTaskResponse } from '@/types/task.service';
import type { IColumnData } from '@/types/task.types';

interface IColumnProps extends IColumnData {
	tasks: IGetTaskResponse[];
}
const ColumnComponent = ({ id, title, dateSpan, tasks }: IColumnProps) => {
	const [showModal, setShowModal] = React.useState(false);

	const { listRef, ids } = useColumn({
		id,
		tasks,
	});

	return (
		<>
			<li className='min-w-[22rem] px-4'>
				<span className='mb-1 flex justify-center text-muted'>{dateSpan}</span>
				<header className='mb-4 flex items-center justify-between bg-secondary p-2'>
					<h3 className='text-2xl'>
						{tasks.length}&nbsp;{title}
					</h3>
					<button
						type='button'
						title='Open create task modal'
						onClick={() => setShowModal(true)}
					>
						<Plus
							size={30}
							className='stroke-muted'
						/>
					</button>
				</header>
				<SortableContext
					items={ids}
					strategy={verticalListSortingStrategy}
				>
					<ol
						className='flex h-full flex-col gap-y-4'
						ref={listRef}
					>
						{tasks.map((task) => (
							<SortableTask
								colId={id}
								taskId={task.id}
								task={task}
								key={task.id}
							/>
						))}
						<button
							type='button'
							onClick={() => setShowModal(true)}
							disabled={showModal}
							className='ml-2 select-none text-left text-muted hover:underline'
							title='Open create task modal'
						>
							+ Add Task
						</button>
					</ol>
				</SortableContext>
			</li>
			{showModal && (
				<CreateTaskModal
					colId={id}
					closeModal={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export const Column = React.memo(ColumnComponent);
