import Cookies from 'js-cookie';

export class TokenService {
	readonly ACCESS_TOKEN_NAME = 'accessToken';
	readonly REFRESH_TOKEN_NAME = 'refreshToken';

	getAccessToken() {
		const accessToken = Cookies.get(this.ACCESS_TOKEN_NAME);

		return accessToken || null;
	}

	saveTokenInStorage(accessToken: string) {
		Cookies.set(this.ACCESS_TOKEN_NAME, accessToken, {
			domain: process.env.NEXT_PUBLIC_DOMAIN,
			sameSite: 'strict',
			expires: 1,
		});
	}

	removeFromStorage() {
		Cookies.remove(this.ACCESS_TOKEN_NAME);
	}
}

export const tokenService = new TokenService();
