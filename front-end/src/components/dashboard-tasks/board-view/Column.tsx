'use client';

import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SquarePlus } from 'lucide-react';
import React from 'react';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/useCreateTask';
import { SortableTask } from '@/components/dashboard-tasks/board-view/task/SortableTask';
import { CreateTaskModal } from '@/components/dashboard-tasks/task-modal/CreateTaskModal';
import { TTaskGroupId } from '@/components/dashboard-tasks/utils/groupTasks';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ICreateTaskData, IGetTaskResponse } from '@/types/task.service';

interface IColumnProps {
	title: string;
	id: TTaskGroupId;
	tasks: IGetTaskResponse[];
}
const ColumnComponent = ({ title, id, tasks }: IColumnProps) => {
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
				<header className='mb-4 flex min-w-64 items-center justify-between bg-secondary p-2'>
					<h3 className='text-2xl'>
						{tasks.length}&nbsp;{title}
					</h3>
					<button
						type='button'
						onClick={() => setShowModal(true)}
					>
						<SquarePlus
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
