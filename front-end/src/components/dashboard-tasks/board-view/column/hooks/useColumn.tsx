'use client';

import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import type { IGetTaskResponse } from '@/types/task.service';
import { TTaskGroupId } from '@/types/task.types';

interface IUseColumnParams {
	id: TTaskGroupId;
	tasks: IGetTaskResponse[];
}
/**
 * @name useColumn
 * @description A custom hook to manage a column of tasks.
 *
 * @param {Object} params - An object with the following properties:
 * @param {TTaskGroupId} params.id - The ID of the column.
 * @param {IGetTaskResponse[]} params.tasks - An array of this column's task objects.
 *
 * @returns {Object} - An object with the following properties:
 * @param {function} listRef - A reference to mark the tasks list as droppable.
 * @param {Array<string>} ids - An array of memoized task IDs, should be passed to items prop of SortableContext.
 */
export function useColumn({ id, tasks }: IUseColumnParams) {
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id, tasks },
	});

	const ids = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	return {
		listRef: setNodeRef,
		ids,
	};
}
