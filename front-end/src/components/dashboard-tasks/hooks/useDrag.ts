'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { IGetTaskResponse } from '@/types/task.service';
import { due } from '../due.data';
import { useUpdateTask } from './useUpdateTask';

export function useDrag() {
	const { mutate } = useUpdateTask();
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null);

	const handleDragStart = (e: DragStartEvent) => {
		const { active } = e;

		if (!active.data.current) return null;

		active.data.current.roma = 1;
		setActive(active.data.current?.task);
	};

	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		if (!over || active.id === over.id) return null;

		const newTask: IGetTaskResponse = {
			...active.data.current?.task,
			dueDate: due[over.data.current?.colId],
		};

		// handle the same columns tasks case
		if (
			over.data.current?.type === 'task' &&
			active.data.current?.colId === over.data.current?.colId
		) {
			active.data.current?.setColumn((prev: IGetTaskResponse[]) => {
				const from = active.data.current?.sortable.index;
				const to = over.data.current?.sortable.index;

				return arrayMove(prev, from, to);
			});

			return null;
		}

		// handle the case where task is over a different column
		if (active.data.current?.colId !== over.data.current?.colId) {
			// remove active task from it's previous column
			active.data.current?.setColumn((prev: IGetTaskResponse[]) => {
				const from = active.data.current?.sortable.index;

				return prev.toSpliced(from, 1);
			});

			if (over.data.current?.type === 'column') {
				over.data.current?.setColumn((prev: IGetTaskResponse[]) => [
					...prev,
					newTask,
				]);

				return null;
			}

			over.data.current?.setColumn((prev: IGetTaskResponse[]) => {
				const to = over.data.current?.sortable.index;

				// insert an active task to the index it is overing
				return prev.toSpliced(to, 0, newTask);
			});

			return null;
		}

		return null;
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null);

		const { active, over } = e;

		if (!over) return null;

		const dueDate = due[over.data.current?.colId];

		if (over.data.current?.type !== 'column') {
			active.data.current?.setColumn((prev: IGetTaskResponse[]) => {
				const from = active.data.current?.sortable.index;
				const to = over.data.current?.sortable.index;

				return arrayMove(prev, from, to);
			});
		}

		mutate({
			id: active.id as string,
			data: { dueDate },
		});

		return null;
	};

	return { active, handleDragStart, handleDragOver, handleDragEnd };
}
