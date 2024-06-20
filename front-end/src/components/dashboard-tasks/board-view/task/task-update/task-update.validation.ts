import type { RegisterOptions } from 'react-hook-form';

export enum Priority {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export const name: RegisterOptions = {
	required: 'Task name is required!',
	maxLength: {
		value: 30,
		message: 'Task name must be less than 30 characters.',
	},
};
