import { RegisterOptions } from 'react-hook-form';
import * as validation from '@/components/auth/auth.validation';
import {
  IUpdateTimerSettingsFields,
  IUpdateUserFields,
} from '@/types/settings.types';

export const name: RegisterOptions<IUpdateUserFields, 'name'> = {
  ...(validation.name as any),
  setValueAs: (value: string) => value || undefined,
  required: false,
};

export const email: RegisterOptions<IUpdateUserFields, 'email'> = {
  ...(validation.email as any),
  setValueAs: (value: string) => value || undefined,
  required: false,
};

export const password: RegisterOptions<IUpdateUserFields, 'password'> = {
  ...(validation.password as any),
  setValueAs: (value: string) => value || undefined,
  required: false,
};

export const workInterval: RegisterOptions<
  IUpdateTimerSettingsFields,
  'workInterval'
> = {
  setValueAs: (value: string) => value || undefined,
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

export const breakInterval: RegisterOptions<
  IUpdateTimerSettingsFields,
  'breakInterval'
> = {
  setValueAs: (value: string) => value || undefined,
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

export const intervalsCount: RegisterOptions<
  IUpdateTimerSettingsFields,
  'intervalsCount'
> = {
  setValueAs: (value: string) => value || undefined,
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
