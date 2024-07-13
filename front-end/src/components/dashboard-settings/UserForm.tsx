'use client';

import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUser } from '@/components/dashboard-settings/hooks/useUpdateUser';
import s from '@/components/dashboard-settings/settings.module.css';
import * as v from '@/components/dashboard-settings/settings.validation';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IUpdateUserFields } from '@/types/settings.types';

export const UserForm = () => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUpdateUserFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IUpdateUserFields> = (values) => {
    updateUser(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={s.form}
    >
      <fieldset className={s.fieldset}>
        <legend className={s.legend}>User settings:</legend>
        <TextField
          id='name-input'
          label='Name'
          type='text'
          autoComplete='name'
          variant='outlined'
          {...register('name', v.name)}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />
        <TextField
          id='email-input'
          label='Email'
          type='text'
          autoComplete='email'
          variant='outlined'
          {...register('email', v.email)}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
        <TextField
          id='password-input'
          label='Password'
          type='password'
          autoComplete='new-password'
          variant='outlined'
          {...register('password', v.password)}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
      </fieldset>
      <SubmitButton
        isValid={isValid}
        isPending={isPending}
      >
        Save
      </SubmitButton>
    </form>
  );
};
