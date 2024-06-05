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

/**
 * Custom hook to manage drag-and-drop functionality for tasks.
 *
 * @returns {Object} Object containing task groups, active task, and event handlers for drag operations.
 */
export function useDrag() {
	const { data } = useTasks();
	const { mutate } = useUpdateTask();
	const [taskGroups, setTaskGroups] = React.useState(groupTasks(data));
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null); // active task (for dragOverlay)

	React.useEffect(() => {
		setTaskGroups(groupTasks(data));
	}, [data]);

	const handleDragStart = (e: DragStartEvent) => {
		const { active } = e;

		if (!active.data.current) return null;

		setActive(active.data.current?.task); // set active task
	};

	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		const activeColId: TTaskGroupId = active.data.current?.colId;
		const overColId: TTaskGroupId = over?.data.current?.colId;

		if (!over || active.id === over.id || activeColId === overColId)
			return null;

		const from = active.data.current?.sortable.index; // dragged task index

		const newTask = {
			...active.data.current?.task,
			dueDate: due[overColId],
		};

		if (over.data.current?.type === 'column') {
			setTaskGroups((prev) => {
				const oldColumn = prev[activeColId].toSpliced(from, 1); // remove dragged task from it's column
				const newColumn = [...prev[overColId], newTask]; // add dragged task to overed column

				return {
					...prev,
					[activeColId]: oldColumn,
					[overColId]: newColumn,
				};
			});

			return null;
		}

		if (over.data.current?.type === 'task') {
			setTaskGroups((prev) => {
				const to = over.data.current?.sortable.index;

				const oldColumn = prev[activeColId].toSpliced(from, 1); // remove dragged task from it's column
				const newColumn = prev[overColId].toSpliced(to, 0, newTask); // add dragged task to overed column

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
		setActive(null); // remove active task on drag end

		const { active, over } = e;

		if (!over) return null;

		const activeColId: TTaskGroupId = active.data.current?.colId;

		if (over.data.current?.type !== 'column') {
			setTaskGroups((prev) => {
				const from = active.data.current?.sortable.index;
				const to = over?.data.current?.sortable.index;

				const newColumn = arrayMove(prev[activeColId], from, to);

				const newTasks = {
					...prev,
					[activeColId]: newColumn,
				};

				return newTasks;
			});
		}

		// TODO: fix useless mutation when task hasn't changed the column
		mutate({
			id: active.id as string,
			data: { dueDate: due[activeColId] },
		});

		return null;
	};

	return { taskGroups, active, handleDragStart, handleDragOver, handleDragEnd };
}
