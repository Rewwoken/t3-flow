import type { IBase } from '@/types/api.types';

export interface IGetTimerSettingsResponse extends IBase {
	workInterval: number;
	breakInterval: number;
	intervalsCount: number;
	userId: string;
}

export interface IUpdateTimerSettingsFields {
	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export interface IUpdateTimerSettingsResponse
	extends IGetTimerSettingsResponse {}
