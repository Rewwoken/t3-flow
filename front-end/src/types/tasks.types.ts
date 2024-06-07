import { IGetTaskResponse } from '@/types/task.service';

export type TTaskGroupId =
	| 'completed'
	| 'noDate'
	| 'overdue'
	| 'today'
	| 'tomorrow'
	| 'thisWeek'
	| 'later';

export interface ITaskGroups extends Record<TTaskGroupId, IGetTaskResponse[]> {}
