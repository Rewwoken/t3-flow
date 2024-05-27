'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormWrapper } from '@/components/auth/AuthFormWrapper';
import { AuthInput } from '@/components/auth/AuthInput';
import { authService } from '@/services/auth.service';
import { DASHBOARD } from '@/constants/routes.constants';
import { ILoginInputs } from '@/types/auth.types';

export const LoginForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILoginInputs>();

	const { mutate } = useMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: async (data: ILoginInputs) => await authService.login(data),
		onSuccess: () => {
			reset();
			router.push(DASHBOARD.HOME);
		},
		onError: (error) => {
			console.log('Error: ', error);
		},
	});

	const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
		mutate(data);
	};

	return (
		<AuthFormWrapper
			headingText='Welcome back!'
			buttonText='Login'
			linkHref='/auth/register'
			linkText='Dont have an account yet?'
			onSubmit={handleSubmit(onSubmit)}
		>
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
