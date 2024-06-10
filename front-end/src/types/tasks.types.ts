import { IGetTaskResponse } from '@/types/task.service';

export type TTaskGroupId =
	| 'completed'
	| 'noDate'
	| 'overdue'
	| 'today'
	| 'tomorrow'
	| 'theseTwoWeeks'
	| 'later';

export interface IColumnData {
	id: TTaskGroupId;
	title: string;
	dateSpan: string;
}

export interface ITaskGroups extends Record<TTaskGroupId, IGetTaskResponse[]> {}

export interface IStartPositionRef {
	colId: TTaskGroupId | null;
	index: number | null;
}

export interface ICreateTaskFields {
	name: string;
	priority: 'low' | 'medium' | 'high';
	dueDay: string;
	dueTime: string;
	isCompleted: boolean;
}
