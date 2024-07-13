import { IAuthFields } from '@/types/auth.types';

export interface IUpdateUserFields extends Partial<IAuthFields> {}

export interface IUpdateTimerSettingsFields {
  workInterval?: number;
  breakInterval?: number;
  intervalsCount?: number;
}
