import type { IBase } from '@/types/api.types';
import type { IRegisterFields } from '@/types/auth.types';

export interface IGetUserResponse extends IBase {
	name: string | null;
	email: string;
}

export interface IUpdateUser extends Partial<IRegisterFields> {}

export interface IUpdateUserResponse extends IGetUserResponse {}
