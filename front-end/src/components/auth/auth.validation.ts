import { RegisterOptions } from 'react-hook-form';
import { IAuthFields } from '@/types/auth.types';

const isEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const name: RegisterOptions<IAuthFields, 'name'> = {
  maxLength: {
    value: 15,
    message: 'Name must be less than 15 characters.',
  },
};

export const email: RegisterOptions<IAuthFields, 'email'> = {
  required: 'Email is required!',
  pattern: {
    value: isEmail,
    message: 'Invalid email address!',
  },
};

export const password: RegisterOptions<IAuthFields, 'password'> = {
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
