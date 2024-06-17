import type { IGetTaskResponse } from '@/types/task.service';

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

export interface IUpdateTaskFields
	extends Omit<ICreateTaskFields, 'isCompleted'> {}

export interface IPopover {
	x: number;
	y: number;
	isVisible: boolean;
}

export interface IRequiredToUpdateTaskData {
	isCompleted: boolean;
	dueDate: string | null;
}
