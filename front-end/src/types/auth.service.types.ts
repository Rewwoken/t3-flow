import type { IBase } from '@/types/api.types';
import type { IGetUserResponse } from '@/types/user.service.types';

export interface IAuthResponse extends IBase {
	email: string;
	name: string | null;
	accessToken: string;
}

export interface IGetNewTokensResponse extends IGetUserResponse {
	accessToken: string;
}
