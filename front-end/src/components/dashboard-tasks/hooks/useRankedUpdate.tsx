'use client';

import { useUpdateTask } from '@/components/dashboard-tasks/hooks/queries/useUpdateTask';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { taskService } from '@/services/task.service';
import { genRank } from '@/utils/genRank';
import { IGetTaskResponse } from '@/types/task.service';

interface IRankedUpdateParams {
	task: IGetTaskResponse;
	dataToUpdate: any; // TODO: add interface
}
/**
 * A custom hook that returns a function that updates a task with a new rank based on its target group.
 *
 * @returns {Object} - An object with a single function `rankedUpdate`.
 * @property {function} rankedUpdate - A function that takes a task and new data to update the task with.
 */
export function useRankedUpdate() {
	// Since taskGroups is not a global state, we can
	// change it on client by invalidating the query
	const { mutate: updateTask } = useUpdateTask({ invalidate: true });

	/**
	 * A function that updates a task with a new rank based on its target group.
	 * It takes a task and a new data to update it with.
	 *
	 * @param {Object} params - An object with a task and a new data to update the task with.
	 * @param {Object} params.task - The task to update.
	 * @param {Object} params.dataToUpdate - The new data to update the task with.
	 */
	async function rankedUpdate({ task, dataToUpdate }: IRankedUpdateParams) {
		const toGroupId = getTaskGroupId(dataToUpdate);

		if (getTaskGroupId(task) === toGroupId) {
			return updateTask({ id: task.id, data: dataToUpdate });
		}

		const taskGroups = await taskService.getAllGrouped(); // TODO: if possible, optimize queries amount
		const toGroup = taskGroups[toGroupId];

		if (toGroup.length === 0) {
			const rank = genRank(undefined, undefined) as string;

			return updateTask({ id: task.id, data: { ...dataToUpdate, rank } });
		}

		const prevRank = toGroup[toGroup.length - 1].rank;
		const rank = genRank(prevRank, undefined) as string;

		updateTask({ id: task.id, data: { ...dataToUpdate, rank } });
	}

	return { rankedUpdate };
}
