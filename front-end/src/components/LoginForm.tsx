'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Auth from '@/components/auth';
import { authService } from '@/services/auth.service';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import { ILoginInputs } from '@/types/auth.types';

export const LoginForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILoginInputs>({ mode: 'onBlur' });

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: (data: ILoginInputs) => authService.login(data),
		onSuccess: () => {
			reset();
			setFormError(null);
			router.push(DASHBOARD.HOME);
		},
		onError: ({ response }: AxiosError) => {
			// @ts-ignore
			const { message } = response?.data;

			if (typeof message === 'string') {
				setFormError(message);
			} else {
				setFormError('Unexpected error!');
			}
		},
	});

	const [formError, setFormError] = React.useState<string | null>(null);

	const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
		setFormError(null);

		mutate(data);
	};

	return (
		<Auth>
			<Auth.Heading>Welcome back!</Auth.Heading>
			<Auth.Form onSubmit={handleSubmit(onSubmit)}>
				<Auth.Input
					label='Email'
					id='email-input'
					type='email'
					autoComplete='email'
					placeholder='a.langley@gmail.com'
					message={errors.email?.message}
					{...register('email', { required: 'Email is required!' })}
				/>
				<Auth.Input
					label='Password'
					id='password-input'
					type='password'
					autoComplete='current-password'
					placeholder='********'
					message={errors.password?.message}
					{...register('password', { required: 'Password is required!' })}
				/>
				<Auth.Message>{formError}</Auth.Message>
				<Auth.Submit isLoading={isPending}>Login</Auth.Submit>
			</Auth.Form>
			<Auth.Link href={AUTH.REGISTER}>Don&apos;t have an account?</Auth.Link>
		</Auth>
	);
};
