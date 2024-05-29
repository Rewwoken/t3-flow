import type { IRegisterInputs } from '@/types/auth.types';

export interface IApiErrorResponse {
	message?: string;
	error: string;
	statusCode: number;
}

export interface IGetProfileResponse {
	profile: {
		id: string;
		email: string;
		name: string;
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
	name: string;
	updatedAt: string;
}
