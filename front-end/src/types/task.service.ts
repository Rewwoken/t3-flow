import type { IBase } from '@/types/api.types';

export interface IGetTaskResponse extends IBase {
	name: string;
	priority: 'low' | 'medium' | 'high';
	isCompleted: boolean;
	rank: string | null; // lexorank
	dueDate: string | null; // ISODate
	relativeDiffInDays: number | null;
	userId: string;
}

export interface ICreateTaskData {
	name: string;
	priority?: 'low' | 'medium' | 'high';
	isCompleted?: boolean;
	dueDate?: string | null;
}

export interface ICreateTaskDataResponse extends IGetTaskResponse {}

export interface IGetTasksResponse extends Array<IGetTaskResponse> {}

export interface IUpdateTaskData {
	id: string;
	data: Partial<ICreateTaskData>;
}

export interface IUpdateTaskResponse extends IGetTaskResponse {}

export interface IDeleteTaskData {
	id: string;
}

export interface IReorderData {
	id: string;
	data: Partial<ICreateTaskData>;
	prevRank: string | null;
	nextRank: string | null;
}
