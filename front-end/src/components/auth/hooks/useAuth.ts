'use client';

import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import type {
	IAuthResponse,
	ILoginFields,
	IRegisterFields,
} from '@/types/auth.types';

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
 * const { mutate, isLoading, error } = useAuth('register', () => {
 *   alert('Registration successful!');
 * });
 *
 * mutate(data);
 */
export function useAuth(method: 'login' | 'register', onSuccess?: () => void) {
	const result = useMutation<
		IAuthResponse,
		IApiErrorResponse,
		ILoginFields | IRegisterFields
	>({
		mutationKey: [...KEYS.MUTATE_AUTH, method],
		mutationFn: (data) => authService[method](data),
		onSuccess,
	});

	return result;
}
