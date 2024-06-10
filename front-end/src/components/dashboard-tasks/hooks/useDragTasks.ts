'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { useTaskGroups } from '@/components/dashboard-tasks/hooks/useTaskGroups';
import { useUpdateTask } from '@/components/dashboard-tasks/hooks/useUpdateTask';
import { dueDate } from '@/components/dashboard-tasks/dueDate';
import { IGetTaskResponse } from '@/types/task.service';
import { IStartPositionRef, TTaskGroupId } from '@/types/tasks.types';
import { genRank } from '@/utils/genRank';

const resetPosition: IStartPositionRef = {
	colId: null,
	index: null,
};

/**
 * Custom hook to manage drag-and-drop functionality for tasks.
 *
 * @returns {Object} Object containing task groups, active task, and event handlers for drag operations.
 */
export function useDragTasks() {
	const { taskGroups, setTaskGroups } = useTaskGroups(); // Get taskGroups state, setState
	const { mutate: updateTask } = useUpdateTask({ invalidate: false }); // Get task update method
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null); // Active task state (for DragOverlay)
	const startPositionRef = React.useRef<IStartPositionRef>(resetPosition); // A ref used to check if task changed it's position

	const handleDragStart = (e: DragStartEvent) => {
		const { active } = e;

		startPositionRef.current = {
			colId: active.data.current?.colId,
			index: active.data.current?.sortable.index,
		};

		setActive(active.data.current?.task); // Set dragged task as active
	};

	// Handle cases where task is dragged to another column
	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		const activeColId: TTaskGroupId = active.data.current?.colId;
		const overColId: TTaskGroupId = over?.data.current?.colId;

		if (!over || active.id === over.id || activeColId === overColId)
			return null;

		const updatedTask = {
			...active.data.current?.task,
			dueDate: dueDate[overColId],
			isCompleted: overColId === 'completed',
		};
		const fromIndex = active.data.current?.sortable.index; // dragged task index

		// Handle the case where task is over a task in a different column
		if (over.data.current?.type === 'task') {
			setTaskGroups((prev) => {
				const toIndex = over.data.current?.sortable.index;

				const newActiveCol = prev[activeColId].toSpliced(fromIndex, 1); // Remove dragged task from it's column
				const newOverCol = prev[overColId].toSpliced(toIndex, 0, updatedTask); // Insert dragged task into overed column

				return {
					...prev,
					[activeColId]: newActiveCol,
					[overColId]: newOverCol,
				};
			});

			return null;
		}

		// Handle the case where task is over a different column
		if (over.data.current?.type === 'column') {
			setTaskGroups((prev) => {
				const oldColumn = prev[activeColId].toSpliced(fromIndex, 1); // Remove dragged task from it's column
				const newColumn = [...prev[overColId], updatedTask]; // Add dragged task to overed column

				return {
					...prev,
					[activeColId]: oldColumn,
					[overColId]: newColumn,
				};
			});

			return null;
		}

		return null;
	};

	// TODO: fix the issue multiple ranks are calculated wrong if the page is not refreshed
	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null); // Reset active task state on drag end, since the active task is dropped

		const { active, over } = e;

		// Do nothing if no over or task didn't change it's position
		if (
			!over ||
			(over.data.current?.type === 'task' &&
				startPositionRef.current.colId === over.data.current?.colId &&
				startPositionRef.current.index === over.data.current?.sortable.index)
		)
			return null;

		// Reset startPositonRef
		startPositionRef.current = resetPosition;

		const overColId: TTaskGroupId = over.data.current?.colId;
		const updatedTaskData = {
			dueDate: dueDate[overColId],
			isCompleted: overColId === 'completed',
		};

		if (over.data.current?.type === 'task') {
			const fromIndex = active.data.current?.sortable.index;
			const toIndex = over.data.current?.sortable.index;

			setTaskGroups((prev) => {
				const newOverCol = arrayMove(prev[overColId], fromIndex, toIndex);

				// if there is a task before the dropped one,
				// then take it's rank as prev, otherwise null
				const prevRank = newOverCol[toIndex - 1]?.rank;

				// if there is a task after the dropped one,
				// then take it's rank as next, otherwise null
				const nextRank = newOverCol[toIndex + 1]?.rank;

				const rank = genRank(prevRank, nextRank) as string;

				const newTask = {
					...active.data.current?.task,
					updatedTaskData,
					rank,
				};

				// Update tasks order on client
				const newTaskGroups = {
					...prev,
					[overColId]: newOverCol.toSpliced(toIndex, 1, newTask),
				};

				// Update task on server
				updateTask({
					id: active.id as string,
					data: {
						...updatedTaskData,
						rank,
					},
				});

				return newTaskGroups;
			});

			return null;
		}

		if (over.data.current?.type === 'column') {
			// If active task is the only one in the column
			if (over.data.current?.tasks.length === 1) {
				const rank = genRank(undefined, undefined) as string;

				// Update tasks order on client
				setTaskGroups((prev) => ({
					...prev,
					[overColId]: [
						{ ...active.data.current?.task, updatedTaskData, rank },
					],
				}));

				// Update task on server
				updateTask({
					id: active.id as string,
					data: {
						...updatedTaskData,
						rank,
					},
				});

				return null;
			}

			const overTasks = over.data.current?.tasks;
			const prevRank = overTasks[overTasks.length - 1].rank;

			const rank = genRank(prevRank, undefined) as string;

			// Update tasks order on client
			setTaskGroups((prev) => ({
				...prev,
				[overColId]: [
					...prev[overColId],
					{ ...active.data.current?.task, updatedTaskData, rank },
				],
			}));

			updateTask({
				id: active.id as string,
				data: {
					...updatedTaskData,
					rank,
				},
			});

			return null;
		}

		return null;
	};

	return { taskGroups, active, handleDragStart, handleDragOver, handleDragEnd };
}
