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
import type { IRegisterInputs } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';

export const RegisterForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterInputs>({ mode: 'onBlur' });

	const onSuccess = () => {
		reset();
		router.push(DASHBOARD.ROOT);
	};

	const { mutate, isPending, error } = useAuth('register', onSuccess);
	const message = error?.response?.data.message;

	const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
		mutate(data);
	};

	return (
		<div className={s.wrapper}>
			<Logo className='size-24' />
			<h1 className={s.heading}>Create an account</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={s.form}
			>
				<AuthField
					label='Name'
					id='name-input'
					type='text'
					autoComplete='name'
					placeholder='Asuka Langley'
					message={errors.name?.message}
					{...register('name', validation.name)}
				/>
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
					{...register('password', validation.password)}
				/>
				{message && <span className={s.message}>{message}</span>}
				<AuthButton
					isValid={!Object.keys(errors).length}
					isPending={isPending}
				>
					Register
				</AuthButton>
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
