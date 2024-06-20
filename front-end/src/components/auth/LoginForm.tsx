'use client';

import { TextField } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/components/auth/hooks/useAuth';
import s from '@/components/auth/auth.module.css';
import * as v from '@/components/auth/auth.validation';
import { Logo } from '@/components/ui/Logo';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { AUTH } from '@/constants/routes.constants';
import type { ILoginFields } from '@/types/auth.types';

export const LoginForm = () => {
	const {
		register,
		isValidForm,
		formErrors,
		onSubmit,
		isPending,
		formMessage,
	} = useAuth<ILoginFields>('login');

	return (
		<div className={s.wrapper}>
			<Logo className='size-24' />
			<h1 className={s.heading}>Welcome back!</h1>
			<form
				onSubmit={onSubmit}
				className={s.form}
			>
				<TextField
					autoFocus
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
					{...register('password', { required: 'Password is required!' })}
					error={!!formErrors.password?.message}
					helperText={formErrors.password?.message}
				/>
				{formMessage && <span className={s.message}>{formMessage}</span>}
				<SubmitButton
					isValid={isValidForm}
					isPending={isPending}
				>
					Login
				</SubmitButton>
			</form>
			<Link
				href={AUTH.REGISTER}
				className={s.link}
			>
				Don&apos;t have an account yet?
			</Link>
		</div>
	);
};
