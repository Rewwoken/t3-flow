'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { useTaskGroups } from '@/components/dashboard-tasks/hooks/useTaskGroups';
import { useUpdateTask } from '@/components/dashboard-tasks/hooks/useUpdateTask';
import { dueDate } from '@/components/dashboard-tasks/utils/dueDate';
import { getNewTaskRank } from '@/components/dashboard-tasks/utils/getTaskRank';
import { IGetTaskResponse } from '@/types/task.service';
import { IStartPositionRef, TTaskGroupId } from '@/types/tasks.types';

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

		const currentActive = active.data.current;
		const currentOver = over.data.current;
		const fromIndex = currentActive?.sortable.index; // dragged task index

		const updatedTask = {
			...currentActive?.task,
			dueDate: dueDate[overColId],
			isCompleted: overColId === 'completed',
		};

		// Handle the case where task is over a task in a different column
		if (currentOver?.type === 'task') {
			setTaskGroups((prev) => {
				const toIndex = currentOver?.sortable.index;

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

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null); // Reset active task state on drag end, since the active task is dropped

		const { active, over } = e;

		// Do nothing if no over or dragged task didn't change it's position
		if (
			!over ||
			(over.data.current?.type === 'task' &&
				startPositionRef.current.colId === over.data.current?.colId &&
				startPositionRef.current.index === over.data.current?.sortable.index)
		)
			return null;

		// Reset start position ref
		startPositionRef.current = resetPosition;

		const currentActive = active.data.current;
		const currentOver = over.data.current;
		const overColId: TTaskGroupId = currentOver?.colId;

		// Generate new lexorank based on active and over objects
		const rank = getNewTaskRank(active, over, taskGroups);

		const updatedTask = {
			// dueDate and isCompleted are updated in handleDragOver
			...currentActive?.task,
			rank,
		};

		if (currentOver?.type === 'task') {
			const fromIndex = currentActive?.sortable?.index;
			const toIndex = currentOver?.sortable?.index;

			const newOverCol = arrayMove(taskGroups[overColId], fromIndex, toIndex);

			setTaskGroups((prev) => ({
				...prev,
				[overColId]: newOverCol.toSpliced(toIndex, 1, updatedTask),
			}));
		}

		if (currentOver?.type === 'column')
			setTaskGroups((prev) => {
				const isEmpty = prev[overColId].length === 1;

				// If the active task is the only one in the over column,
				// set the over column to an array only with updated task.
				// Otherwise, add the updated task to the over column as the last one
				return {
					...prev,
					[overColId]: isEmpty
						? [updatedTask]
						: [...prev[overColId], updatedTask],
				};
			});

		// Update task on the server (without invalidation)
		updateTask({
			id: active.id as string,
			data: updatedTask,
		});

		return null;
	};

	return { taskGroups, active, handleDragStart, handleDragOver, handleDragEnd };
}
