'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthField } from '@/components/auth/AuthField';
import s from '@/components/auth/auth.module.css';
import * as validation from '@/components/auth/auth.validation';
import { Logo } from '@/components/ui/Logo';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import type { ILoginInputs } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILoginInputs>({ mode: 'onBlur' });

	const onSuccess = () => {
		reset();
		router.push(DASHBOARD.ROOT);
	};

	const { mutate, isPending, error } = useAuth('login', onSuccess);
	const message = error?.response?.data.message;

	const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
		mutate(data);
	};

	return (
		<div className={s.wrapper}>
			<Logo className='size-24' />
			<h1 className={s.heading}>Welcome back!</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={s.form}
			>
				<AuthField
					label='Email'
					id='email-input'
					type='email'
					autoComplete='email'
					placeholder='a.langley@gmail.com'
					message={errors.email?.message}
					{...register('email', validation.email)}
				/>
				<AuthField
					label='Password'
					id='password-input'
					type='password'
					autoComplete='current-password'
					placeholder='********'
					message={errors.password?.message}
					{...register('password', { required: 'Password is required!' })}
				/>
				{message && <span className={s.message}>{message}</span>}
				<AuthButton
					isValid={!Object.keys(errors).length}
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
