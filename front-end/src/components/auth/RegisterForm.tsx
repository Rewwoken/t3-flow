'use client';

import { AuthFormWrapper } from '@/components/auth/AuthFormWrapper';
import { AuthInput } from '@/components/auth/AuthInput';
import { DASHBOARD } from '@/constants/routes.constants';
import { authService } from '@/services/auth.service';
import { IRegisterInputs } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export const RegisterForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterInputs>();

	const { mutate } = useMutation({
		mutationKey: ['auth', 'register'],
		mutationFn: (data: IRegisterInputs) => authService.register(data),
		onSuccess: () => {
			reset();
			router.push(DASHBOARD.HOME);
		},
	});

	const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
		mutate(data);
	};

	return (
		<AuthFormWrapper
			headingText='Create an account'
			buttonText='Register'
			linkHref='/auth/login'
			linkText='Alredy have an account?'
			onSubmit={handleSubmit(onSubmit)}
		>
			<AuthInput
				label='Name'
				id='name-input'
				type='text'
				autoComplete='name'
				placeholder='Asuka Langley'
				{...register('name')}
			/>
			<AuthInput
				label='Email'
				id='email-input'
				type='email'
				autoComplete='email'
				placeholder='a.langley@gmail.com'
				{...register('email', { required: 'Email is required!' })}
			/>
			<AuthInput
				label='Password'
				id='password-input'
				type='password'
				autoComplete='current-password'
				placeholder='********'
				{...register('password', { required: 'Password is required!' })}
			/>
		</AuthFormWrapper>
	);
};
