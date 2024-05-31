import type { IBase } from '@/types/api.types';
import { IGetUserResponse } from './user.service.types';

export interface IRegisterFields {
	name?: string;
	email: string;
	password: string;
}

export interface ILoginFields {
	email: string;
	password: string;
}

export interface IAuthResponse extends IBase {
	email: string;
	name: string | null;
	accessToken: string;
}

export interface IGetNewTokensResponse extends IGetUserResponse {
	accessToken: string;
}
