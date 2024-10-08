'use client';

import { TextField } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/components/auth/hooks/useAuth';
import s from '@/components/auth/auth.module.css';
import * as v from '@/components/auth/auth.validation';
import { Logo } from '@/components/ui/Logo';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { AUTH } from '@/constants/routes.constants';

export const RegisterForm = () => {
  const {
    register,
    isValidForm,
    formErrors,
    onSubmit,
    isPending,
    formMessage,
  } = useAuth('register');

  return (
    <div className={s.wrapper}>
      <Logo className='size-24' />
      <h1 className={s.heading}>Create an account</h1>
      <form
        onSubmit={onSubmit}
        className={s.form}
      >
        <TextField
          autoFocus
          id='name-input'
          label='Name'
          type='text'
          autoComplete='name'
          variant='outlined'
          size='small'
          {...register('name', v.name)}
          error={!!formErrors.name?.message}
          helperText={formErrors.name?.message}
        />
        <TextField
          id='email-input'
          label='Email'
          type='text'
          autoComplete='email'
          variant='outlined'
          size='small'
          {...register('email', v.email)}
          error={!!formErrors.email?.message}
          helperText={formErrors.email?.message}
        />
        <TextField
          id='password-input'
          label='Password'
          type='password'
          autoComplete='password'
          variant='outlined'
          size='small'
          {...register('password', v.password)}
          error={!!formErrors.password?.message}
          helperText={formErrors.password?.message}
        />
        {/* TODO: add password confirmation */}
        {formMessage && <span className={s.message}>{formMessage}</span>}
        <SubmitButton
          isValid={isValidForm}
          isPending={isPending}
        >
          Register
        </SubmitButton>
      </form>
      <Link
        href={AUTH.LOGIN}
        className={s.link}
      >
        Already have an account?
      </Link>
    </div>
  );
};
