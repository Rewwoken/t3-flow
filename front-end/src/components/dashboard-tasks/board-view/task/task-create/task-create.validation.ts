import { RegisterOptions } from 'react-hook-form';
import { ICreateTaskFields } from '@/types/task.types';

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export const name: RegisterOptions<ICreateTaskFields, 'name'> = {
  required: {
    value: true,
    message: 'Task name is required!',
  },
  maxLength: {
    value: 30,
    message: 'Task name must be less than 30 characters.',
  },
};

export const priority: RegisterOptions<ICreateTaskFields, 'priority'> = {
  required: {
    value: true,
    message: 'Priority is required!',
  },
};
