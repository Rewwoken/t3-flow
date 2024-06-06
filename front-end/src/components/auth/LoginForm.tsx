'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/hooks/useAuth';
import { AuthButton } from '@/components/auth/AuthButton';
import s from '@/components/auth/auth.module.css';
import * as v from '@/components/auth/auth.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { Logo } from '@/components/ui/Logo';
import { AUTH } from '@/constants/routes.constants';
import type { ILoginFields } from '@/types/auth.types';

export const LoginForm = () => {
	const { register, isValid, formErrors, onSubmit, isPending, formMessage } =
		useAuth<ILoginFields>('login');

	return (
		<div className={s.wrapper}>
			<Logo className='size-24' />
			<h1 className={s.heading}>Welcome back!</h1>
			<form
				onSubmit={onSubmit}
				className={s.form}
			>
				<FieldWrapper
					label='Email'
					htmlFor='email-input'
					message={formErrors.email?.message}
					className='bg-background'
				>
					<input
						autoFocus
						id='email-input'
						type='email'
						autoComplete='email'
						placeholder='a.langley@gmail.com'
						className={s.input}
						{...register('email', v.email)}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Password'
					htmlFor='password-input'
					message={formErrors.password?.message}
					className='bg-background'
				>
					<input
						id='password-input'
						type='password'
						autoComplete='current-password'
						placeholder='********'
						className={s.input}
						{...register('password', { required: 'Password is required!' })}
					/>
				</FieldWrapper>
				{formMessage && <span className={s.message}>{formMessage}</span>}
				<AuthButton
					isValid={isValid}
					isPending={isPending}
				>
					Login
				</AuthButton>
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
