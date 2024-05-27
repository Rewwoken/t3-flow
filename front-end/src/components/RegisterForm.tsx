'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '@/services/auth.service';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import { IRegisterInputs } from '@/types/auth.types';
import { Auth } from './auth';

export const RegisterForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterInputs>({ mode: 'onBlur' });

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth', 'register'],
		mutationFn: (data: IRegisterInputs) => authService.register(data),
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

	const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
		setFormError(null);

		mutate(data);
	};

	return (
		<Auth>
			<Auth.Heading>Create an account</Auth.Heading>
			<Auth.Form onSubmit={handleSubmit(onSubmit)}>
				<Auth.Input
					label='Name'
					id='name-input'
					type='text'
					autoComplete='name'
					placeholder='Asuka Langley'
					message={errors.name?.message}
					{...register('name', {
						maxLength: {
							value: 15,
							message: 'Name should be less than 15 characters.',
						},
					})}
				/>
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
					{...register('password', {
						required: 'Password is required!',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters!',
						},
						maxLength: {
							value: 30,
							message: 'Password must be less than 30 characters!',
						},
					})}
				/>
				<Auth.Message>{formError}</Auth.Message>
				<Auth.Submit isLoading={isPending}>Register</Auth.Submit>
			</Auth.Form>
			<Auth.Link href={AUTH.LOGIN}>Already have an account?</Auth.Link>
		</Auth>
	);
};
