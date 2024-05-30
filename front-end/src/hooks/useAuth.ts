'use client';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { authService } from '@/services/auth.service';
import { QUERY_KEYS } from '@/constants/queryKeys.constants';
import type {
	IAuthResponse,
	ILoginInputs,
	IRegisterInputs,
} from '@/types/auth.types';
import type { IApiErrorResponse } from '@/types/services.types';

/**
 * Custom hook for user authentication.
 *
 * This hook uses `useMutation` from `@tanstack/react-query` to handle user authentication.
 * It sends a request using the `authService[method](data)` and executes
 * the provided `onSuccess` callback upon successful registration.
 *
 * @param {'login' | 'register'} method - authService method to be executed
 * @param {Function} onSuccess - Callback function to be called on successful registration.
 * @returns The result of the mutation.
 *
 * @example
 * const { mutate, isLoading, error } = useRegister('register', () => {
 *   alert('Registration successful!');
 * });
 *
 * mutate(data);
 */
export function useAuth(method: 'login' | 'register', onSuccess?: () => void) {
	const result = useMutation<
		IAuthResponse,
		AxiosError<IApiErrorResponse>,
		ILoginInputs | IRegisterInputs
	>({
		mutationKey: [...QUERY_KEYS.MUTATE_AUTH, method],
		mutationFn: (data) => authService[method](data),
		onSuccess,
	});

	return result;
}
