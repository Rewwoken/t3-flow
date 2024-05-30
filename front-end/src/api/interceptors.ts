import axios, { CreateAxiosDefaults } from 'axios';
import { authService } from '@/services/auth.service';
import { tokenService } from '@/services/token.service';

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
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

		// TODO: check if error is being catched
		if (
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			try {
				originalRequest._isRetry = true;

				await authService.getNewTokens();

				return apiProtected.request(originalRequest);
			} catch (err) {
				tokenService.removeFromStorage();
			}
		}

		throw error;
	},
);

export { apiProtected, apiPublic };
