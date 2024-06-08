'use client';

import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React from 'react';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/useCreateTask';
import { SortableTask } from '@/components/dashboard-tasks/board-view/task/SortableTask';
import { CreateTaskModal } from '@/components/dashboard-tasks/task-modal/CreateTaskModal';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import type { ICreateTaskData, IGetTaskResponse } from '@/types/task.service';
import type { IColumnData } from '@/types/tasks.types';

interface IColumnProps extends IColumnData {
	tasks: IGetTaskResponse[];
}
const ColumnComponent = ({ id, title, dateSpan, tasks }: IColumnProps) => {
	const { mutate } = useCreateTask({ invalidate: true });
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id, tasks },
	});

	const [showModal, setShowModal] = React.useState(false);

	const items = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const createTask = (data: ICreateTaskData) => {
		mutate(data);
	};

	return (
		<>
			<li className='h-full w-72 px-4'>
				<span className='mb-1 flex justify-center text-muted'>{dateSpan}</span>
				<header className='mb-4 flex min-w-64 items-center justify-between bg-secondary p-2'>
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
					items={items}
					strategy={verticalListSortingStrategy}
				>
					<ul
						className='h-full space-y-4'
						ref={setNodeRef}
					>
						{tasks.map((task) => (
							<SortableTask
								colId={id}
								id={task.id}
								task={task}
								key={task.id}
							/>
						))}
						<button
							onClick={() => setShowModal(true)}
							disabled={showModal}
							className='ml-2 text-muted hover:underline'
						>
							+ Add Task
						</button>
					</ul>
				</SortableContext>
			</li>
			{showModal && (
				<ModalWrapper>
					<CreateTaskModal
						onSuccess={createTask}
						onClose={() => setShowModal(false)}
					/>
				</ModalWrapper>
			)}
		</>
	);
};

export const Column = React.memo(ColumnComponent);
