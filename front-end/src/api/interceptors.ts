import axios, { CreateAxiosDefaults } from 'axios';
import { authService } from '@/services/auth.service';
import { tokenService } from '@/services/token.service';

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // !
};

const apiPublic = axios.create(options);

const apiProtected = axios.create(options);

apiProtected.interceptors.request.use((config) => {
	const accessToken = tokenService.getAccessToken();

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

apiProtected.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				await authService.getNewTokens();

				return apiProtected.request(originalRequest);
			} catch (err) {
				await authService.logout();
			}
		}

		throw error;
	},
);

export { apiProtected, apiPublic };
