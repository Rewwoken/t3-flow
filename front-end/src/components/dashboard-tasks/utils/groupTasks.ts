import { IGetTaskResponse } from '@/types/task.service';
import { getGroup } from './getGroup';

export type TTaskGroupId =
	| 'completed'
	| 'noDate'
	| 'overdue'
	| 'today'
	| 'tomorrow'
	| 'thisWeek'
	| 'later';

const initialGroups: Record<TTaskGroupId, IGetTaskResponse[]> = {
	completed: [],
	noDate: [],
	overdue: [],
	today: [],
	tomorrow: [],
	thisWeek: [],
	later: [],
};

export const groupTasks = (
	data: IGetTaskResponse[] | undefined,
): Record<TTaskGroupId, IGetTaskResponse[]> => {
	if (!data) return initialGroups;

	const groups = Object.groupBy(data, (task) => {
		return getGroup(task);
	});

	const sorted: Partial<Record<TTaskGroupId, IGetTaskResponse[]>> = {};

	for (const key in initialGroups) {
		const group = groups[key as TTaskGroupId];

		if (!group) {
			sorted[key as TTaskGroupId] = [];

			continue;
		}

		sorted[key as TTaskGroupId] = group.toSorted((a, b) => {
			if (a.rank === null) {
				return 1;
			}

			if (b.rank === null) {
				return -1;
			}

			return a.rank.localeCompare(b.rank);
		});
	}

	return { ...initialGroups, ...sorted };
};
