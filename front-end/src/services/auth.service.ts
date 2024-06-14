import { apiPublic } from '@/api/interceptors';
import { tokenService } from '@/services/token.service';
import {
	IAuthResponse,
	IGetNewTokensResponse,
} from '@/types/auth.service.types';
import type { ILoginFields, IRegisterFields } from '@/types/auth.types';

class AuthService {
	private readonly BASE_URL = '/auth';

	async register(data: IRegisterFields) {
		const response = await apiPublic.post<IAuthResponse>(
			`${this.BASE_URL}/register`,
			data,
		);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveAccessTokenInCookies(accessToken);
		}

		return response.data;
	}

	async login(data: ILoginFields) {
		const response = await apiPublic.post<IAuthResponse>(
			`${this.BASE_URL}/login`,
			data,
		);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveAccessTokenInCookies(accessToken);
		}

		return response.data;
	}

	async getNewTokens() {
		const response = await apiPublic.get<IGetNewTokensResponse>(
			`${this.BASE_URL}/access-token`,
		);

		const accessToken = response.data.accessToken;
		if (accessToken) {
			tokenService.saveAccessTokenInCookies(accessToken);
		}

		return response;
	}

	async logout() {
		const response = await apiPublic.post(`${this.BASE_URL}/logout`);

		return response;
	}
}

export const authService = new AuthService();
