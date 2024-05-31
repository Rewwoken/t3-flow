import { IBase } from '@/types/api.types';

export interface IGetTaskResponse extends IBase {
	name: string;
	priority: 'low' | 'medium' | 'high';
	isCompleted: boolean;
	userId: string;
}

export interface IUpdateTaskResponse extends IGetTaskResponse {}

export interface IUpdateTaskData {
	id: string;
	data: {
		name?: string;
		priority?: 'low' | 'medium' | 'high';
		isCompleted?: boolean;
	};
}

export interface IGetTasksResponse extends Array<IGetTaskResponse> {}
