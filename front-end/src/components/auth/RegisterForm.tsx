'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/hooks/useAuth';
import s from '@/components/auth/auth.module.css';
import * as v from '@/components/auth/auth.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { Logo } from '@/components/ui/Logo';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { AUTH } from '@/constants/routes.constants';
import type { IRegisterFields } from '@/types/auth.types';

export const RegisterForm = () => {
	const { register, isValid, formErrors, onSubmit, isPending, formMessage } =
		useAuth<IRegisterFields>('register');

	return (
		<div className={s.wrapper}>
			<Logo className='size-24' />
			<h1 className={s.heading}>Create an account</h1>
			<form
				onSubmit={onSubmit}
				className={s.form}
			>
				<FieldWrapper
					label='Name'
					htmlFor='name-input'
					error={formErrors.name?.message}
					className='bg-background'
				>
					<input
						autoFocus
						id='name-input'
						type='text'
						autoComplete='name'
						placeholder='Asuka Langley'
						className={s.input}
						{...register('name', v.name)}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Email'
					htmlFor='email-input'
					error={formErrors.email?.message}
					className='bg-background'
				>
					<input
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
					error={formErrors.password?.message}
					className='bg-background'
				>
					<input
						id='password-input'
						type='password'
						autoComplete='current-password'
						placeholder='********'
						className={s.input}
						{...register('password', v.password)}
					/>
				</FieldWrapper>
				{/* TODO: add password confirmation */}
				{formMessage && <span className={s.message}>{formMessage}</span>}
				<SubmitButton
					isValid={isValid}
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
