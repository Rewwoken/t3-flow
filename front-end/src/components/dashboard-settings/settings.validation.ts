import { RegisterOptions } from 'react-hook-form';
import * as validation from '@/components/auth/auth.validation';

export const name: RegisterOptions = {
	...validation.name,
	setValueAs: (value) => value || undefined,
	required: false,
};

export const email: RegisterOptions = {
	...validation.email,
	setValueAs: (value) => value || undefined,
	required: false,
};

export const password: RegisterOptions = {
	...validation.password,
	setValueAs: (value) => value || undefined,
	required: false,
};

export const workInterval: RegisterOptions = {
	setValueAs: (value) => value || undefined,
	required: false,
	valueAsNumber: true,
	min: {
		value: 1,
		message: 'Work interval must be at least 1!',
	},
	max: {
		value: 60,
		message: 'Work interval must be less than 60!',
	},
};

export const breakInterval: RegisterOptions = {
	setValueAs: (value) => value || undefined,
	required: false,
	valueAsNumber: true,
	min: {
		value: 1,
		message: 'Break interval must be at least 1!',
	},
	max: {
		value: 60,
		message: 'Break interval must be less than 60!',
	},
};

export const intervalsCount: RegisterOptions = {
	setValueAs: (value) => value || undefined,
	required: false,
	valueAsNumber: true,
	min: {
		value: 1,
		message: 'Intervals count must be at least 1!',
	},
	max: {
		value: 10,
		message: 'Intervals count must be less than 10!',
	},
};
