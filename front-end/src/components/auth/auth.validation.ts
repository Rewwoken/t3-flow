import { RegisterOptions } from 'react-hook-form';
import { REGEX } from '@/constants/regex.constants';
import type { IRegisterInputs } from '@/types/auth.types';

export const name: RegisterOptions<IRegisterInputs, 'name'> = {
	maxLength: {
		value: 15,
		message: 'Name must be less than 15 characters.',
	},
};

export const email: RegisterOptions<IRegisterInputs, 'email'> = {
	required: 'Email is required!',
	pattern: {
		value: REGEX.IS_EMAIL,
		message: 'Invalid email address!',
	},
};

export const password: RegisterOptions<IRegisterInputs, 'password'> = {
	required: 'Password is required!',
	minLength: {
		value: 6,
		message: 'Password must be at least 6 characters!',
	},
	maxLength: {
		value: 30,
		message: 'Password must be less than 30 characters!',
	},
};
