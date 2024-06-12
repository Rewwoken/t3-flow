'use client';

import { useUpdateTask } from '@/components/dashboard-tasks/hooks/queries/useUpdateTask';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { taskService } from '@/services/task.service';
import { genRank } from '@/utils/genRank';
import { IGetTaskResponse } from '@/types/task.service';

interface IRankedUpdateParams {
	task: IGetTaskResponse;
	data: any;
}
export function useRankedUpdate() {
	// Since taskGroups is not a global state, we can
	// change it on client by invalidating the query
	const { mutate: updateTask } = useUpdateTask({ invalidate: true });

	async function rankedUpdate({ task, data }: IRankedUpdateParams) {
		const toGroupId = getTaskGroupId(data);

		if (getTaskGroupId(task) === toGroupId) {
			return updateTask({ id: task.id, data: data });
		}

		const taskGroups = await taskService.getAllGrouped();
		const toGroup = taskGroups[toGroupId];

		if (toGroup.length === 0) {
			const rank = genRank(undefined, undefined) as string;

			return updateTask({ id: task.id, data: { ...data, rank } });
		}

		const prevRank = toGroup[toGroup.length - 1].rank;
		const rank = genRank(prevRank, undefined) as string;

		updateTask({ id: task.id, data: { ...data, rank } });
	}

	return { rankedUpdate };
}
