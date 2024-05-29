export interface IRegisterInputs {
	name?: string;
	email: string;
	password: string;
}

export interface ILoginInputs {
	email: string;
	password: string;
}

export interface IAuthResponse {
	id: string;
	email: string;
	name: string | null;
	createdAt: string;
	updatedAt: string;
	accessToken: string;
}
