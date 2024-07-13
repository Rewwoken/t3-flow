import { RegisterOptions } from 'react-hook-form';
import { IUpdateTaskFields } from '@/types/task.types';

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export const name: RegisterOptions<IUpdateTaskFields, 'name'> = {
  required: 'Task name is required!',
  maxLength: {
    value: 30,
    message: 'Task name must be less than 30 characters.',
  },
};
