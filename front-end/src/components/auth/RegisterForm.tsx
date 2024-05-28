'use client';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Auth from '@/components/auth';
import { authService } from '@/services/auth.service';
import { REGEX } from '@/constants/regex.constants';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import type { IRegisterInputs } from '@/types/auth.types';

export const RegisterForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterInputs>({ mode: 'onBlur' });

	// TODO: refactor
	const { mutate, isPending } = useMutation({
		mutationKey: ['auth', 'register'],
		mutationFn: (data: IRegisterInputs) => authService.register(data),
		onSuccess: () => {
			reset();
			setFormError(null);
			router.push(DASHBOARD.ROOT);
		},
		onError: ({ response }: AxiosError) => {
			// @ts-ignore | TODO: add error type
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
				<Auth.Field
					label='Name'
					id='name-input'
					type='text'
					autoComplete='name'
					placeholder='Asuka Langley'
					message={errors.name?.message}
					{...register('name', {
						maxLength: {
							value: 15,
							message: 'Name must be less than 15 characters.',
						},
					})}
				/>
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
				<Auth.Submit isValid={!Object.keys(errors).length} isLoading={isPending}>
					Register
				</Auth.Submit>
			</Auth.Form>
			<Auth.Link href={AUTH.LOGIN}>Already have an account?</Auth.Link>
		</Auth>
	);
};
