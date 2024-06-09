'use client';

import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import type { IGetTaskResponse } from '@/types/task.service';

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
 */
export function useColumn({ id, tasks }: IUseColumnParams) {
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id, tasks },
	});

	const [showModal, setShowModal] = React.useState(false);

	const ids = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	return {
		listRef: setNodeRef,
		showModal,
		setShowModal,
		ids,
	};
}
