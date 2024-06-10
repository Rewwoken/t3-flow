import { Active, Over } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { genRank } from '@/utils/genRank';
import type { ITaskGroups, TTaskGroupId } from '@/types/tasks.types';

/**
 * Returns the new rank for the active task
 * based on the active and over objects.
 *
 * @param {Active} active - The `DragEnd` active task object.
 * @param {Over} over - The `DragEnd` over object.
 * @param {ITaskGroups} taskGroups - The task groups object.
 *
 * @returns {string | undefined} The new rank for the task.
 */
export const getNewTaskRank = (
	active: Active,
	over: Over,
	taskGroups: ITaskGroups,
) => {
	const currentActive = active.data.current;
	const currentOver = over?.data.current;

	if (currentOver?.type === 'task') {
		const fromIndex = currentActive?.sortable?.index;
		const toIndex = currentOver?.sortable?.index;

		const newOverCol = arrayMove(
			taskGroups[currentOver?.colId as TTaskGroupId],
			fromIndex,
			toIndex,
		);

		const prevRank = newOverCol[toIndex - 1]?.rank;
		const nextRank = newOverCol[toIndex + 1]?.rank;

		return genRank(prevRank, nextRank);
	}

	if (currentOver?.type === 'column') {
		const overTasks = currentOver?.tasks;

		if (overTasks.length === 1) {
			return genRank(undefined, undefined);
		}

		// Get the rank of the last task in the column
		const prevRank = overTasks[overTasks.length - 1].rank;

		return genRank(prevRank, undefined);
	}
};
