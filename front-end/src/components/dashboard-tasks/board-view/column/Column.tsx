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
import { CreateTaskModal } from '@/components/dashboard-tasks/task-modal/CreateTaskModal';
import type { IGetTaskResponse } from '@/types/task.service';
import type { IColumnData } from '@/types/tasks.types';

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
			<li className={s.column}>
				<span className={s.datespan}>{dateSpan}</span>
				<header className={s.header}>
					<h3 className='text-2xl'>
						{tasks.length}&nbsp;{title}
					</h3>
					<button
						type='button'
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
					<ul
						className={s.list}
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
							onClick={() => setShowModal(true)}
							disabled={showModal}
							className={s.add}
						>
							+ Add Task
						</button>
					</ul>
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
