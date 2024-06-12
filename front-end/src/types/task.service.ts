import type { IBase } from '@/types/api.types';

export interface IGetTaskResponse extends IBase {
	name: string;
	priority: 'low' | 'medium' | 'high';
	isCompleted: boolean;
	rank: string; // lexorank
	dueDate: string | null; // ISODate
	userId: string;
}

export interface ICreateTaskData {
	name: string;
	priority: 'low' | 'medium' | 'high';
	dueDate: string | null;
	rank: string;
	isCompleted: boolean;
}

export interface ICreateTaskDataResponse extends IGetTaskResponse {}

export interface IGetTasksResponse extends Array<IGetTaskResponse> {}

export interface IUpdateTaskData {
	id: string;
	data: Partial<
		ICreateTaskData & {
			rank: string;
		}
	>;
}

export interface IUpdateTaskResponse extends IGetTaskResponse {}

export interface IDeleteTaskData {
	id: string;
}
