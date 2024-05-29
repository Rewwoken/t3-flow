'use client';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '@/components/auth/Auth';
import { authService } from '@/services/auth.service';
import { REGEX } from '@/constants/regex.constants';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import type { ILoginInputs } from '@/types/auth.types';

export const LoginForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILoginInputs>({ mode: 'onBlur' });

	// TODO: refactor
	const { mutate, isPending } = useMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: (data: ILoginInputs) => authService.login(data),
		onSuccess: () => {
			reset();
			setFormError(null);
			router.push(DASHBOARD.ROOT);
		},
		onError: ({ response }: AxiosError) => {
			// @ts-ignore | TODO: add error type
			const { message } = response?.data;

			setFormError(typeof message === 'string' ? message : 'Unexpected error!');
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
				<Auth.Field
					label='Email'
					id='email-input'
					type='email'
					autoComplete='email'
					placeholder='a.langley@gmail.com'
					message={errors.email?.message}
					{...register('email', {
						required: 'Email is required!',
						pattern: {
							value: REGEX.IS_EMAIL,
							message: 'Invalid email address!',
						},
					})}
				/>
				<Auth.Field
					label='Password'
					id='password-input'
					type='password'
					autoComplete='current-password'
					placeholder='********'
					message={errors.password?.message}
					{...register('password', { required: 'Password is required!' })}
				/>
				<Auth.Message>{formError}</Auth.Message>
				<Auth.Submit isValid={!Object.keys(errors).length} isLoading={isPending}>
					Login
				</Auth.Submit>
			</Auth.Form>
			<Auth.Link href={AUTH.REGISTER}>Don&apos;t have an account?</Auth.Link>
		</Auth>
	);
};
