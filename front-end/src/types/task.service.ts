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
	rank: string | null;
	dueDate?: string | null;
	isCompleted?: boolean;
}

export interface ICreateTaskDataResponse extends IGetTaskResponse {}

export interface IGetTasksResponse extends Array<IGetTaskResponse> {}

export interface IUpdateTaskData {
	id: string;
	data: Partial<ICreateTaskData> & {
		rank: string | null;
	};
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
