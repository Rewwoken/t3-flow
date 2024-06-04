import type { IBase } from '@/types/api.types';
import type { IRegisterFields } from '@/types/auth.types';
import type { IGetTasksResponse } from '@/types/task.service';
import type { IGetTimerSettingsResponse } from '@/types/timer.service.types';

export interface IGetUserResponse extends IBase {
	email: string;
	name: string | null;
	tasks: IGetTasksResponse;
	timerSettings: IGetTimerSettingsResponse;
	timeBlocks: any[]; // TODO: IGetTimeBlocksResponse
	timerSessions: any[]; // TODO: IGetTimerSessionsResponse
}

export interface IUpdateUser extends Partial<IRegisterFields> {}

export interface IUpdateUserResponse {
	email: string;
	name: string | null;
	updatedAt: string;
}
