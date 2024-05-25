import { authService } from '@/services/auth.service';
import { tokenService } from '@/services/token.service';
import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
	baseURL: process.env.BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // !
};

const apiPublic = axios.create(options);

const apiProtected = axios.create(options);

apiProtected.interceptors.request.use(config => {
	const accessToken = tokenService.getAccessToken();

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

apiProtected.interceptors.response.use(
	response => response,
	async error => {
		const req = error.config;

		if (error.response.status === 401) {
			try {
				await authService.getNewTokens();

				return apiProtected.request(req);
			} catch (err) {
				tokenService.removeFromStorage();
			}
		}

		throw error;
	},
);

export { apiProtected, apiPublic };
