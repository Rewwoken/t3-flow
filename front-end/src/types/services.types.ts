import { IRegisterFields } from '@/types/auth.types';
import {
	IUpdateTimerSettingsFields,
	IUpdateTimerSettingsResponse,
} from '@/types/timer.service.types';
import { IUpdateUserResponse } from '@/types/user.service.types';

export interface IUpdateSettingsFields {
	user: Partial<IRegisterFields>;
	timer: Partial<IUpdateTimerSettingsFields>;
}

export interface IUpdateSettingsResponse {
	user: IUpdateUserResponse;
	timer: IUpdateTimerSettingsResponse;
}
