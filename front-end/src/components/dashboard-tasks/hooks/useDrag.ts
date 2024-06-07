'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { useTasks } from '@/components/dashboard-tasks/hooks/useTasks';
import { useUpdateTask } from '@/components/dashboard-tasks/hooks/useUpdateTask';
import { due } from '@/components/dashboard-tasks/due.data';
import {
	TTaskGroupId,
	groupTasks,
} from '@/components/dashboard-tasks/utils/groupTasks';
import { IGetTaskResponse } from '@/types/task.service';
import { genRank } from '@/utils/genRank';

/**
 * Custom hook to manage drag-and-drop functionality for tasks.
 *
 * @returns {Object} Object containing task groups, active task, and event handlers for drag operations.
 */
export function useDrag() {
	const { data } = useTasks(); // Fetch all tasks
	const { mutate } = useUpdateTask({ invalidate: false }); // Get task reorder method
	const [taskGroups, setTaskGroups] = React.useState(groupTasks(data)); // Group tasks into time columns
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null); // Active task state (for DragOverlay)
	const changed = React.useRef<boolean>(false); // A ref used to avoid making redundant requests when task didn't change the order

	React.useEffect(() => {
		setTaskGroups(groupTasks(data));
	}, [data]);

	const handleDragStart = (e: DragStartEvent) => {
		changed.current = false;

		const { active } = e;

		if (!active.data.current) return null;

		setActive(active.data.current?.task); // Set dragged task as active
	};

	// Handle cases where task is dragged to another column
	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		if (!over || active.id === over.id) return null;

		const activeColId: TTaskGroupId = active.data.current?.colId;
		const overColId: TTaskGroupId = over?.data.current?.colId;

		changed.current = true; // explicitly mark that task `changed` it's position

		// Do nothing if the same column,
		// because handleDragEnd will handle this case
		if (activeColId === overColId) return null;

		const from = active.data.current?.sortable.index; // dragged task index

		const updatedTask = {
			...active.data.current?.task,
			dueDate: due[overColId],
			isCompleted: overColId === 'completed',
		};

		// Handle the case where task is over a different column
		if (over.data.current?.type === 'column') {
			setTaskGroups((prev) => {
				const oldColumn = prev[activeColId].toSpliced(from, 1); // Remove dragged task from it's column
				const newColumn = [...prev[overColId], updatedTask]; // Add dragged task to overed column

				return {
					...prev,
					[activeColId]: oldColumn,
					[overColId]: newColumn,
				};
			});

			return null;
		}

		// Handle the case where task is over a task in a different column
		if (over.data.current?.type === 'task') {
			setTaskGroups((prev) => {
				const to = over.data.current?.sortable.index;

				const newActiveCol = prev[activeColId].toSpliced(from, 1); // Remove dragged task from it's column
				const newOverCol = prev[overColId].toSpliced(to, 0, updatedTask); // Add dragged task to overed column

				return {
					...prev,
					[activeColId]: newActiveCol,
					[overColId]: newOverCol,
				};
			});

			return null;
		}

		return null;
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null); // Reset active task state on drag end, since the active task is dropped

		const { active, over } = e;

		// Do nothing if no over or task didn't change it's order
		if (!over || !changed.current) return null;

		const overColId: TTaskGroupId = over.data.current?.colId;
		const updatedTask = {
			dueDate: due[overColId],
			isCompleted: overColId === 'completed',
		};

		if (over.data.current?.type === 'task') {
			const from = active.data.current?.sortable.index;
			const to = over?.data.current?.sortable.index;

			setTaskGroups((prev) => {
				const newOverCol = arrayMove(prev[overColId], from, to);

				// if there is a task before dropped one,
				// then take it's rank as prev, otherwise null
				const prevRank = newOverCol[to - 1]?.rank ?? null;

				// if there is a task after the dropped one,
				// then take it's rank as next, otherwise null
				const nextRank = newOverCol[to + 1]?.rank ?? null;

				mutate({
					id: active.id as string,
					data: {
						...updatedTask,
						rank: genRank(prevRank, nextRank),
					},
				});

				const newTaskGroups = {
					...prev,
					[overColId]: newOverCol,
				};

				return newTaskGroups;
			});

			changed.current = false; // Reset `changed` ref

			return null;
		}

		if (over.data.current?.type === 'column') {
			// If active task is the only in the column
			if (
				over.data.current?.tasks.length === 0 ||
				over.data.current?.tasks.length === 1
			) {
				mutate({
					id: active.id as string,
					data: {
						...updatedTask,
						rank: genRank(null, null),
					},
				});

				changed.current = false; // Reset `changed` ref

				return null;
			}

			const overTasks = over.data.current?.tasks;
			const prevRank = overTasks[overTasks.length - 1].rank;

			mutate({
				id: active.id as string,
				data: {
					...updatedTask,
					rank: genRank(prevRank, null),
				},
			});

			changed.current = false; // Reset `changed` ref

			return null;
		}

		return null;
	};

	return { taskGroups, active, handleDragStart, handleDragOver, handleDragEnd };
}
