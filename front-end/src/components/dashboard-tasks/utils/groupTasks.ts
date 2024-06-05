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

	return { ...initialGroups, ...groups };
};
