'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authService } from '@/services/auth.service';
import { KEYS } from '@/constants/keys.constants';
import { DASHBOARD } from '@/constants/routes.constants';
import { IApiErrorResponse } from '@/types/api.types';
import type {
	IAuthResponse,
	ILoginFields,
	IRegisterFields,
} from '@/types/auth.types';

export function useAuth<IFields extends ILoginFields | IRegisterFields>(
	method: 'login' | 'register',
) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFields>({ mode: 'onBlur' });

	const router = useRouter();

	const { mutate, isPending, error } = useMutation<
		IAuthResponse,
		IApiErrorResponse,
		IFields
	>({
		mutationKey: [...KEYS.AUTH, method],
		mutationFn: (data) => authService[method](data),
		onSuccess: () => {
			reset();

			router.push(DASHBOARD.ROOT);
		},
	});

	const onSubmit = handleSubmit((data: IFields) => {
		mutate(data);
	});

	return {
		register,
		isValid: !Object.keys(errors).length,
		formErrors: errors,
		onSubmit,
		isPending,
		formMessage: error?.response?.data.message,
	};
}
