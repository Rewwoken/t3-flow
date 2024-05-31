import { IBase } from '@/types/api.types';
import { IRegisterFields } from '@/types/auth.types';

export interface IGetUserResponse {
	profile: IBase & {
		email: string;
		name: string;
	};
	timerSettings: IBase & {
		workInterval: number;
		breakInterval: number;
		intervalsCount: number;
		userId: string;
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

export interface IUpdateUser extends Partial<IRegisterFields> {}

export interface IUpdateUserResponse {
	email: string;
	name: string | null;
	updatedAt: string;
}
