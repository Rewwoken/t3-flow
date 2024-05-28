import { apiPublic } from '@/api/interceptors';
import { tokenService } from '@/services/token.service';
import type { ILoginInputs, IRegisterInputs } from '@/types/auth.types';

class AuthService {
	private readonly BASE_URL = '/auth';

	async register(data: IRegisterInputs) {
		const response = await apiPublic.post(`${this.BASE_URL}/register`, data);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveTokenInStorage(accessToken);
		}

		return response;
	}

	async login(data: ILoginInputs) {
		const response = await apiPublic.post(`${this.BASE_URL}/login`, data);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveTokenInStorage(accessToken);
		}

		return response;
	}

	async getNewTokens() {
		const response = await apiPublic.get(`${this.BASE_URL}/access-token`);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveTokenInStorage(accessToken);
		}

		return response;
	}

	async logout() {
		const response = await apiPublic.post(`${this.BASE_URL}/logout`);

		if (response.data) {
			tokenService.removeFromStorage();
		}

		return response;
	}
}

export const authService = new AuthService();
