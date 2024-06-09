'use client';

import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/useCreateTask';
import type { ICreateTaskData, IGetTaskResponse } from '@/types/task.service';

interface IUseColumnParams {
	id: string;
	tasks: IGetTaskResponse[];
}
/**
 *   A custom hook to manage a column of tasks.
 *
 *   @param {Object} params - An object with the following properties:
 *   @param {string} params.id - The ID of the column.
 *   @param {Array<Object>} params.tasks - An array of task objects.
 *
 * 	 @returns {Object} - An object with the following properties:
 *   @property {function} listRef - A function to mark the tasks list as droppable.
 *   @property {boolean} showModal - A boolean indicating whether the modal is visible.
 *   @property {function} setShowModal - A function to set the visibility of the modal.
 *   @property {Array<string>} ids - An array of memoized task IDs, should be passed to items prop of SortableContext.
 *   @property {function} createTask - A function to create a new task in the column.
 */
export function useColumn({ id, tasks }: IUseColumnParams) {
	const { mutate } = useCreateTask({ invalidate: true });
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id, tasks },
	});

	const [showModal, setShowModal] = React.useState(false);

	const ids = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const createTask = (data: ICreateTaskData) => {
		// TODO: add column id...
		mutate(data);
	};

	return {
		listRef: setNodeRef,
		showModal,
		setShowModal,
		ids,
		createTask,
	};
}
