import type { IBase } from '@/types/api.types';

export interface IGetTimerSessionResponse extends IBase {
	totalSeconds: number;
	isCompleted: boolean;
}

export interface IUpdateTimerSession {
	totalSeconds?: number;
	isCompleted?: boolean;
}

export interface IUpdateTimerSessionResponse extends IGetTimerSessionResponse {}

export interface IGetTimerSettingsResponse extends IBase {
	workInterval: number;
	breakInterval: number;
	intervalsCount: number;
	userId: string;
}

export interface IUpdateTimerSettingsResponse
	extends IGetTimerSettingsResponse {}
