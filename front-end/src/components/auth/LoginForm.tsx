'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useAuth } from '@/components/auth/hooks/useAuth';
import s from '@/components/auth/auth.module.css';
import * as v from '@/components/auth/auth.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
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
				<FieldWrapper
					label='Email'
					htmlFor='email-input'
					error={formErrors.email?.message}
					className='bg-background'
				>
					<input
						autoFocus
						id='email-input'
						type='email'
						autoComplete='email'
						placeholder='a.langley@gmail.com'
						{...register('email', v.email)}
						className={clsx(s.input, {
							'border-danger': !!formErrors.email?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Password'
					htmlFor='password-input'
					error={formErrors.password?.message}
					className='bg-background'
				>
					<input
						id='password-input'
						type='password'
						autoComplete='current-password'
						placeholder='********'
						{...register('password', { required: 'Password is required!' })}
						className={clsx(s.input, {
							'border-danger': !!formErrors.password?.message,
						})}
					/>
				</FieldWrapper>
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
