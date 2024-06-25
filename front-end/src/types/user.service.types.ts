import type { IBase } from '@/types/api.types';
import type { IRegisterFields } from '@/types/auth.types';
import type { IGetTaskResponse } from '@/types/task.service';
import type { IGetTimeBlocksResponse } from '@/types/time-block.service.types';
import type {
	IGetTimerSessionResponse,
	IGetTimerSettingsResponse,
} from '@/types/timer.service.types';

export interface IGetProfileResponse extends IGetUserResponse {
	tasks: IGetTaskResponse[];
	timerSession: IGetTimerSessionResponse;
	timerSettings: IGetTimerSettingsResponse;
	timeBlocks: IGetTimeBlocksResponse;
}

export interface IGetUserResponse extends IBase {
	name: string | null;
	email: string;
}

export interface IUpdateUser extends Partial<IRegisterFields> {}

export interface IUpdateUserResponse extends IGetUserResponse {}
