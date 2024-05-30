import type { IRegisterInputs } from '@/types/auth.types';

export interface IApiErrorResponse {
	message?: string;
	error: string;
	statusCode: number;
}

export interface IGetUserResponse {
	profile: {
		id: string;
		email: string;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
	timerSettings: {
		id: string;

		workInterval: number;
		breakInterval: number;
		intervalsCount: number;

		userId: string;

		createdAt: string;
		updatedAt: string;
	};
	statistics: {
		totalTasks: number;
		completedTasks: number;
		todayTasks: number;
		thisWeekTasks: number;
		totalTimerSessions: number;
		totalTimeBlocks: number;
		totalTimeBlocksDuration: number;
	};
}

export interface IUpdateUser extends Partial<IRegisterInputs> {}

export interface IUpdateUserResponse {
	email: string;
	name: string | null;
	updatedAt: string;
}

export interface IGetTimerSettingsResponse {
	id: string;

	workInterval: number;
	breakInterval: number;
	intervalsCount: number;

	userId: string;

	createdAt: string;
	updatedAt: string;
}

export interface IUpdateTimerSettings {
	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export interface IUpdateTimerSettingsResponse
	extends IGetTimerSettingsResponse {}

export interface IUpdateSettings {
	user: Partial<IRegisterInputs>;
	timer: Partial<IUpdateTimerSettings>;
}

export interface IUpdateSettingsResponse {
	user: IUpdateUserResponse;
	timer: IUpdateTimerSettingsResponse;
}
