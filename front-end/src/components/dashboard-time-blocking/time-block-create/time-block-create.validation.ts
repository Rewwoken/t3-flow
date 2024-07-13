import { RegisterOptions } from 'react-hook-form';
import { ICreateTimeBlockFields } from '@/types/time-block.types';

export const name: RegisterOptions<ICreateTimeBlockFields, 'name'> = {
  required: 'Name is required!',
  maxLength: {
    value: 40,
    message: 'Name must be less than 40 characters!',
  },
};

export const minutes: RegisterOptions<ICreateTimeBlockFields, 'minutes'> = {
  required: 'Duration is required!',
  // setValueAs: (value: any) => parseInt(value, 10),
  valueAsNumber: true,
  min: {
    value: 5,
    message: 'Duration should be at least 5 minutes.',
  },
  max: {
    value: 720,
    message: 'Duration should be less than 720 minutes.',
  },
  // pattern: {
  // 	value: /^[0-9]+$/,
  // 	message: 'Duration must be an integer!',
  // },
};

const rgbOrRgba = new RegExp(
  /^rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)$/,
);

export const color: RegisterOptions<ICreateTimeBlockFields, 'color'> = {
  required: 'Color is required!',
  pattern: {
    value: rgbOrRgba,
    message: 'Color must be valid rgb or rgba value!',
  },
};
