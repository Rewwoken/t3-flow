import { IRegisterFields } from '@/types/auth.types';

export interface IUpdateUserFields extends Partial<IRegisterFields> {}

export interface IUpdateTimerSettingsFields {
	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}
